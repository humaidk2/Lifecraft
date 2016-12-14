import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import PetBox from './petBox.js';
import Buttons from './buttons.js';
import StatusMessage from './statusMessage.js';

export default class NativeHR extends Component {
  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.gifContainer}>
        </View>
        <View style={styles.statusContainer}>
        </View>
        <View style={styles.statsContainer}>
          <PetBox />
        </View>
        <View style={styles.logContainer}>
          <StatusMessage />
        </View>
        <View style={styles.actionContainer}>
          <Buttons />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  gifContainer: {
    flex: 4,
    backgroundColor: 'red',
  },
  statusContainer: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  statsContainer: {
    flex: 3.5,
    backgroundColor: 'green',
  },
  logContainer: {
    flex: 2,
    backgroundColor: 'lightskyblue',
    paddingLeft: 20
  },
  actionContainer: {
    paddingTop: 10,
    flex: 1.2
  }
});

AppRegistry.registerComponent('NativeHR', () => NativeHR);
