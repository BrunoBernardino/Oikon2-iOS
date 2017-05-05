import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  Alert,
  Keyboard
} from 'react-native';
import { BlurView } from 'react-native-blur';
import dismissKeyboard from 'react-native-dismiss-keyboard';

import ModalInput from './ModalInput';
import CommonTopKeyboardView from './CommonTopKeyboardView';

import styles from '../styles/EditTypeModal';

class EditTypeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: '',
      _rev: '',
      name: '',
      count: '',
      cost: '',
      focusedInput: '',
      showingKeyboard: false,
      keyboardY: 0,
      keyboardWidth: 0,
    };
  }

  componentWillMount () {
    // Listen for when the keyboard will show/hide to add the common adjacent top view
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      _id: nextProps.type._id,
      _rev: nextProps.type._rev,
      name: nextProps.type.name,
      count: nextProps.type.count,
      cost: nextProps.type.cost,
    });
  }

  keyboardWillShow (frame) {
    // Show the common adjacent top view
    this.setState({
      showingKeyboard: true,
      keyboardY: frame.endCoordinates.screenY,
      keyboardWidth: frame.endCoordinates.width,
    });
  }

  keyboardWillHide () {
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
      _id: this.state._id,
      _rev: this.state._rev,
      name: this.state.name,
      count: this.state.count,
      cost: this.state.cost,
    };

    this.props.onSave(type);
    this.hideAllInputs();
    // This is necessary so both views actually go away
    setTimeout(this.props.onClose.bind(this), 0);
  }

  onDeletePress() {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to delete this expense type?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => this.onDeleteConfirm(),
          style: 'destructive'
        },
      ]
    );
  }

  onDeleteConfirm() {
    const expense = {
      _id: this.state._id,
      _rev: this.state._rev,
      name: this.state.name,
      count: this.state.count,
      cost: this.state.cost,
    };

    this.props.onDelete(expense);
    this.hideAllInputs();
    // This is necessary so both views actually go away
    setTimeout(this.props.onClose.bind(this), 0);
  }

  render() {
    const { visible, onClose } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        >
        <BlurView blurType="light" style={styles.container}>
          <View style={this.state.showingKeyboard ? styles.emptyShortSpace : styles.emptySpace}></View>
          <View style={styles.pane}>
            <View style={styles.headerGroup}>
              <TouchableHighlight
                onPress={this.onDeletePress.bind(this)}
                underlayColor="rgba(255, 255, 255, 0.5)"
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableHighlight>
              <Text style={styles.titleText}>Edit</Text>
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

EditTypeModal.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  type: React.PropTypes.shape({
    _id: React.PropTypes.string.isRequired,
    _rev: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default EditTypeModal;
