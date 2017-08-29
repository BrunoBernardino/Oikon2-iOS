import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Image,
  Text,
  TouchableHighlight,
  Linking,
} from 'react-native';

import BigInput from './BigInput';

import styles from '../styles/SettingsTab';

class SettingsTab extends Component {
  openURL() {
    Linking.openURL('https://oikon.net');
  }

  render() {
    const {
      remoteURL,
      onRemoteURLChange,
      onRemoteURLFinishEditing,
      onExportPress,
      onImportPress,
      onDeleteAllPress,
    } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image source={ require('../assets/logo.png') } />
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <BigInput
            placeholder="https://example.com"
            onChangeText={onRemoteURLChange}
            onEndEditing={onRemoteURLFinishEditing}
            label="URL"
            value={remoteURL}
            returnKeyType="done"
            keyboardType="url"
            smallerFont={true}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            blurOnSubmit={true}
          />
          <Text style={styles.instructions}>
            URL for a Remote CouchDB server.{'\n'}No trailing slash.
          </Text>
          <View style={styles.dataButtonsContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={onExportPress}
              underlayColor="rgba(255, 255, 255, 0.3)"
            >
              <Text style={styles.buttonText}>Export CSV</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={onImportPress}
              underlayColor="rgba(255, 255, 255, 0.3)"
            >
              <Text style={styles.buttonText}>Import CSV</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.dataButtonsContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={this.openURL.bind(this)}
              underlayColor="rgba(255, 255, 255, 0.3)"
            >
              <Text style={styles.buttonText}>Get Help</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.deleteButtonContainer}>
            <TouchableHighlight
              style={styles.deleteButton}
              onPress={onDeleteAllPress}
              underlayColor="rgba(255, 255, 255, 0.3)"
            >
              <Text style={styles.deleteButtonText}>Delete All Data</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.instructions}>
            This is irreversible.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

SettingsTab.propTypes = {
  remoteURL: React.PropTypes.string.isRequired,
  onRemoteURLChange: React.PropTypes.func.isRequired,
  onRemoteURLFinishEditing: React.PropTypes.func.isRequired,
  onExportPress: React.PropTypes.func.isRequired,
  onImportPress: React.PropTypes.func.isRequired,
  onDeleteAllPress: React.PropTypes.func.isRequired,
};

export default SettingsTab;
