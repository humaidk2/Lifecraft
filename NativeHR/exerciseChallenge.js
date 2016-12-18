import React, { Component } from 'react';
import { SensorManager } from 'NativeModules';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Vibration,
  Dimensions,
  BackAndroid,
  DeviceEventEmitter,
  Animated,
} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import Sound from 'react-native-sound';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  }

});

const moveSet = ['jump', 'duck', 'run'];

var mSensorManager = require('NativeModules').SensorManager;
var randMove = function() {
  return moveSet[Math.floor(Math.random() * moveSet.length)];
};
var timer = 20;
export default class exerciseChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: 0,
      counter: timer,
      color: 'white',
      status: 'stop',
      points: 0,
      result: (<View></View>),
      mode: randMove(),
      ducks: 0,
      jumps: 0
    };
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());
    var that = this;
    mSensorManager.startStepCounter(100);
    mSensorManager.startAccelerometer(100);

    DeviceEventEmitter.addListener('Accelerometer', function (data) {
      if (data.z >= 25 && that.state.status === 'start' && that.state.mode === 'jump') {
        console.log('Jump', data.z);
        that.setState({
          jumps: that.state.jumps + 1,
          points: that.state.points + 2
        });
      }
      if (data.z <= -2 && that.state.status === 'start' && that.state.mode === 'duck') {
        console.log('Duck', data.z);
        that.setState({
          ducks: that.state.ducks + 1,
          points: that.state.points + 2
        });
      }
    });

    DeviceEventEmitter.addListener('StepCounter', function (data) {
      if (that.state.status === 'start' && that.state.mode === 'run') {
        that.setState({
          steps: that.state.steps + 2,
          points: that.state.points + 1.5,
        });
        console.log(that.state.steps);
      }
    });

    window.interval = setInterval(function() {
      if (that.state.points >= 30) {
        that.setState({
          counter: 0,
          result: (<View>
                    <Text>SUCCESS</Text>
                    <Button title='Continue' onPress={that.continue}/>
                   </View>)
        });
      }
      if (that.state.status === 'start' && that.state.counter > 0) {
        that.setState({
          counter: that.state.counter - 1
        });
        if (that.state.counter % 3 === 0) {
          that.setState ({
            mode: randMove()
          });
          Vibration.vibrate([0, 800]);
        }
      } else if (that.state.counter === 0) {
        // Actions.error('Times up breh');
        if (that.state.points < 30) {
          //they fail
          that.setState({
            color: 'red',
            status: 'stop',
            result: (<View>
                      <Text style={{fontSize: 40, textAlign: 'center'}}>FAIL</Text>
                      <Button title='Continue' onPress={that.continue}/>
                     </View>)
          });
        } else {
          //they pass
          that.setState({
            color: 'green',
            status: 'stop',
            result: (<View>
                      <Text style={{fontSize: 40, textAlign: 'center'}}>SUCCESS</Text>
                      <Button title='Continue' onPress={that.continue}/>
                     </View>)
          });
        }
      }
    }, 1000);
  }

  start() {
    BackAndroid.addEventListener('hardwareBackPress', () => true);
    var that = this;
    Vibration.vibrate([0, 800]);
    this.setState({
      status: 'start'
    });
  }

  continue() {
    BackAndroid.removeEventListener('hardwareBackPress', () => Actions.pop());
    BackAndroid.removeEventListener('hardwareBackPress', () => true);
    mSensorManager.stopStepCounter();
    mSensorManager.stopAccelerometer();
    var that = this;
    console.log('window interval', window.interval);
    clearInterval(window.interval);
    return Actions.popTo('NativeHR2');
  }


  render() {
    var that = this;
    return (
      <View style={[styles.appContainer, {backgroundColor: that.state.color}]}>
      {
        (that.state.status !== 'start' && that.state.counter === timer) ? (
          <View style={{flex: 1}}>
            <Text style={{fontSize: 40, textAlign: 'center'}}>Tomb Dash</Text>
            <Text style={{fontSize: 20, textAlign: 'center'}}>Perform the activity displayed on screen to earn points.</Text>
            <Button title='Start' onPress={that.start.bind(this)} />
          </View>) : (
          <View >
            <Image source={{uri: that.state.mode}} style={{height: 226, width: Dimensions.get('window').width}}></Image>
            <Text style={{fontSize: 40, textAlign: 'center'}}>Exercise Challenge</Text>
            <View>
              <Text style={{fontSize: 40, textAlign: 'center'}}>Timer: {that.state.counter}s left </Text>
            </View>
            <View>
              <Text style={{fontSize: 20, textAlign: 'center'}}>Total Steps: {that.state.steps} </Text>
            </View>
            <View>
              <Text style={{fontSize: 20, textAlign: 'center'}}>Total Jumps: {that.state.jumps} </Text>
            </View>
            <View>
              <Text style={{fontSize: 20, textAlign: 'center'}}>Total Ducks: {that.state.ducks} </Text>
            </View>
            <View>
              <Text style={{fontSize: 40, textAlign: 'center'}}>Points Needed: {that.state.points <= 30 ? 30 - that.state.points : 0}</Text>
            </View>
            <Text style={{fontSize: 40, textAlign: 'center'}}>{that.state.mode}</Text>
            {that.state.result}
          </View>
        )
      }
      </View>
    );
  }
}