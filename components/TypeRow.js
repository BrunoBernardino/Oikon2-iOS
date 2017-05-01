import React, { Component } from 'react';
import {
  NativeModules,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import styles from '../styles/TypeRow';

const locale = NativeModules.SettingsManager.settings.AppleLocale.replace('_', '-');

class TypeRow extends Component {
  render() {
    const {isOdd, name, count, cost, onTouch} = this.props;

    const rowStyle = isOdd ? styles.container : styles.oddContainer;

    const showCount = `${count} Expense${count === 1 ? '' : 's'}`;

    const showCost = cost.toLocaleString(locale, {
      maximumFractionDigits: 2
    });

    return (
      <TouchableHighlight
        onPress={onTouch}
        underlayColor="rgba(255, 255, 255, 0.5)"
      >
        <View style={rowStyle}>
          <View style={styles.nameGroup}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Text style={styles.count} numberOfLines={1}>{showCount}</Text>
          </View>
          <Text style={styles.cost} numberOfLines={1}>{showCost}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

TypeRow.propTypes = {
  isOdd: React.PropTypes.bool.isRequired,
  name: React.PropTypes.string.isRequired,
  count: React.PropTypes.number.isRequired,
  cost: React.PropTypes.number.isRequired,
  onTouch: React.PropTypes.func.isRequired,
};

export default TypeRow;
