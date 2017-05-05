import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Picker,
  Modal,
} from 'react-native';
import { BlurView } from 'react-native-blur';

import styles from '../styles/TypePicker';

class TypePicker extends Component {
  render() {
    const {
      visible,
      onRequestClose,
      onSavePress,
      onNextPress,
      types,
      onTypeChange,
      type
    } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        >
        <BlurView blurType="light" style={styles.container}>
          <View style={styles.emptySpace}></View>
          <View style={styles.pane}>
            <View style={styles.headerGroup}>
              <TouchableHighlight
                onPress={onRequestClose}
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

            <Picker
              style={styles.picker}
              selectedValue={type}
              mode="dropdown"
              onValueChange={onTypeChange}
            >
              <Picker.Item label="(auto)" value="" />
              <Picker.Item label="uncategorized" value="uncategorized" />
              {types.map((theType, index) => {
                return <Picker.Item key={index} label={theType} value={theType} />;
              })}
            </Picker>
          </View>
        </BlurView>
      </Modal>
    );
  }
}

TypePicker.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  onRequestClose: React.PropTypes.func.isRequired,
  onSavePress: React.PropTypes.func.isRequired,
  onNextPress: React.PropTypes.func.isRequired,
  types: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  onTypeChange: React.PropTypes.func.isRequired,
  type: React.PropTypes.string.isRequired,
};

export default TypePicker;
