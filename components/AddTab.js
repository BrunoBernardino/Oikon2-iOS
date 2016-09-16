import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Image,
  TouchableHighlight,
  Text,
  Keyboard
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import dismissKeyboard from 'react-native-dismiss-keyboard';

import BigInput from './BigInput';
import BigCustomInput from './BigCustomInput';
import CommonTopKeyboardView from './CommonTopKeyboardView';
import TypePicker from './TypePicker';
import ModalDatePicker from './ModalDatePicker';

import styles from '../styles/AddTab';

class AddTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cost: '',
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

  addExpense() {
    const success = this.props.onAddExpense({
      cost: this.state.cost,
      name: this.state.name,
      type: this.state.type,
      date: this.state.date
    });

    if (success) {
      this.setState({
        cost: '',
        name: '',
        type: '',
        date: ''
      });
    }

    this.hideAllInputs();
  }

  render() {
    const { types } = this.props;

    const dateObject = this.state.date ? moment(this.state.date, 'YYYY-MM-DD').toDate() : new Date();
    const showDate = this.state.date ? moment(this.state.date, 'YYYY-MM-DD').format('D MMM \'YY') : '';

    // Sort types by name
    let sortedTypes = _.cloneDeep(types).sort();

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image source={ require('../assets/logo.png') } />
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <BigInput
            ref="costInput"
            placeholder="9.99"
            onChangeText={this.onChangeInput.bind(this, 'cost')}
            label="Cost"
            value={this.state.cost}
            returnKeyType="next"
            keyboardType="numeric"
            onSubmitEditing={this.onNextPress.bind(this, 'cost')}
            onFocus={this.setFocusedField.bind(this, 'cost')}
          />
          <BigInput
            ref="nameInput"
            placeholder="coffee"
            onChangeText={this.onChangeInput.bind(this, 'name')}
            label="Name"
            value={this.state.name}
            returnKeyType="next"
            ref="nameInput"
            onSubmitEditing={this.onNextPress.bind(this, 'name')}
            onFocus={this.setFocusedField.bind(this, 'name')}
          />
          <BigCustomInput
            placeholder="(auto)"
            onShowInput={this.showCustomInput.bind(this, 'type')}
            label="Type"
            value={this.state.type}
          />
          <BigCustomInput
            placeholder="today"
            onShowInput={this.showCustomInput.bind(this, 'date')}
            label="Date"
            value={showDate}
          />
          <TouchableHighlight
            onPress={this.addExpense.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <Text style={styles.addExpenseText}>Add Expense</Text>
          </TouchableHighlight>
        </ScrollView>

        <CommonTopKeyboardView
          visible={this.state.showingKeyboard}
          visibleY={this.state.keyboardY}
          keyboardWidth={this.state.keyboardWidth}
          onClose={this.hideAllInputs.bind(this)}
          onSavePress={this.addExpense.bind(this)}
          onNextPress={this.onNextPress.bind(this, this.state.focusedInput)}
        />
        <TypePicker
          visible={this.state.showingTypePicker}
          onRequestClose={this.onCustomInputCancel.bind(this, 'type')}
          onSavePress={this.addExpense.bind(this)}
          onNextPress={this.onNextPress.bind(this, 'type')}
          onTypeChange={this.onChangeInput.bind(this, 'type')}
          type={this.state.type}
          types={sortedTypes}
        />
        <ModalDatePicker
          visible={this.state.showingDatePicker}
          onRequestClose={this.onCustomInputCancel.bind(this, 'date')}
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onChangeDate.bind(this)}
          onSavePress={this.addExpense.bind(this)}
          onNextPress={this.onNextPress.bind(this, 'date')}
          date={dateObject}
        />
      </View>
    );
  }
}

AddTab.propTypes = {
  onAddExpense: React.PropTypes.func.isRequired,
  types: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default AddTab;
