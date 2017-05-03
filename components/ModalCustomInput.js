import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import styles from '../styles/ModalCustomInput';

class ModalCustomInput extends Component {
  render() {
    const {
      isOdd,
      onShowInput,
      label,
      value,
    } = this.props;

    const containerStyles = isOdd ? [styles.container, styles.oddContainer] : styles.container;

    return (
      <View style={containerStyles}>
        <Text style={styles.label}>
          {label}
        </Text>
        <TouchableHighlight
          onPress={onShowInput}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <Text
            style={styles.input}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {(value || '').toString()}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

ModalCustomInput.propTypes = {
  isOdd: React.PropTypes.bool.isRequired,
  onShowInput: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
};

export default ModalCustomInput;
