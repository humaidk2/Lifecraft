import React, { Component } from 'react';
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
import PetBox from './petBox.js';
import Buttons from './buttons.js';
import StatusMessage from './statusMessage.js';
import Info from './info.js';
import Restart from './restart.js';
import Question from './question.js';
import {Scene, Router} from 'react-native-router-flux';
import NativeHR2 from './NativeHR2.js'

export default class NativeHR extends Component {
  constructor(props) {
    super(props);

  };

  render() {

    return (
      <Router hideNavBar={true}>
        <Scene key="root">
          <Scene key="NativeHR2" initial={true} component={NativeHR2} title="Home"/>
              <Scene key="petBox" component={PetBox} title="Register"/>
              <Scene key="question" component={Question} title="Question"/>
          </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('NativeHR', () => NativeHR);
