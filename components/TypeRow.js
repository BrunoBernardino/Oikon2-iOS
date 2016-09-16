import React, { Component } from 'react';
import {
  NativeModules,
  View,
  Text
} from 'react-native';

import styles from '../styles/TypeRow';

const locale = NativeModules.SettingsManager.settings.AppleLocale.replace('_', '-');

class TypeRow extends Component {
  render() {
    const {isOdd, name, count, cost} = this.props;

    const rowStyle = isOdd ? styles.container : styles.oddContainer;

    const showCount = `${count} Expense${count === 1 ? '' : 's'}`;

    const showCost = cost.toLocaleString(locale, {
      maximumFractionDigits: 2
    });

    return (
      <View style={rowStyle}>
        <View style={styles.nameGroup}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.count}>{showCount}</Text>
        </View>
        <Text style={styles.cost}>{showCost}</Text>
      </View>
    );
  }
}

TypeRow.propTypes = {
  isOdd: React.PropTypes.bool.isRequired,
  name: React.PropTypes.string.isRequired,
  count: React.PropTypes.number.isRequired,
  cost: React.PropTypes.number.isRequired
};

export default TypeRow;
