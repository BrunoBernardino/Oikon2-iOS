import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import styles from '../styles/CommonTopKeyboardView';

class CommonTopKeyboardView extends Component {
  render() {
    const {
      visible,
      visibleY,
      keyboardWidth,
      onClose,
      onSavePress,
      onNextPress,
    } = this.props;

    // Don't show if it shouldn't
    if (!visible) {
      return null;
    }

    const panelHeight = 45;

    const containerStyle = {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: visibleY - panelHeight + 5,
      width: keyboardWidth
    };

    // Can't be stylesheet because it's dynamically changing
    const headerStyle = {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderTopColor: 'rgba(255, 255, 255, 0.8)',
      borderTopWidth: 1,
      position: 'relative',
    };

    return (
      <View style={containerStyle}>
        <View style={headerStyle}>
          <TouchableHighlight
            onPress={onClose}
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={onSavePress}
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={onNextPress}
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

CommonTopKeyboardView.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  visibleY: React.PropTypes.number.isRequired,
  keyboardWidth: React.PropTypes.number.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onSavePress: React.PropTypes.func.isRequired,
  onNextPress: React.PropTypes.func.isRequired,
};

export default CommonTopKeyboardView;
