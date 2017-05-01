import PouchDB from 'pouchdb-react-native';
import PouchDBFind from 'pouchdb-find';
import _ from 'lodash';
import moment from 'moment';

const EXPENSES_URI = 'expenses';
const TYPES_URI = 'types';

const genericErrorHandler = (error) => {
  console.error(error);
};

// Add .find plugin
PouchDB.plugin(PouchDBFind);

const DataDB = {
  init() {

    this.expensesDB = new PouchDB(EXPENSES_URI);
    this.typesDB = new PouchDB(TYPES_URI);

    // Add indexes
    this.expensesDB.createIndex({
      index: {
        fields: ['name', 'date'],
      },
    });
    this.expensesDB.createIndex({
      index: {
        fields: ['type'],
      },
    });
    this.typesDB.createIndex({
      index: {
        fields: ['name'],
      },
    });

    // TODO: Sync w/ Remote if any
    // this.remoteExpensesDB = new PouchDB(`http://localhost:5984/${EXPENSES_URI}`);
    // this.expensesDB.sync(this.remoteExpensesDB, {
    //   live: true,
    //   retry: true
    // });
  },

  chooseDB(type) {
    if (type === 'expense' || type === 'expenses') {
      return this.expensesDB;
    }

    return this.typesDB;
  },

  // Get all data rows
  // TODO: Filter?
  get(type, callback) {
    return this.chooseDB(type)
      .allDocs({
        include_docs: true,
        limit: null
      })
      .then((result) => {
        const rows = result.rows
          .filter((row) => (row.id.indexOf('_design/') === -1)) // strip "indexes"
          .map((row) => row.doc); // get the details/doc

        callback(rows);
      })
      .catch(genericErrorHandler);
  },

  // Gets the last found expense type for a given expense name
  async getLastTypeForExpense(expenseName) {
    return this.expensesDB
      .find({
        selector: {
          name: expenseName,
          date: {
            '$gt': null, // $exists : true doesn't work
          },
        },
        fields: ['type'],
        sort: [{
          date: 'desc',
        }],
        limit: 1,
      })
      .then((result) => {
        const rows = result.docs;

        if (rows.length > 0) {
          return rows[0].type;
        }

        // Default "uncategorized"
        return '';
      })
      .catch(genericErrorHandler);
  },

  // Add a new row
  async add(type, data) {
    await this.validate(type, data);

    // If adding an expense, update the expense type cost + count
    if (type === 'expense' || type === 'expenses' || data.type !== '') {
      await this.incrementStatsForType(data.type, data.cost);
    }

    return this.chooseDB(type)
      .post(data)
      .catch(genericErrorHandler);
  },

  // Update a row
  async update(type, data) {
    await this.validate(type, data);

    return this.chooseDB(type)
      .put(data)
      .catch(genericErrorHandler);
  },

  // Delete a row
  async delete(type, data) {
    // If deleting an expense, update the expense type cost + count
    if ((type === 'expense' || type === 'expenses') && data.type !== '') {
      await this.incrementStatsForType(data.type, data.cost, -1);
    }

    // If deleting an expense type, update the expenses
    if (type === 'type' || type === 'types') {
      await this.removeTypeFromExpenses(data.name);
    }

    return this.chooseDB(type)
      .remove(data)
      .catch(genericErrorHandler);
  },

  // Delete the dbs
  async deleteDB() {
    try {
      await this.expensesDB.destroy();
      await this.typesDB.destroy();
    } catch (e) {
      return genericErrorHandler(e);
    }

    return false;
  },

  // Send a callback to act on when something changes
  subscribe(type, callback) {
    this.chooseDB(type)
      .changes({
        since: 'now',
        live: true
      })
      .on('change', callback)
      .catch(genericErrorHandler);
  },

  // Potentially Parse data
  async potentiallyParse(type, data) {
    // Expenses
    if (type === 'expense' || type === 'expenses') {
      // Trim name
      data.name = data.name.trim();

      // Convert cost to number
      if (typeof data.cost !== 'number') {
        // Parse comma into dot
        data.cost = data.cost.replace(',', '.');

        data.cost = parseFloat(data.cost);
      }

      // If no date, make it today
      if (!data.date) {
        data.date = moment().format('YYYY-MM-DD');
      }

      // Convert date to string
      if (typeof data.date !== 'string') {
        data.date = moment(data.date).format('YYYY-MM-DD');
      }

      // Convert empty or '(auto)' to an automatic type
      if (!data.type || data.type === '(auto)') {
        try {
          data.type = await this.getLastTypeForExpense(data.name) || '';
        } catch (e) {
          data.type = '';
        }

        return Promise.resolve();
      }

      // Convert 'uncategorized' to empty string
      if (data.type === 'uncategorized') {
        data.type = '';
      }

    }

    // Expense Types
    if (type === 'type' || type === 'types') {
      // Trim name
      data.name = data.name.trim();

      // Convert cost to number
      if (typeof data.cost !== 'number') {
        data.cost = parseFloat(data.cost);
      }

      // Convert count to number
      if (typeof data.count !== 'number') {
        data.count = parseInt(data.count, 10);
      }
    }

    return Promise.resolve();
  },

  // Validate data
  async validate(type, data) {
    // Common
    if (_.isEmpty(data)) {
      throw Error('No data received.');
    }

    await this.potentiallyParse(type, data);

    // Expenses
    if (type === 'expense' || type === 'expenses') {
      // We need a name
      if (!data.name || !data.name.trim()) {
        throw Error('Expenses need a name.');
      }

      // We need a cost
      if (!_.isNumber(data.cost) || isNaN(data.cost) || data.cost === 0) {
        throw Error('Expenses need a cost.');
      }

      // We need a date
      if (!data.date) {
        throw Error('Expenses need a date.');
      }

    }

    // Expense Types
    if (type === 'type' || type === 'types') {
      // We need a name
      if (!data.name || !data.name.trim()) {
        throw Error('Expense Types need a name.');
      }

      // Prevent reserved words
      if (data.name === 'uncategorized' || data.name === '(auto)') {
        throw Error('Expense Types cannot be named "uncategorized" nor "(auto)".');
      }

      // We need a count
      if (!_.isNumber(data.count) || isNaN(data.count)) {
        throw Error('Expense Types need a count, even if 0.');
      }

      // We need a cost
      if (!_.isNumber(data.cost) || isNaN(data.cost)) {
        throw Error('Expense Types need a cost, even if 0.');
      }
    }
  },

  // Get expense counts and costs for a given expense type
  async getStatsForType(typeName) {
    const stats = {
      cost: 0,
      count: 0,
    };

    try {
      const result = await this.expensesDB.find({
        selector: {
          type: typeName,
        },
        fields: ['cost'],
        limit: null,
      });

      const rows = result.docs;

      if (rows.length === 0) {
        return stats;
      }

      rows.forEach((row) => {
        stats.count += 1;
        stats.cost += row.cost;
      });

      return stats;
    } catch (e) {
      return stats;
    }
  },

  // Increment count and cost for a given expense type
  async incrementStatsForType(typeName, expenseCost, expenseCount = 1) {
    try {
      const result = await this.expensesDB.find({
        selector: {
          name: typeName,
        },
        limit: 1,
      });

      const rows = result.docs;

      if (rows.length !== 1) {
        return false;
      }

      const row = rows[0];
      row.count += expenseCount;
      row.cost += expenseCost * expenseCount;

      await this.update('type', row);

      return true;
    } catch (e) {
      return false;
    }
  },

  async removeTypeFromExpenses(typeName) {
    try {
      const result = await this.expensesDB.find({
        selector: {
          type: typeName,
        },
        limit: null,
      });

      const rows = result.docs;

      if (rows.length === 0) {
        return false;
      }

      let row = rows.shift();

      while (row) {
        row.type = 'uncategorized'; // auto-parsing will make it ''
        await this.update('expense', row);
        row = rows.shift();
      }

      return true;
    } catch (e) {
      return false;
    }
  },
};

export default DataDB;
