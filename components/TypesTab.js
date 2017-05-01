import React, { Component } from 'react';
import {
  View,
  ListView,
  StatusBar,
  TouchableHighlight,
  Text,
  RefreshControl,
} from 'react-native';

import TypeRow from './TypeRow';
import AddTypeModal from './AddTypeModal';
import EditTypeModal from './EditTypeModal';

import styles from '../styles/TypesTab';

class TypesTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshingData: false,
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
      />
    );
  }

  showEditModal(type) {
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

  onRefresh() {
    this.setState({
      refreshingData: true,
    });

    this.props.onLoad();// TODO: This isn't async, so this is a "fake" load time

    setTimeout(() => {
      this.setState({
        refreshingData: false,
      });
    }, 1200);
  }

  render() {
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)});

    const listTypes = dataSource.cloneWithRows(this.props.types);

    const { onAddType, onEditType, onDeleteType } = this.props;

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
          refreshControl={
            <RefreshControl
              tintColor="#FFFFFF"
              refreshing={this.state.refreshingData}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
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
  onAddType: React.PropTypes.func.isRequired,
  onEditType: React.PropTypes.func.isRequired,
  onDeleteType: React.PropTypes.func.isRequired,
  onLoad: React.PropTypes.func.isRequired,
};

export default TypesTab;
