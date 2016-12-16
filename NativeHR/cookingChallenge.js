import React from 'react';
import { SensorManager } from 'NativeModules';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  DeviceEventEmitter,
  Animated,
} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import Sound from 'react-native-sound';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  questionContainer: {
    flex: 10.5,
  },
  questionOverlay: {
    flex: 1,
  },
  gifContainer: {
    flex: 4,
  },
  statusContainer: {
    flex: 1,
  },
  statusMsg: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  statusText: {
    color: 'red',
  },
  statsContainer: {
    flex: 3.5,
  },
  logContainer: {
    flex: 2,
    paddingLeft: 20
  },
  actionContainer: {
    flex: 1.2,
    paddingTop: 10,
  },
  petGif: {
    width: Dimensions.get('window').width,
    top: 0,
    height: 226
  }

});

// var counter = 30;

// setInterval(function() {
//   counter--;
// }, 1000);

var cookingChallenge = (props) => {
  return (
    <Animated.View style={[styles.appContainer, {backgroundColor: 'white'}]}>
    <Image source={{uri: 'cookingmg'}} style={{height: 226, width: Dimensions.get('window').width}}></Image>
    <Text>Cooking Challenge</Text>
    <View style={{flexDirection: 'row'}}>
    <Text>Timer: 30s left  </Text>
    <Text>Total Points: 5  </Text>
    <Text>Points Needed: 30</Text>
    </View>

    <Text>Random generate text with cool colors/effects for sucessful cook!!!</Text>
    <Text>example popups: AWESOME FLIP!, BEAUTIFUL, MAGNIFICENT, WONDERFUL, MAJESTIC, DONT STOP, BREATHTAKING COOKING</Text>

    <Text>Add music</Text>
    <Text>If successful, s</Text>

    </Animated.View>
    );
};

module.exports = cookingChallenge;