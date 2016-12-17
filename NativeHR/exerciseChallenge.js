import React, { Component } from 'react';
import { SensorManager } from 'NativeModules';
import {
  AppRegistry,
  Button,
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
  }

});

var mSensorManager = require('NativeModules').SensorManager;

export default class exerciseChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: 0,
      counter: 15,
      color: 'white',
      status: 'stop',
      points: 0,
      result: (<View></View>)
    };
  }
  componentDidMount() {
    var that = this;
    mSensorManager.startStepCounter(500);
    mSensorManager.startAccelerometer(100);

    DeviceEventEmitter.addListener('Accelerometer', function (data) {
      if (data.z >= 20) {
        console.log('data.z', data.z);  
      }
    });

    DeviceEventEmitter.addListener('StepCounter', function (data) {
      if (that.state.status === 'start') {
        that.setState({
          steps: that.state.steps + 1,
          points: that.state.points + 3,
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
    var that = this;
    this.setState({
      status: 'start'
    });
  }

  continue() {
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
        (that.state.status !== 'start' && that.state.counter === 15) ? (
          <View style={{flex: 1}}>
            <Text style={{fontSize: 40}}>GET READY TO RUN!</Text>
            <Button title='Start' onPress={that.start.bind(this)} />
          </View>) : (     
          <View >
            <Image source={{uri: 'runningmg'}} style={{height: 226, width: Dimensions.get('window').width}}></Image>
            <Text style={{fontSize: 40, textAlign: 'center'}}>Exercise Challenge</Text>
            <View>
              <Text style={{fontSize: 40, textAlign: 'center'}}>Timer: {that.state.counter}s left </Text>
            </View>
            <View>
              <Text style={{fontSize: 40, textAlign: 'center'}}>Total Steps: {that.state.steps} </Text>
            </View>
            <View>
              <Text style={{fontSize: 40, textAlign: 'center'}}>Points Needed: {that.state.points <= 30 ? 30 - that.state.points : 0}</Text>
            </View>
            {that.state.result}
          </View>
        )
      }
      </View>
    );
  }
}