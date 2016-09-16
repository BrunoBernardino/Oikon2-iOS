import React, { Component } from 'react';
import {
  AppRegistry,
  TabBarIOS,
  StatusBar,
  Text,
  View
} from 'react-native';
import moment from 'moment';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';

import SettingsDB from './components/SettingsDB';
import DataDB from './components/DataDB';

import BackgroundImage from './components/BackgroundImage';
import AddTab from './components/AddTab';
import ExpensesTab from './components/ExpensesTab';
import TypesTab from './components/TypesTab';
import SettingsTab from './components/SettingsTab';

import styles from './styles/index.ios.js';

class Oikon2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // State
      loadedData: false,
      loadedSettings: false,
      selectedTab: 'addTab',

      // Settings
      filters: {
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().endOf('month').format('YYYY-MM-DD'),
        visibleTypes: [],
        search: ''
      },
      remoteURL: '',

      // Data
      expenses: [],
      types: [],
    };
  }

  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.notification);
  }

  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
  }

  componentWillMount() {
    // Initialize settings
    SettingsDB.init()
      .then(() => {
        // Update state with fetched settings
        const startDateFilter = SettingsDB.get('filters-startDate', moment().startOf('month').format('YYYY-MM-DD'));
        const endDateFilter = SettingsDB.get('filters-endDate', moment().endOf('month').format('YYYY-MM-DD'));
        const visibleTypesFilter = SettingsDB.get('filters-visibleTypes', [], true);
        const searchFilter = SettingsDB.get('filters-search', '');
        const remoteURL = SettingsDB.get('remoteURL', '');

        this.setState({
          loadedSettings: true,
          filters: {
            startDate: startDateFilter,
            endDate: endDateFilter,
            visibleTypes: visibleTypesFilter,
            search: searchFilter,
          },
          remoteURL: remoteURL
        });
      });

    this.loadData();
  }

  loadData() {
    // Initialize data
    DataDB.init();

    DataDB.get('expenses', (expenses) => {
      // Update state with fetched data
      this.setState({
        loadedData: true,
        expenses: expenses
      });
    });

    // Get Expense Types
    DataDB.get('types', (types) => {
      // Update state with fetched data
      this.setState({
        loadedData: true,
        types: types
      });
    });
  }

  renderTabContent(tab) {
    const simpleTypes = this.state.types.map((type) => {
      return type.name;
    });

    if (tab === 'addTab') {
      return (
        <AddTab
          onAddExpense={this.onAddExpense.bind(this)}
          types={simpleTypes}
        />
      );
    }

    if (tab === 'expensesTab') {
      return (
        <ExpensesTab
          expenses={this.state.expenses}
          types={simpleTypes}
          filters={this.state.filters}
          onFiltersChange={this.onFiltersChange.bind(this)}
          onEditExpense={this.onEditExpense.bind(this)}
          onDeleteExpense={this.onDeleteExpense.bind(this)}
        />
      );
    }

    if (tab === 'typesTab') {
      return (
        <TypesTab
          types={this.state.types}
        />
      );
    }

    if (tab === 'settingsTab') {
      return (
        <SettingsTab
          remoteURL={this.state.remoteURL}
          onRemoteURLChange={this.onRemoteURLChange.bind(this)}
          onExportPress={this.onExportPress.bind(this)}
          onImportPress={this.onImportPress.bind(this)}
          onDeleteAllPress={this.onDeleteAllPress.bind(this)}
        />
      );
    }

    // Fail-safe
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.instructions}>This should not show. ({tab})</Text>
      </View>
    );
  }

  onTabPress(tab) {
    this.setState({
      selectedTab: tab,
    });
  }

  render() {
    return (
      <BackgroundImage source={require('./assets/bg.png')}>
        <View style={styles.container}>
          <TabBarIOS
            unselectedTintColor="white"
            tintColor="white"
            translucent={true}
            barTintColor="black">

            <TabBarIOS.Item
              icon={require('./assets/tabs/controls.png')}
              selectedIcon={require('./assets/tabs/selected/controls.png')}
              renderAsOriginal={true}
              title=""
              selected={this.state.selectedTab === 'settingsTab'}
              onPress={this.onTabPress.bind(this, 'settingsTab')}>
              {this.renderTabContent('settingsTab')}
            </TabBarIOS.Item>

            <TabBarIOS.Item
              icon={require('./assets/tabs/tabs.png')}
              selectedIcon={require('./assets/tabs/selected/tabs.png')}
              renderAsOriginal={true}
              title=""
              selected={this.state.selectedTab === 'typesTab'}
              onPress={this.onTabPress.bind(this, 'typesTab')}>
              {this.renderTabContent('typesTab')}
            </TabBarIOS.Item>

            <TabBarIOS.Item
              icon={require('./assets/tabs/search.png')}
              selectedIcon={require('./assets/tabs/selected/search.png')}
              renderAsOriginal={true}
              title=""
              selected={this.state.selectedTab === 'expensesTab'}
              onPress={this.onTabPress.bind(this, 'expensesTab')}>
              {this.renderTabContent('expensesTab')}
            </TabBarIOS.Item>

            <TabBarIOS.Item
              icon={require('./assets/tabs/add.png')}
              selectedIcon={require('./assets/tabs/selected/add.png')}
              renderAsOriginal={true}
              title=""
              selected={this.state.selectedTab === 'addTab'}
              onPress={this.onTabPress.bind(this, 'addTab')}>
              {this.renderTabContent('addTab')}
            </TabBarIOS.Item>
          </TabBarIOS>
          <MessageBar style={{paddingTop: 50}} ref="notification" />
        </View>
      </BackgroundImage>
    );
  }

  //
  // Generic Actions
  //
  showErrorMessage(message, title = 'Oops!') {
    MessageBarManager.showAlert({
      title: title,
      message: message,
      alertType: 'error',
      stylesheetError: {
        backgroundColor: '#990000',
        strokeColor: '#990000'
      },
      viewTopInset: 12
    });
  }

  showSuccessMessage(message, title = 'Wohoo!') {
    MessageBarManager.showAlert({
      title: title,
      message: message,
      alertType: 'success',
      stylesheetSuccess: {
        backgroundColor: '#40A277',
        strokeColor: '#40A277'
      },
      viewTopInset: 12
    });
  }

  //
  // Add Actions
  //
  onAddExpense(expense) {
    try {
      DataDB.add('expense', expense);
      this.showSuccessMessage('Expense added successfully.');

      this.loadData();

      return true;
    } catch (error) {
      this.showErrorMessage(`There was an error adding your expense:\n${error}`);

      return false;
    }
  }

  //
  // Expenses Actions
  //
  onFiltersChange(filterType, newValue) {
    SettingsDB.set(`filters-${filterType}`, newValue);

    let filters = this.state.filters;
    filters[filterType] = newValue;

    this.setState({
      filters: filters
    });
  }

  onEditExpense(expense) {
    try {
      DataDB.update('expense', expense);
      this.showSuccessMessage('Expense updated successfully.');

      this.loadData();

      return true;
    } catch (error) {
      this.showErrorMessage(`There was an error updating your expense:\n${error}`);

      return false;
    }
  }

  onDeleteExpense(expense) {
    try {
      DataDB.delete('expense', expense);
      this.showSuccessMessage('Expense deleted successfully.');

      this.loadData();

      return true;
    } catch (error) {
      this.showErrorMessage(`There was an error deleting your expense:\n${error}`);

      return false;
    }
  }

  //
  // Settings Actions
  //
  onRemoteURLChange(newURL) {
    SettingsDB.set('remoteURL', newURL);
    // TODO: Re-initialize/sync data
    // SettingsDB.init();

    this.setState({
      remoteURL: newURL
    });
  }

  onExportPress() {
    // TODO: Create CSV file and send email
  }

  onImportPress() {
    // TODO: Ask to select a CSV file, and import
  }

  onDeleteAllPress() {
    // TODO: Ask for confirmation, and delete all data locally and remotely, if necessary
  }
}

AppRegistry.registerComponent('Oikon2', () => Oikon2);
