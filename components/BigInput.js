import React, { Component } from 'react';
import {
  TextInput,
  View,
  Text
} from 'react-native';

import styles from '../styles/BigInput';

class BigInput extends Component {
  // When focusing on this component, focus on the TextInput
  focus() {
    this.refs.input.focus();
  }

  // When blurring on this component, blur the TextInput
  blur() {
    this.refs.input.blur();
  }

  render() {
    const {
      placeholder,
      onChangeText,
      label,
      value,
      returnKeyType,
      keyboardType,
      smallerFont,
      autoCapitalize,
      autoCorrect,
      secureTextEntry,
      onSubmitEditing,
      onFocus,
      onEndEditing,
    } = this.props;

    const inputStyle = smallerFont ? styles.smallInput : styles.input;

    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
          </Text>
        </View>
        <TextInput
          ref="input"
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={inputStyle}
          onChangeText={onChangeText}
          value={value}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          allowFontScaling={true}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
          onEndEditing={onEndEditing}
        />
      </View>
    );
  }
}

BigInput.propTypes = {
  placeholder: React.PropTypes.string.isRequired,
  onChangeText: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
  returnKeyType: React.PropTypes.string,
  keyboardType: React.PropTypes.string,
  smallerFont: React.PropTypes.bool,
  autoCapitalize: React.PropTypes.oneOf([ 'none', 'sentences', 'words', 'characters', ]),
  autoCorrect: React.PropTypes.bool,
  secureTextEntry: React.PropTypes.bool,
  onSubmitEditing: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onEndEditing: React.PropTypes.func,
};

BigInput.defaultProps = {
  smallerFont: false,
  autoCapitalize: 'sentences',
  autoCorrect: true
};

export default BigInput;
