import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  DatePickerIOS,
  Modal,
} from 'react-native';
import { BlurView } from 'react-native-blur';

import styles from '../styles/ModalDatePicker';

class ModalDatePicker extends Component {
  render() {
    const {
      visible,
      onRequestClose,
      timeZoneOffsetInMinutes,
      onDateChange,
      date,
      onSavePress,
      onNextPress,
    } = this.props;

    const simpleHeader = (
      <View style={styles.headerSingle}>
        <TouchableHighlight
          onPress={onRequestClose}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchableHighlight>
      </View>
    );

    const completeHeader = (
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
    );

    const finalHeader = (onSavePress && onNextPress) ? completeHeader : simpleHeader;

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
            {finalHeader}

            <DatePickerIOS
              style={styles.picker}
              date={date}
              mode="date"
              timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
              onDateChange={onDateChange}
            />
          </View>
        </BlurView>
      </Modal>
    );
  }
}

ModalDatePicker.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  onRequestClose: React.PropTypes.func.isRequired,
  timeZoneOffsetInMinutes: React.PropTypes.number.isRequired,
  onDateChange: React.PropTypes.func.isRequired,
  date: React.PropTypes.object.isRequired,
  onSavePress: React.PropTypes.func,
  onNextPress: React.PropTypes.func,
};

export default ModalDatePicker;
