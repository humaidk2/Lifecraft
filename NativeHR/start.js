import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  DeviceEventEmitter,
  Animated,
} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import PetBox from './petBox.js';
import Buttons from './buttons.js';
import StatusMessage from './statusMessage.js';
import Info from './info.js';
import Restart from './restart.js';
import Question from './question.js';
import Login from './login.js';
import Signup from './signup.js';
import Petlist from './petlist.js';
import NativeHR2 from './NativeHR2.js';
import cookingChallenge from './cookingChallenge.js';
import exerciseChallenge from './exerciseChallenge.js';
import sleepingChallenge from './sleepingChallenge.js';
import quizChallenge from './quizChallenge.js';

const styles = StyleSheet.create({
  startContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  startImg: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    flex: 1,
    marginTop: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    height: 45,
    width: 120,
  }
});

export default class start extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  goToLogin() {
    Actions.Login({type: 'reset'});
  }

  render() {
    return (
      <View style={styles.startContainer}>
        <Image source={{uri: 'start'}} style={styles.startImg}>
          <TouchableHighlight style={styles.buttonContainer} onPress={this.goToLogin.bind(this)}>
            <Image source={{uri: 'startbutton'}} style={styles.startButton}></Image>
          </TouchableHighlight>
        </Image>
      </View>
    );
  }
}

