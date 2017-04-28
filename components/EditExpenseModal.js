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
import moment from 'moment';
import dismissKeyboard from 'react-native-dismiss-keyboard';

import ModalInput from './ModalInput';
import ModalCustomInput from './ModalCustomInput';
import CommonTopKeyboardView from './CommonTopKeyboardView';
import TypePicker from './TypePicker';
import ModalDatePicker from './ModalDatePicker';

import styles from '../styles/EditExpenseModal';

class EditExpenseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: '',
      _rev: '',
      cost: 0,
      name: '',
      type: '',
      date: '',
      focusedInput: '',
      showingKeyboard: false,
      keyboardY: 0,
      keyboardWidth: 0,
      showingTypePicker: false,
      showingDatePicker: false,
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  }

  componentWillMount () {
    // Listen for when the keyboard will show/hide to add the common adjacent top view
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      _id: nextProps.expense._id,
      _rev: nextProps.expense._rev,
      cost: nextProps.expense.cost,
      name: nextProps.expense.name,
      type: nextProps.expense.type,
      date: nextProps.expense.date
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

  onChangeDate(date) {
    // Convert date to string
    const parsedDate = moment(date).format('YYYY-MM-DD');

    this.setState({
      'date': parsedDate,
    });
  }

  showCustomInput(type) {
    const stateProperty = (type === 'type') ? 'showingTypePicker' : 'showingDatePicker';

    this.setState({
      [stateProperty]: true,
    });
  }

  onCustomInputCancel(type) {
    const stateProperty = (type === 'type') ? 'showingTypePicker' : 'showingDatePicker';

    this.setState({
      [stateProperty]: false,
    });
  }

  // Logic for pressing "Next" or "Done" from the keyboard top pane
  onNextPress(fromProperty) {
    // Hide everything
    this.hideAllInputs();

    if (fromProperty === 'cost') {
      // Focus Name now
      this.refs.nameInput.focus();
    } else if (fromProperty === 'name') {
      // Focus Type now
      this.showCustomInput('type');
    } else if (fromProperty === 'type') {
      this.onCustomInputCancel('type');

      // Focus Date now
      this.showCustomInput('date');
    }
  }

  hideAllInputs() {
    this.refs.costInput.blur();
    this.refs.nameInput.blur();
    dismissKeyboard();
    this.onCustomInputCancel('type');
    this.onCustomInputCancel('date');
  }

  onSavePress() {
    const expense = {
      _id: this.state._id,
      _rev: this.state._rev,
      cost: this.state.cost,
      name: this.state.name,
      type: this.state.type,
      date: this.state.date
    };

    this.props.onSave(expense);
    this.hideAllInputs();
    // This is necessary so both views actually go away
    setTimeout(this.props.onClose.bind(this), 0);
  }

  onDeletePress() {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to delete this expense?',
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
      cost: this.state.cost,
      name: this.state.name,
      type: this.state.type,
      date: this.state.date
    };

    this.props.onDelete(expense);
    this.hideAllInputs();
    // This is necessary so both views actually go away
    setTimeout(this.props.onClose.bind(this), 0);
  }

  render() {
    const { visible, onClose, types } = this.props;

    const dateObject = this.state.date ? moment(this.state.date, 'YYYY-MM-DD').toDate() : new Date();
    const showDate = this.state.date ? moment(this.state.date, 'YYYY-MM-DD').format('YYYY-MM-DD') : '';

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        >
        <BlurView blurType="light" style={styles.container}>
          <View style={styles.emptySpace}></View>
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

            <View style={styles.expenseContainer}>
              <ModalInput
                isOdd={false}
                ref="costInput"
                onChangeText={this.onChangeInput.bind(this, 'cost')}
                label="Cost"
                value={this.state.cost}
                returnKeyType="next"
                keyboardType="numeric"
                onSubmitEditing={this.onNextPress.bind(this, 'cost')}
                onFocus={this.setFocusedField.bind(this, 'cost')}
              />
              <ModalInput
                isOdd={true}
                ref="nameInput"
                onChangeText={this.onChangeInput.bind(this, 'name')}
                label="Name"
                value={this.state.name}
                returnKeyType="next"
                ref="nameInput"
                onSubmitEditing={this.onNextPress.bind(this, 'name')}
                onFocus={this.setFocusedField.bind(this, 'name')}
              />
              <ModalCustomInput
                isOdd={false}
                onShowInput={this.showCustomInput.bind(this, 'type')}
                label="Type"
                value={this.state.type}
              />
              <ModalCustomInput
                isOdd={true}
                onShowInput={this.showCustomInput.bind(this, 'date')}
                label="Date"
                value={showDate}
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
          <TypePicker
            visible={this.state.showingTypePicker}
            onRequestClose={this.onCustomInputCancel.bind(this, 'type')}
            onSavePress={this.onSavePress.bind(this)}
            onNextPress={this.onNextPress.bind(this, 'type')}
            onTypeChange={this.onChangeInput.bind(this, 'type')}
            type={this.state.type}
            types={types}
          />
          <ModalDatePicker
            visible={this.state.showingDatePicker}
            onRequestClose={this.onCustomInputCancel.bind(this, 'date')}
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onChangeDate.bind(this)}
            onSavePress={this.onSavePress.bind(this)}
            onNextPress={this.onNextPress.bind(this, 'date')}
            date={dateObject}
          />
        </BlurView>
      </Modal>
    );
  }
}

EditExpenseModal.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  expense: React.PropTypes.shape({
    _id: React.PropTypes.string.isRequired,
    _rev: React.PropTypes.string.isRequired,
    cost: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
  }).isRequired,
  types: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default EditExpenseModal;
