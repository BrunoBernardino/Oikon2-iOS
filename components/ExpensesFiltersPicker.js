import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Modal,
  Switch,
  ScrollView,
} from 'react-native';
import { BlurView } from 'react-native-blur';
import _ from 'lodash';

import styles from '../styles/ExpensesFiltersPicker';

class ExpensesFiltersPicker extends Component {
  toggleType(type, isVisible) {
    let { visibleTypes } = this.props;

    if (isVisible) {
      visibleTypes.push(type);
    } else {
      _.pull(visibleTypes, type);
    }

    this.props.onVisibleTypesChange(visibleTypes);
  }

  clearFilters() {
    this.props.onVisibleTypesChange([]);
  }

  isVisible(type) {
    const { visibleTypes } = this.props;

    return (visibleTypes.indexOf(type) !== -1);
  }

  render() {
    const { visible, onRequestClose, types } = this.props;

    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        >
       <BlurView blurType="light" style={styles.container}>
        <View style={styles.pane}>
          <View style={styles.headerGroup}>
            <TouchableHighlight
              onPress={this.clearFilters.bind(this)}
              underlayColor="rgba(255, 255, 255, 0.5)"
            >
              <Text style={styles.clearText}>Clear</Text>
            </TouchableHighlight>
            <Text style={styles.titleText}>Filters</Text>
            <TouchableHighlight
              onPress={onRequestClose}
              underlayColor="rgba(255, 255, 255, 0.5)"
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.filtersGroup}>
            <Text style={styles.filtersGroupTitle}>Expense Types</Text>
            <ScrollView>
              <View style={styles.typeGroup}>
                <Text style={styles.type}>uncategorized</Text>
                <Switch
                   style={styles.typeSwitch}
                  onValueChange={this.toggleType.bind(this, '')}
                  value={this.isVisible('')}
                />
              </View>
              {types.map((type, index) => {
                const rowStyle = (index % 2 === 1) ? styles.typeGroup : [styles.typeGroup, styles.oddTypeGroup];
                return (
                  <View key={index} style={rowStyle}>
                    <Text style={styles.type}>{type}</Text>
                    <Switch
                      style={styles.typeSwitch}
                      onValueChange={this.toggleType.bind(this, type)}
                      value={this.isVisible(type)}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
       </BlurView>
      </Modal>
    );
  }
}

ExpensesFiltersPicker.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  onRequestClose: React.PropTypes.func.isRequired,
  onVisibleTypesChange: React.PropTypes.func.isRequired,
  types: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  visibleTypes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default ExpensesFiltersPicker;
