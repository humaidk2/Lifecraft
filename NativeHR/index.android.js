/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

export default class NativeHR extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" source={{uri: 'http://i.imgur.com/KTNujjY.gif'}} style={styles.petGif}/>
        <Text style={styles.welcome}>
          Humaid is currently sick!
        </Text>
        <Text>
          Petbox goes here
        </Text>
        <Text>
          Actions go in the bottom as buttons
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  petGif: {
    width: Dimensions.get('window').width,
    top: 0,
    // bottom: 500,
    // right: 0,
    // left: 0,
    height: 300,
    // alignItems: 'flex-start',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  footer: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('NativeHR', () => NativeHR);
