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

var mSensorManager = require('NativeModules').SensorManager;

export default class NativeHR extends Component {
  constructor(props) {
    super(props);
    this.getLog = this.getLog.bind(this);
    this.state = {
      name: null,
      mood: null,
      level: 0,
      phys: null,
      img: null,
      status: null,
      health: 0,
      experience: 0,
      feed: 0,
      love: 0,
      showNewName: false,
      isDark: false,
      isDarkCounter: 0,
      cmdImg: {
        food:'food1',
        sleep:'sleep1',
        love:'love1',
        code:'code1'
      },
      logs: [],
      light: new Animated.Value(0)
    };

    var that = this;
    setInterval(function() {
      if (that.state.status !== 'dead') {
        that.getCurrent();
        that.getLog();
      }
    }, 2000);

    // setInterval(function() {
    //   if (that.state.isDarkcounter > 2) {
    //     that.state.isDarkcounter = 0;
    //   }
    // }, 13000);

    window.sensorHandler = (status, link, obj) => {
      console.log('status', this.state.status);
      if (status) {
        fetch(link, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
          })
          .then((response) => response)
          .then((data) => {
            that.getCurrent();
          })
          .catch((error) => {
            console.warn(error);
          }).done();
        }
      };

      // console.log('status', this.state.status);
      // if (this.state.status === 'dead') {
      //   fetch('http://138.68.6.148:3000/api/newPet', {
      //       method: 'POST',
      //       headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({name: this.state.name})
      //     })
      //     .then((response) => response)
      //     .then((data) => {
      //       that.getCurrent();
      //     })
      //     .catch((error) => {
      //       console.warn(error);
      //     }).done();
      //   }
      // };
  }

  componentDidMount() {

    var that = this;
    DeviceEventEmitter.addListener('LightSensor', function (data) {
      Animated.spring(
        that.state.light, 
        {
          toValue: data.light
        }
      ).start();
      if (data.light <= 5) {
        var sleeping = {'status': 'sleeping'};
        var awake = (that.state.status !== 'sleeping' && that.state.status !== 'dead');
        window.sensorHandler(awake, 'http://138.68.6.148:3000/api/pet', sleeping);
      }
    });
    DeviceEventEmitter.addListener('Accelerometer', function (data) {
      if (data.x > 30) {
        // console.log(data.x);
        var name = {'name': that.state.name};
        var dead = (that.state.status === 'dead');
        window.sensorHandler(dead, 'http://138.68.6.148:3000/api/newPet', name);
      }
    });
    mSensorManager.startAccelerometer(100);
    mSensorManager.startLightSensor(100);
  }

  componentWillMount() {
    this.getCurrent();
    this.getLog();
  }

  getCurrent() {
    //console.log('Fetching pet status...');
    var that = this;

    fetch('http://138.68.6.148:3000/api/pet', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('pet data', data);
      that.setState({
        name: data.name,
        mood: data.mood,
        level: data.level,
        phys: data.phys,
        img: data.img,
        health: data.health,
        experience: data.experience,
        feed: data.feed,
        status: data.status,
        love: data.love,
        showNewName: false,
        newPetName: ''
      });
    })
    .catch((error) => {
      console.warn(error);
    }).done();

  }

  getLog() {
    console.log('Fetching log messages...');
    var that = this;

    fetch('http://138.68.6.148:3000/log', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('log data', data);
      that.setState({
        logs: data
      });
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  }

  setStatus(status) {
    var that = this;
    console.log(status);

    fetch('http://138.68.6.148:3000/api/pet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status: status})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('clicked');
      that.getCurrent();
    })
    .catch((error) => {
      console.warn(error);
    }).done();

    // $.ajax({
    //   method: 'POST',
    //   url: 'http://138.68.6.148:3000/api/pet',
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //   data: {status: status}
    // })
    // .success(function() {
    //   console.log('Pet status updated!');
    //   that.getCurrent();
    // }).catch(function(error) {
    //   console.log(error);
    // });
  }

  getInput(text) {
    var key = 'newPetName';
    var value = text;
    var obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  showNameInput() {
    this.setState({
      showNewName: !this.showNewName
    });
  }

  newPet(e) {
    //e.preventDefault();

    var that = this;
    fetch('http://138.68.6.148:3000/api/newPet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: that.state.newPetName})
    })
    .then((response) => response)
    .then((data) => {
      console.log('clicked');
      that.getCurrent();
    })
    .catch((error) => {
      console.warn(error);
    }).done();
    // $.ajax({
    //   method: 'POST',
    //   url: 'http://138.68.6.148:3000/api/newPet',
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //   data: {name: this.state.newPetName}
    // })
    // .success(function() {
    //   console.log('New pet created!');
    //   that.getCurrent();
    // }).catch(function(error) {
    //   console.log('There has been a problem with your fetch operation: ' + error.message);
    //   throw error;
    // });
  }


  changeCommandIcon (command) {
    if (command === 'eating') {
      this.setState({cmdImg: {

          food:'food2',
          sleep:'sleep1',
          love:'love1',
          code:'code1'
        }})
        ;
    } else if (command === 'sleeping') {
      this.setState({cmdImg: {
          food:'food1',
          sleep:'sleep2',
          love:'love1',
          code:'code1'
        }});
    } else if (command === 'coding') {
      this.setState({cmdImg: {
          food:'food1',
          sleep:'sleep1',
          love:'love1',
          code:'code2'
        }});
    } else if (command === 'playing') {
      this.setState({cmdImg: {
          food:'food1',
          sleep:'sleep1',
          love:'love2',
          code:'code1'
        }});
    }
  }

  executeCommand(command) {
    this.changeCommandIcon(command);
    this.setStatus(command);
    this.getCurrent();
  }

  render() {
    var color = this.state.light.interpolate({
      inputRange: [0, 40],
      outputRange: ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']
    });

    return (
      <Animated.View style={[styles.appContainer, {backgroundColor: 'white'}]}>
        <View style={styles.gifContainer}>
          <Image source={{uri: this.state.img}} style={styles.petGif}>
            <View style={styles.infoContainer}>
              <Info info={this.state}/>
            </View>
          </Image>
        </View>
        <View style={styles.statusContainer}>
        <Text style={styles.statusMsg}>{this.state.name} is currently <Text style={styles.statusText}>{this.state.status}</Text>!</Text>
        </View>
        <View style={styles.statsContainer}>
          <PetBox pet={this.state}/>
        </View>
        <View style={styles.logContainer}>
          <StatusMessage logs={this.state.logs}/>
        </View>
        <View style={styles.actionContainer}>{
          this.state.status !== 'dead' ? (<View style={{flex: 1}}>
            <Buttons cmdImg={this.state.cmdImg} executeCommand={this.executeCommand.bind(this)}/>
          </View>) : <Restart showNameInput={this.showNameInput.bind(this)} showNewName={this.state.showNewName} getInput={this.getInput.bind(this)} newPet={this.newPet.bind(this)}></Restart>
        }</View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)'
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
  },
  infoContainer: {
    // backgroundColor: 'rgba(0,0,0,0.5)',
  }

});

AppRegistry.registerComponent('NativeHR', () => NativeHR);
