import React, { Component } from 'react';
import {
  View,
  ListView,
  StatusBar,
  TouchableHighlight,
  Text,
} from 'react-native';

import TypeRow from './TypeRow';

import styles from '../styles/TypesTab';

class TypesTab extends Component {
  renderTypeRow(type, source, rowIndex) {
    return (
      <TypeRow
        isOdd={(rowIndex % 2 === 1)}
        name={type.name}
        count={type.count}
        cost={type.cost}
      />
    );
  }

  onAddPress() {
    // TODO: Show pane
  }

  render() {
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)});

    const listTypes = dataSource.cloneWithRows(this.props.types);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onAddPress.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.3)"
          >
            <Text style={styles.buttonText}>Add New Expense Type</Text>
          </TouchableHighlight>
        </View>
        <ListView
          dataSource={listTypes}
          renderRow={this.renderTypeRow}
          style={styles.listContainer}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

TypesTab.propTypes = {
  types: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    count: React.PropTypes.number.isRequired,
    cost: React.PropTypes.number.isRequired
  })).isRequired,
};

export default TypesTab;
