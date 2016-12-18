import React, { Component } from 'react';
import { SensorManager } from 'NativeModules';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
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
  logout: {
    width: 100,
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

var mSensorManager = require('NativeModules').SensorManager;

export default class NativeHR2 extends Component {
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
      isQuestion: false,
      question: null,
      answer: null,
      choices: [],
      correctAnswer: false,
      cmdImg: {
        food: 'food1',
        sleep: 'sleep1',
        love: 'love1',
        code: 'code1'
      },
      sound: 'dead',
      logs: [],
      light: new Animated.Value(0)
    };

    var that = this;
    window.interval = setInterval(function() {
      if (that.state.status !== 'dead') {
        that.getCurrent();
        that.getLog();
      }
    }, 2000);

    window.sensorHandler = (status, link, obj) => {
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
  }

  componentDidMount() {
        // Import the react-native-sound module
    var that = this;
    that.state.sound = new Sound('dead.mp3', Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error', e);
      } else {
        console.log('duration', that.state.sound.getDuration());
        that.state.sound.play();
        that.state.sound.setVolume(1.0);
      }
    });
    that.state.sound.stop();

    DeviceEventEmitter.addListener('LightSensor', function (data) {
      Animated.spring(
        that.state.light,
        {
          toValue: data.light
        }
      ).start();
      //Go to Sleep
      if (data.light <= 5) {
        var sleeping = {'status': 'sleeping'};
        var condition = (that.state.status !== 'sleeping' && that.state.status !== 'dead');
        window.sensorHandler(condition, 'http://138.68.6.148:3000/api/pet', sleeping);
      }
    });
    DeviceEventEmitter.addListener('Accelerometer', function (data) {
      //Revive
      if (data.x > 30) {
        // console.log(data.x);
        var name = {'name': that.state.name};
        var dead = (that.state.status === 'dead');
        window.sensorHandler(dead, 'http://138.68.6.148:3000/api/newPet', name);
      }
      //Cook
      // console.log(Math.abs(data.y), Math.abs(data.z));
      if (Math.abs(data.y) > 10 && Math.abs(data.z) > 20) {
        // console.log('cooking');
        var eating = {'status': 'eating'};
        var condition = (that.state.status !== 'eating' && that.state.status !== 'dead');
        window.sensorHandler(condition, 'http://138.68.6.148:3000/api/pet', eating);
      }
    });

//     mSensorManager.startAccelerometer(100);
//     mSensorManager.startLightSensor(100);

//     DeviceEventEmitter.addListener('StepCounter', function (data) {
//     });
    // mSensorManager.startStepCounter(1000);
    // mSensorManager.startAccelerometer(100);
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
      if (that.state.status !== data.status) {
        that.state.sound.stop();
        that.state.sound = new Sound(data.status + '.mp3', Sound.MAIN_BUNDLE, (e) => {
          if (e) {
            console.log('error', e);
          } else {
            console.log('duration', that.state.sound.getDuration());
            that.state.sound.play();
            that.state.sound.setVolume(1.0);
          }
        });
      }

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
      that.getCurrent();
    })
    .catch((error) => {
      console.warn(error);
    }).done();
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
      that.getCurrent();
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  }


  changeCommandIcon (command) {
    if (command === 'eating') {
      this.setState({cmdImg: {
        food: 'food2',
        sleep: 'sleep1',
        love: 'love1',
        code: 'code1'
      }});
    } else if (command === 'sleeping') {
      this.setState({cmdImg: {
        food: 'food1',
        sleep: 'sleep2',
        love: 'love1',
        code: 'code1'
      }});
    } else if (command === 'coding') {
      this.setState({cmdImg: {
        food: 'food1',
        sleep: 'sleep1',
        love: 'love1',
        code: 'code2'
      }});
    } else if (command === 'playing') {
      this.setState({cmdImg: {
        food: 'food1',
        sleep: 'sleep1',
        love: 'love2',
        code: 'code1'
      }});
    }
  }
  checkAnswer(choice) {
    if (choice === this.state.answer) {
      this.setState({
        isQuestion: !this.state.isQuestion
      });
      var sleeping = {'status': 'coding'};
      window.sensorHandler(true, 'http://138.68.6.148:3000/api/pet', sleeping);
      Actions.pop();
    }
  }


  executeCommand(command) {
    this.changeCommandIcon(command);
    this.setStatus(command);
    this.getCurrent();
  }


  randomizer(arr, answer) {
    arr.push(answer);
    for (var i = 0; i < arr.length; i++) {
      var temp = Math.floor(Math.random() * arr.length);
      var swap = arr[temp];
      arr[temp] = arr[i];
      arr[i] = swap;
    }
    return arr;
  }
  logout () {
    var that = this;
    fetch('http://138.68.6.148:3000/logout', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response)
    .then((data) => {
      clearInterval(window.interval);
      Actions.Login({type: 'reset'});
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  }
  QuestionPage() {
    var that = this;

    fetch('https://www.opentdb.com/api.php?amount=1&type=multiple', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      that.setState({
        isQuestion: !this.state.isQuestion,
        question: data.results[0].question,
        answer: data.results[0].correct_answer,
        choices: that.randomizer(data.results[0].incorrect_answers, data.results[0].correct_answer),
      });
      Actions.question({question: that.state.question, answer: that.state.answer, checkAnswer: that.checkAnswer.bind(that), choices: that.state.choices});
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  }

  render() {
    var color = this.state.light.interpolate({
      inputRange: [0, 40],
      outputRange: ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']
    });

    return (
      <Animated.View style={[styles.appContainer, {backgroundColor: 'white'}]}>
        <View style={styles.questionContainer}>
          <View className='questionOverlay' style={styles.questionOverlay}>
            <View style={styles.gifContainer}>
              <Image source={{uri: this.state.img}} style={styles.petGif}>
                <View style={styles.infoContainer}>
                  <Info info={this.state}/>
                </View>
              </Image>
              <Animated.View style={[styles.petGif, {position: 'absolute', backgroundColor: color}]}></Animated.View>
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
          </View>
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

// Logout button
// <Button style={styles.logout} title={'logout'} onPress={this.logout.bind(this)}/>