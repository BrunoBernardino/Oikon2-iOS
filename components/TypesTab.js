import React, { Component } from 'react';
import {
  View,
  ListView,
  StatusBar,
  TouchableHighlight,
  Text,
} from 'react-native';

import TypeRow from './TypeRow';
import AddTypeModal from './AddTypeModal';
import EditTypeModal from './EditTypeModal';

import styles from '../styles/TypesTab';

class TypesTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingAddModal: false,
      showingEditModal: false,
      typeBeingEdited: {
        _id: '',
        _rev: '',
        name: '',
        cost: '',
        count: '',
      }
    };
  }

  renderTypeRow(type, source, rowIndex) {
    return (
      <TypeRow
        isOdd={(rowIndex % 2 === 1)}
        name={type.name}
        count={type.count}
        cost={type.cost}
        onTouch={this.showEditModal.bind(this, type)}
        onDelete={this.props.onDeleteType.bind(this, type)}
      />
    );
  }

  showEditModal(type) {
    // Don't allow editing uncategorized
    if (type.name === 'uncategorized') {
      return;
    }

    this.setState({
      showingEditModal: true,
      typeBeingEdited: type
    });
  }

  hideEditModal() {
    this.setState({
      showingEditModal: false
    });
  }

  showAddModal() {
    this.setState({
      showingAddModal: true,
    });
  }

  hideAddModal() {
    this.setState({
      showingAddModal: false
    });
  }

  render() {
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)});

    const { onAddType, onEditType, onDeleteType, uncategorizedCount, uncategorizedCost } = this.props;

    const typesToShow = JSON.parse(JSON.stringify(this.props.types));

    // Add "uncategorized" to the top
    typesToShow.unshift({
      id: 0,
      name: 'uncategorized',
      count: uncategorizedCount,
      cost: uncategorizedCost,
    });

    const listTypes = dataSource.cloneWithRows(typesToShow);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.showAddModal.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.3)"
          >
            <Text style={styles.buttonText}>Add New Expense Type</Text>
          </TouchableHighlight>
        </View>
        <ListView
          dataSource={listTypes}
          renderRow={this.renderTypeRow.bind(this)}
          style={styles.listContainer}
          automaticallyAdjustContentInsets={false}
          enableEmptySections={true}
        />
        <EditTypeModal
          visible={this.state.showingEditModal}
          type={this.state.typeBeingEdited}
          onSave={onEditType}
          onClose={this.hideEditModal.bind(this)}
          onDelete={onDeleteType}
        />
        <AddTypeModal
          visible={this.state.showingAddModal}
          onSave={onAddType}
          onClose={this.hideAddModal.bind(this)}
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
  uncategorizedCount: React.PropTypes.number.isRequired,
  uncategorizedCost: React.PropTypes.number.isRequired,
  onAddType: React.PropTypes.func.isRequired,
  onEditType: React.PropTypes.func.isRequired,
  onDeleteType: React.PropTypes.func.isRequired,
};

export default TypesTab;
