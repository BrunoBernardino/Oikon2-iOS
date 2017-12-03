import React, { Component } from 'react';
import {
  AppRegistry,
  TabBarIOS,
  StatusBar,
  Text,
  View,
  Alert,
  NativeModules,
} from 'react-native';
import moment from 'moment';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import FileSystem from 'react-native-fs';
import { isIphoneX } from 'react-native-iphone-x-helper';

import SettingsDB from './components/SettingsDB';
import DataDB from './components/DataDB';

import BackgroundImage from './components/BackgroundImage';
import AddTab from './components/AddTab';
import ExpensesTab from './components/ExpensesTab';
import TypesTab from './components/TypesTab';
import SettingsTab from './components/SettingsTab';

import styles from './styles/index.ios.js';

const Mailer = NativeModules.RNMail;
const DocumentPicker = NativeModules.RNDocumentPicker;

class Oikon2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // State
      loadedExpenses: false,
      loadedTypes: false,
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
        const visibleTypesFilter = SettingsDB.get('filters-visibleTypes', '', true);
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
          remoteURL,
        });

        this.loadData(true);
      });
  }

  loadData(showNotification = false) {
    if (this.state.remoteURL && showNotification) {
      this.showInfoMessage('Synchronizing...');
    }

    // Initialize data
    DataDB.init(this.state.remoteURL, () => {
      if (this.state.remoteURL && showNotification) {
        this.showInfoMessage('Sync Complete.');
      }

      DataDB.get('expenses', (expenses) => {
        // Update state with fetched data
        this.setState({
          loadedExpenses: true,
          expenses,
        });
      });

      // Get Expense Types
      DataDB.get('types', (types) => {
        // Update state with fetched data
        this.setState({
          loadedTypes: true,
          types,
        });
      });
    });
  }

  onExpensesLoad() {
    this.loadData(true);
  }

  renderTabContent(tab) {
    const simpleTypes = this.state.types.map((type) => type.name);

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
          onLoad={this.onExpensesLoad.bind(this)}
        />
      );
    }

    if (tab === 'typesTab') {
      // Based on date filters, calculate count and cost for each type
      const typeTotals = {};

      // Filter expenses by dates
      const filteredExpenses = this.state.expenses.filter((expense) => {
        return (expense.date >= this.state.filters.startDate && expense.date <= this.state.filters.endDate);
      });

      filteredExpenses.forEach((expense) => {
        if (!typeTotals[expense.type]) {
          typeTotals[expense.type] = {
            count: 0,
            cost: 0,
          };
        }

        typeTotals[expense.type].count += 1;
        typeTotals[expense.type].cost += expense.cost;
      });

      this.state.types.forEach((type) => {
        type.count = (typeTotals[type.name] && typeTotals[type.name].count) || 0;
        type.cost = (typeTotals[type.name] && typeTotals[type.name].cost) || 0;
      });

      const uncategorizedCount = (typeTotals[''] && typeTotals[''].count) || 0;
      const uncategorizedCost = (typeTotals[''] && typeTotals[''].cost) || 0;

      return (
        <TypesTab
          types={this.state.types}
          uncategorizedCount={uncategorizedCount}
          uncategorizedCost={uncategorizedCost}
          onAddType={this.onAddType.bind(this)}
          onEditType={this.onEditType.bind(this)}
          onDeleteType={this.onDeleteType.bind(this)}
        />
      );
    }

    if (tab === 'settingsTab') {
      return (
        <SettingsTab
          remoteURL={this.state.remoteURL}
          onRemoteURLChange={this.onRemoteURLChange.bind(this)}
          onRemoteURLFinishEditing={this.onRemoteURLFinishEditing.bind(this)}
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
      position: 'bottom',
      animationType: 'SlideFromBottom',
      viewBottomInset: isIphoneX() ? 20 : 0,
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
      position: 'bottom',
      animationType: 'SlideFromBottom',
      viewBottomInset: isIphoneX() ? 20 : 0,
    });
  }

  showInfoMessage(message) {
    MessageBarManager.showAlert({
      title: null,
      message: message,
      alertType: 'info',
      stylesheetInfo: {
        backgroundColor: '#222222',
        strokeColor: '#222222'
      },
      position: 'bottom',
      animationType: 'SlideFromBottom',
      viewBottomInset: isIphoneX() ? 20 : 0,
    });
  }

  //
  // Add Actions
  //
  onAddExpense(expense) {
    DataDB.add('expense', expense)
      .then(() => {
        this.showSuccessMessage('Expense added successfully.');

        setTimeout(() => this.loadData(), 3000);
      })
      .catch((error) => {
        this.showErrorMessage(`${error}`);
      });

    return true;
  }

  onAddType(type) {
    DataDB.add('type', type)
      .then(() => {
        this.showSuccessMessage('Expense type added successfully.');

        this.loadData();
      })
      .catch((error) => {
        this.showErrorMessage(`${error}`);
      });

    return true;
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
    DataDB.update('expense', expense)
      .then(() => {
        this.showSuccessMessage('Expense updated successfully.');

        this.loadData();
      })
      .catch((error) => {
        this.showErrorMessage(`${error}`);
      });

    return true;
  }

  onDeleteExpense(expense) {
    DataDB.delete('expense', expense)
      .then(() => {
        this.showSuccessMessage('Expense deleted successfully.');

        this.loadData();
      })
      .catch((error) => {
        this.showErrorMessage(`${error}`);
      });

    return true;
  }

  //
  // Expense Types Actions
  //
  onEditType(type) {
    DataDB.update('type', type)
      .then(() => {
        this.showSuccessMessage('Expense type updated successfully.');

        this.loadData();
      })
      .catch((error) => {
        this.showErrorMessage(`${error}`);
      });

    return true;
  }

  onDeleteType(type) {
    if (type && type.name === 'uncategorized') {
      this.showErrorMessage('You can\'t delete "uncategorized".');
      return false;
    }

    DataDB.delete('type', type)
      .then(() => {
        this.showSuccessMessage('Expense type deleted successfully.');

        this.loadData();
      })
      .catch((error) => {
        this.showErrorMessage(`${error}`);
      });

    return true;
  }

  //
  // Settings Actions
  //
  onRemoteURLChange(newURL) {
    SettingsDB.set('remoteURL', newURL);

    this.setState({
      remoteURL: newURL
    });
  }

  onRemoteURLFinishEditing() {
    // Re-initialize/sync data
    this.loadData(true);
  }

  prepareValueForCSV(value) {
    return value.replace(',', ';')
      .replace('\n', ' ')
      .replace('"', '\'');
  }

  getCSVContents() {
    // Compatible with Oikon 1
    const lines = [
      'Name,Type,Date,Value',
    ];

    this.state.expenses.forEach((expense) => {
      const expenseName = this.prepareValueForCSV(expense.name);
      const expenseType = this.prepareValueForCSV(expense.type || 'uncategorized');
      const expenseDate = this.prepareValueForCSV(expense.date);
      const expenseValue = this.prepareValueForCSV(expense.cost.toFixed(2));

      lines.push(`${expenseName},${expenseType},${expenseDate},${expenseValue}`);
    });

    return lines.join('\n');
  }

  onExportPress() {
    // Create CSV file
    const now = moment().format('x');
    const path = `${FileSystem.DocumentDirectoryPath}/${now}.csv`;
    const csvContents = this.getCSVContents();

    FileSystem.writeFile(path, csvContents, 'utf8')
      .then(() => {
        // Open mail handler
        Mailer.mail({
          subject: 'Oikon CSV Export',
          body: 'Enjoy this CSV file with my expense data.',
          attachment: {
            path: path,
            type: 'csv',
            name: `oikon-export-${now}.csv`,
          },
        }, (error) => {
          if (error) {
            this.showErrorMessage('Could not open Mail. Make sure you have Mail installed with an account setup.');
          } else {
            // Delete file now that we don't need it
            FileSystem.unlink(path);
          }
        });
      })
      .catch((/* err */) => {
        // Ignore
      });
  }

  async parseDataFromCSV(contents) {
    const lines = contents.split('\n');

    if (lines.length < 1 || lines[0] !== 'Name,Type,Date,Value') {
      return Promise.reject('Invalid format');
    }

    lines.shift();// Remove the first line
    let line = lines.shift();

    while (line) {
      const values = line.split(',');

      const expense = {
        name: values[0],
        type: values[1],
        date: values[2],
        cost: parseFloat(values[3]),
      };

      await DataDB.add('expense', expense);

      // Try to add the expense type, but don't worry about failures
      try {
        const type = {
          name: expense.type,
        };

        await DataDB.add('type', type);
      } catch (e) {
        // Ignore
      }

      line = lines.shift();
    }

    return Promise.resolve(true);
  }

  onImportPress() {
    // Ask to select a CSV file, and parse it
    DocumentPicker.show({
      filetype: ['public.plain-text'],
    }, (error, file) => {
      if (!error) {
        FileSystem.readFile(file.uri, 'utf8')
          .then((contents) => this.parseDataFromCSV(contents))
          .then(() => this.loadData())
          .then(() => this.showSuccessMessage('Expenses and expense types imported successfully!'))
          .catch(() => this.showErrorMessage('Could not parse the file. Please make sure it\'s an Oikon-compatible CSV file.'));
      } else {
        this.showErrorMessage('Could not read the file. Please make sure it\'s a CSV file.');
      }
    });
  }

  onDeleteAllPress() {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to delete all data?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => this.onDeleteAllConfirm(),
          style: 'destructive'
        },
      ]
    );
  }

  onDeleteAllConfirm() {
    DataDB.deleteDB()
      .then(() => {
        this.showSuccessMessage('Data deleted successfully.');

        this.loadData();
      })
      .catch((error) => {
        this.showErrorMessage(`${error}`);
      });

    return true;
  }
}

AppRegistry.registerComponent('Oikon2', () => Oikon2);
