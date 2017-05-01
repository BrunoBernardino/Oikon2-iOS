import React, { Component } from 'react';
import {
  View,
  ListView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import _ from 'lodash';

import ExpenseRow from './ExpenseRow';
import ExpensesHeader from './ExpensesHeader';
import EditExpenseModal from './EditExpenseModal';

import styles from '../styles/ExpensesTab';

class ExpensesTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshingData: false,
      showingEditModal: false,
      expenseBeingEdited: {
        _id: '',
        _rev: '',
        cost: 0,
        name: '',
        type: '',
        date: ''
      }
    };
  }

  renderExpenseRow(expense, source, rowIndex) {
    return (
      <ExpenseRow
        isOdd={(rowIndex % 2 === 1)}
        name={expense.name}
        cost={expense.cost}
        type={expense.type}
        date={expense.date}
        onTouch={this.showKeyboardModal.bind(this, expense)}
      />
    );
  }

  showKeyboardModal(expense) {
    this.setState({
      showingEditModal: true,
      expenseBeingEdited: expense
    });
  }

  hideKeyboardModal () {
    this.setState({
      showingEditModal: false
    });
  }

  calculateTotal(expenses) {
    return _.sumBy(expenses, (e) => e.cost);
  }

  onRefresh() {
    this.setState({
      refreshingData: true,
    });

    this.props.onLoad();// TODO: This isn't async, so this is a "fake" load time

    setTimeout(() => {
      this.setState({
        refreshingData: false,
      });
    }, 1200);
  }

  render() {
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2) });

    const { expenses, filters, onFiltersChange, types, onEditExpense, onDeleteExpense } = this.props;

    const { startDate, endDate, search, visibleTypes } = filters;

    // Sort types by name
    let sortedTypes = _.cloneDeep(types).sort();

    // Copy to apply filters and reduce the amount of expenses to show
    let filteredExpenses = _.cloneDeep(expenses);

    // Sort expenses by date
    filteredExpenses = filteredExpenses.sort((expense1, expense2) => {
      if (expense1.date < expense2.date) {
        return -1;
      }

      if (expense1.date > expense2.date) {
        return 1;
      }

      return 0;
    });

    // Now reverse them
    filteredExpenses.reverse();

    // Filter by dates
    filteredExpenses = filteredExpenses.filter((expense) => {
      return (expense.date >= startDate && expense.date <= endDate);
    });

    // Filter by expense name
    if (search) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        return (expense.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
      });
    }

    // Filter by expense types
    if (visibleTypes.length) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        const foundIndex = _.findIndex(visibleTypes, (type) => {
          return (type.toLowerCase() === expense.type.toLowerCase());
        });

        return (foundIndex !== -1);
      });
    }

    // Get the expenses to show, after filters
    const visibleExpenses = _.cloneDeep(filteredExpenses);

    const listExpenses = dataSource.cloneWithRows(visibleExpenses);

    // Calculate total
    const total = this.calculateTotal(visibleExpenses);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ExpensesHeader
          startDate={startDate}
          endDate={endDate}
          total={total}
          search={search}
          visibleTypes={visibleTypes}
          types={sortedTypes}
          style={styles.headerContainer}
          onFiltersChange={onFiltersChange}
        />
        <ListView
          dataSource={listExpenses}
          renderRow={this.renderExpenseRow.bind(this)}
          style={styles.listContainer}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              tintColor="#FFFFFF"
              refreshing={this.state.refreshingData}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
        <EditExpenseModal
          visible={this.state.showingEditModal}
          expense={this.state.expenseBeingEdited}
          types={sortedTypes}
          onSave={onEditExpense}
          onClose={this.hideKeyboardModal.bind(this)}
          onDelete={onDeleteExpense}
        />
      </View>
    );
  }
}

ExpensesTab.propTypes = {
  filters: React.PropTypes.shape({
    startDate: React.PropTypes.string.isRequired,
    endDate: React.PropTypes.string.isRequired,
    visibleTypes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    search: React.PropTypes.string.isRequired,
  }).isRequired,
  expenses: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    cost: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired
  })).isRequired,
  types: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onFiltersChange: React.PropTypes.func.isRequired,
  onEditExpense: React.PropTypes.func.isRequired,
  onDeleteExpense: React.PropTypes.func.isRequired,
  onLoad: React.PropTypes.func.isRequired,
};

export default ExpensesTab;
