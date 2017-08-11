import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import styles from '../styles/BigCustomInput';

class BigCustomInput extends Component {
  render() {
    const {
      placeholder,
      onShowInput,
      label,
      value,
    } = this.props;

    const inputStyle = value ? styles.input : styles.placeholder;
    const inputText = value ? value : placeholder;

    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
          </Text>
        </View>
        <TouchableHighlight
          onPress={onShowInput}
          underlayColor="rgba(255, 255, 255, 0.5)"
          style={{flex: 1}}
        >
          <Text
            style={inputStyle}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {inputText}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

BigCustomInput.propTypes = {
  placeholder: React.PropTypes.string.isRequired,
  onShowInput: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
};

export default BigCustomInput;
