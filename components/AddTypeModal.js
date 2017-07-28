import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  Keyboard
} from 'react-native';
import { BlurView } from 'react-native-blur';
import dismissKeyboard from 'react-native-dismiss-keyboard';

import ModalInput from './ModalInput';
import CommonTopKeyboardView from './CommonTopKeyboardView';

import styles from '../styles/AddTypeModal';

class AddTypeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      focusedInput: '',
      showingKeyboard: false,
      keyboardY: 0,
      keyboardWidth: 0,
    };
  }

  componentWillMount() {
    // Listen for when the keyboard will show/hide to add the common adjacent top view
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  keyboardWillShow(frame) {
    // Show the common adjacent top view
    this.setState({
      showingKeyboard: true,
      keyboardY: frame.endCoordinates.screenY,
      keyboardWidth: frame.endCoordinates.width,
    });
  }

  keyboardWillHide() {
    // Hide the common adjacent top view
    this.setState({
      showingKeyboard: false
    });
  }

  setFocusedField(type) {
    // Define which field is focused
    this.setState({
      focusedInput: type
    });
  }

  onChangeInput(type, value) {
    // Change the "input"
    this.setState({
      [type]: value,
    });
  }

  // Logic for pressing "Next" or "Done" from the keyboard top pane
  onNextPress() {
    // Hide everything
    this.hideAllInputs();
  }

  hideAllInputs() {
    this.refs.nameInput.blur();
    dismissKeyboard();
  }

  onSavePress() {
    const type = {
      name: this.state.name,
    };

    const success = this.props.onSave(type);

    this.hideAllInputs();
    // This is necessary so both views actually go away
    setTimeout(this.props.onClose.bind(this), 0);

    if (success) {
      this.setState({
        name: '',
      });
    }
  }

  onShow() {
    if (this.props.visible && !this.state.showingKeyboard) {
      this.refs.nameInput.focus();
    }
  }

  render() {
    const { visible, onClose } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        onShow={this.onShow.bind(this)}
      >
        <BlurView blurType="light" style={styles.container}>
          <View style={this.state.showingKeyboard ? styles.emptyShortSpace : styles.emptySpace}></View>
          <View style={styles.pane}>
            <View style={styles.headerGroup}>
              <Text style={styles.titleText}>New Expense Type</Text>
              <TouchableHighlight
                onPress={onClose}
                underlayColor="rgba(255, 255, 255, 0.5)"
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.typeContainer}>
              <ModalInput
                isOdd={false}
                ref="nameInput"
                onChangeText={this.onChangeInput.bind(this, 'name')}
                label="Name"
                value={this.state.name}
                returnKeyType="done"
                ref="nameInput"
                onSubmitEditing={this.onNextPress.bind(this, 'name')}
                onFocus={this.setFocusedField.bind(this, 'name')}
              />

              <View style={styles.saveButtonContainer}>
                <TouchableHighlight
                  style={styles.saveButton}
                  onPress={this.onSavePress.bind(this)}
                  underlayColor="rgba(255, 255, 255, 0.3)"
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>

          <CommonTopKeyboardView
            visible={this.state.showingKeyboard}
            visibleY={this.state.keyboardY}
            keyboardWidth={this.state.keyboardWidth}
            onClose={this.hideAllInputs.bind(this)}
            onSavePress={this.onSavePress.bind(this)}
            onNextPress={this.onNextPress.bind(this, this.state.focusedInput)}
          />
        </BlurView>
      </Modal>
    );
  }
}

AddTypeModal.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
};

export default AddTypeModal;
