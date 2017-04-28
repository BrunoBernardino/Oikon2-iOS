import PouchDB from 'pouchdb-react-native';
import _ from 'lodash';
import moment from 'moment';

const EXPENSES_URI = 'expenses';
const TYPES_URI = 'types';

const genericErrorHandler = (error) => {
  console.error(error);
};

// TODO: API Docs: https://pouchdb.com/api.html

const DataDB = {
  init() {

    this.expensesDB = new PouchDB(EXPENSES_URI);
    this.typesDB = new PouchDB(TYPES_URI);

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
        const rows = result.rows.map((row) => row.doc);
        callback(rows);
      })
      .catch(genericErrorHandler);
  },

  // Add a new row
  add(type, data) {
    this.validate(type, data);

    // TODO: If adding an expense, update the expense type cost + count

    return this.chooseDB(type)
      .post(data)
      .catch(genericErrorHandler);
  },

  // Update a row
  update(type, data) {
    this.validate(type, data);

    // TODO: If updating an expense, update the expense type cost + count

    return this.chooseDB(type)
      .put(data)
      .catch(genericErrorHandler);
  },

  // Delete a row
  delete(type, data) {
    // TODO: If deleting an expense, update the expense type cost + count
    // TODO: If deleting an expense type, update the expenses

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
  potentiallyParse(type, data) {
    // Expenses
    if (type === 'expense') {
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

      // Convert 'uncategorized' or '(auto)' to empty string
      if (data.type === 'uncategorized' || data.type === '(auto)') {
        data.type = '';

        // TODO: Add automatic type
      }

    }

    // Expense Types
    if (type === 'type') {
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
  },

  // Validate data
  validate(type, data) {
    // Common
    if (_.isEmpty(data)) {
      throw Error('No data received.');
    }

    this.potentiallyParse(type, data);

    // Expenses
    if (type === 'expense') {
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
    if (type === 'type') {
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
  }
};

export default DataDB;
