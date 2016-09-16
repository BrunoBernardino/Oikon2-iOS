import React, { Component } from 'react';
import {
  TextInput,
  View,
  Text
} from 'react-native';

import styles from '../styles/ModalInput';

class ModalInput extends Component {
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
      isOdd,
      onChangeText,
      label,
      value,
      returnKeyType,
      keyboardType,
      autoCapitalize,
      autoCorrect,
      onSubmitEditing,
      onFocus
    } = this.props;

    const containerStyles = isOdd ? [styles.container, styles.oddContainer] : styles.container;

    return (
      <View style={containerStyles}>
        <Text style={styles.label}>
          {label}
        </Text>
        <TextInput
          ref="input"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={styles.input}
          onChangeText={onChangeText}
          value={(value || '').toString()}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          allowFontScaling={true}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
        />
      </View>
    );
  }
}

ModalInput.propTypes = {
  isOdd: React.PropTypes.bool.isRequired,
  onChangeText: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
  returnKeyType: React.PropTypes.string,
  keyboardType: React.PropTypes.string,
  autoCapitalize: React.PropTypes.oneOf([ 'none', 'sentences', 'words', 'characters', ]),
  autoCorrect: React.PropTypes.bool,
  onSubmitEditing: React.PropTypes.func,
  onFocus: React.PropTypes.func
};

ModalInput.defaultProps = {
  autoCapitalize: 'sentences',
  autoCorrect: true
};

export default ModalInput;
