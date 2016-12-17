import React, {Component} from 'react';
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
  Button,
  TouchableHighlight,
} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import Sound from 'react-native-sound';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
  },
  gifContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  infoContainer: {
    flex: 2,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 36,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
  },
  barContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 30,
  },
  inputContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapCircle: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapCircleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 36,
  },
  continueContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  }
});

var mSensorManager = require('NativeModules').SensorManager;

export default class cookingChallenge extends Component {
  constructor(props) {
    super(props);
    this.triggerCooking.bind(this);
    this.state = {
      progressPercent: 0,
      gameStart: false,
      gameComplete: false,
      buttonText: 'START',
      buttonColor: 'blue',
      continueButton: null,
    };
  }

  componentDidMount() {
    var that = this;
    DeviceEventEmitter.addListener('Accelerometer', function (data) {
      //Cook
      if (Math.abs(data.y) > 10 && Math.abs(data.z) > 20) {
        if (that.state.gameStart && !that.state.gameComplete) {
          that.triggerCooking();
        }
      }
    });
    mSensorManager.startAccelerometer(100);
  }

  startGame() {
    this.setState({
      gameStart: true,
      buttonText: 'FRY!',
      buttonColor: 'orange'
    });
  }

  triggerCooking() {
    var that = this;
    var updatedProgress = that.state.progressPercent += 0.1;
    that.setState({
      progressPercent: updatedProgress,
    });

    if (updatedProgress >= 1) {
      that.setState({
        gameStart: false,
        gameComplete: true,
        buttonText: 'COMPLETE',
        buttonColor: 'green',
        continueButton: <Button title={'Continue'} onPress={that.continue}/>
      });
    }
  }

  continue() {
    Actions.popTo('NativeHR2');
  }

  render() {
    return (
      <Animated.View style={styles.gameContainer}>
        <Image source={{uri: 'cookingmg'}} style={styles.gifContainer}></Image>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>COOKING CHALLENGE</Text>
          </View>
          <View style={styles.barContainer}>
            <Progress.Bar progress={this.state.progressPercent} color={'red'} width={Dimensions.get('window').width * 0.9} height={30} style={styles.progressBar}/>
          </View>
          <View style={styles.inputContainer}>
            <TouchableHighlight underlayColor={'transparent'} style={[styles.tapCircle, {backgroundColor: this.state.buttonColor}]} onPress={this.gameStart.bind(this)}>
              <Text style={styles.tapCircleText}>{this.state.buttonText}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.continueContainer}>
            {this.state.continueButton}
          </View>
        </View>
      </Animated.View>
    ); 
  }
}