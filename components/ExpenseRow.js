import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import moment from 'moment';

import styles from '../styles/ExpenseRow';

class ExpenseRow extends Component {
  render() {
    const {isOdd, name, cost, type, date, onTouch} = this.props;

    const rowStyle = isOdd ? styles.container : styles.oddContainer;

    // Boo! React Native doesn't support text transform for uppercase
    const showDate = moment(date, 'YYYY-MM-DD').format('D MMM').toUpperCase();
    // Boo! React Native doesn't support text transform for uppercase
    const showType = type.toUpperCase();

    const singleLine = (
      <Text style={styles.singleName} numberOfLines={1}>{name}</Text>
    );

    const multiLine = (
      <View style={styles.nameGroup}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.type} numberOfLines={1}>{showType}</Text>
      </View>
    );

    const nameGroup = showType === '' ? singleLine : multiLine;

    return (
      <TouchableHighlight
        onPress={onTouch}
        underlayColor="rgba(255, 255, 255, 0.5)"
      >
        <View style={rowStyle}>
          {nameGroup}
          <Text style={styles.date} numberOfLines={1}>{showDate}</Text>
          <Text style={styles.cost} numberOfLines={1}>{cost}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

ExpenseRow.propTypes = {
  isOdd: React.PropTypes.bool.isRequired,
  name: React.PropTypes.string.isRequired,
  cost: React.PropTypes.number.isRequired,
  type: React.PropTypes.string,
  date: React.PropTypes.string.isRequired,
  onTouch: React.PropTypes.func.isRequired
};

export default ExpenseRow;
