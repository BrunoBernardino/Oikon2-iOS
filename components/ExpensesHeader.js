import React, { Component } from 'react';
import {
  NativeModules,
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';

import ModalDatePicker from './ModalDatePicker';
import ExpensesFiltersPicker from './ExpensesFiltersPicker';

import styles from '../styles/ExpensesHeader';

const locale = NativeModules.SettingsManager.settings.AppleLocale.replace('_', '-');

class ExpensesHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingStartDatePicker: false,
      showingEndDatePicker: false,
      showingFiltersPicker: false,
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  }

  onChangeSearch(text) {
    this.props.onFiltersChange('search', text);
  }

  onChangeStartDate(date) {
    // Convert date to string
    const parsedDate = moment(date).format('YYYY-MM-DD');
    this.props.onFiltersChange('startDate', parsedDate);
  }

  onChangeEndDate(date) {
    // Convert date to string
    const parsedDate = moment(date).format('YYYY-MM-DD');
    this.props.onFiltersChange('endDate', parsedDate);
  }

  onStartDatePress() {
    this.setState({
      showingStartDatePicker: true
    });
  }

  onStartDateCancel() {
    this.setState({
      showingStartDatePicker: false
    });
  }

  onEndDatePress() {
    this.setState({
      showingEndDatePicker: true
    });
  }

  onEndDateCancel() {
    this.setState({
      showingEndDatePicker: false
    });
  }

  onFiltersPress() {
    this.setState({
      showingFiltersPicker: true
    });
  }

  onFiltersCancel() {
    this.setState({
      showingFiltersPicker: false
    });
  }

  onChangeVisibleTypes(visibleTypes) {
    this.props.onFiltersChange('visibleTypes', visibleTypes);
  }

  render() {
    const {startDate, endDate, total, search, types, visibleTypes} = this.props;

    const showStartDate = moment(startDate, 'YYYY-MM-DD').format('D MMM \'YY');
    const showEndDate = moment(endDate, 'YYYY-MM-DD').format('D MMM \'YY');

    const startDateObject = moment(startDate, 'YYYY-MM-DD').toDate();
    const endDateObject = moment(endDate, 'YYYY-MM-DD').toDate();

    const showTotal = total.toLocaleString(locale, {
      maximumFractionDigits: 2
    });

    return (
      <View style={styles.container}>
        <View style={styles.firstSection}>
          <TouchableHighlight
            style={styles.startDateGroup}
            onPress={this.onStartDatePress.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.3)"
          >
            <View style={{flex: 1}}>
              <View style={styles.dateLabelGroup}>
                <Image style={styles.dateImage} source={ require('../assets/calendar.png') } />
                <Text style={styles.dateLabel}>From</Text>
              </View>
              <Text style={styles.date}>{showStartDate}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.totalGroup}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>{showTotal}</Text>
          </View>
          <TouchableHighlight
            style={styles.endDateGroup}
            onPress={this.onEndDatePress.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.3)"
          >
            <View style={{flex: 1}}>
              <View style={styles.dateLabelGroup}>
                <Image style={styles.dateImage} source={ require('../assets/calendar.png') } />
                <Text style={styles.dateLabel}>To</Text>
              </View>
              <Text style={styles.date}>{showEndDate}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.secondSection}>
          <View style={styles.searchGroup}>
            <View style={styles.searchIcon}>
              <Image source={ require('../assets/search.png') } />
            </View>
            <TextInput
              placeholder="Search"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              style={styles.searchInput}
              onChangeText={this.onChangeSearch.bind(this)}
              value={search}
              returnKeyType="done"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <TouchableHighlight
            style={styles.filtersButton}
            onPress={this.onFiltersPress.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.3)"
          >
            <View style={styles.filtersButtonGroup}>
              <Image source={ require('../assets/funnel.png') } />
              <Text style={styles.filtersText}>Filters</Text>
            </View>
          </TouchableHighlight>
        </View>

        <ModalDatePicker
          visible={this.state.showingStartDatePicker}
          onRequestClose={this.onStartDateCancel.bind(this)}
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onChangeStartDate.bind(this)}
          date={startDateObject}
        />
        <ModalDatePicker
          visible={this.state.showingEndDatePicker}
          onRequestClose={this.onEndDateCancel.bind(this)}
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onChangeEndDate.bind(this)}
          date={endDateObject}
        />
        <ExpensesFiltersPicker
          visible={this.state.showingFiltersPicker}
          onRequestClose={this.onFiltersCancel.bind(this)}
          onVisibleTypesChange={this.onChangeVisibleTypes.bind(this)}
          types={types}
          visibleTypes={visibleTypes}
        />
      </View>
    );
  }
}

ExpensesHeader.propTypes = {
  startDate: React.PropTypes.string.isRequired,
  endDate: React.PropTypes.string.isRequired,
  total: React.PropTypes.number.isRequired,
  search: React.PropTypes.string.isRequired,
  visibleTypes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  types: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onFiltersChange: React.PropTypes.func.isRequired,
};

export default ExpensesHeader;
