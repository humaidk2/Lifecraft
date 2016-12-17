import React, {Component} from 'react';
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
    fontSize: 30,
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
    marginBottom: 10,
  },
  ghost: {
    backgroundColor: 'purple',
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  timerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  }
});

export default class sleepingChallenge extends Component {
  constructor(props) {
    super(props);
    this.startTime = 0;
    this.endTime = 0;
    this.state = {
      gameStart: false,
      gameComplete: false,
      button:
        <TouchableHighlight underlayColor={'transparent'} style={[styles.tapCircle, {backgroundColor: 'blue'}]} onPress={this.startGame.bind(this)}>
          <Text style={styles.tapCircleText}>START</Text>
        </TouchableHighlight>,
      continueButton: null,
      progressPercent: 0,
      ghost: null,
      timer: null,
    };
  }

  startGame() {
    this.setState({
      gameStart: true,
      button: null,
    });
    this.startTime = new Date();
    this.generateRandomGhost();
  }

  generateRandomGhost() {
    var horizontalMax = Dimensions.get('window').width * 0.9;
    var verticalMax = 400;
    var verticalMin = 0;

    var spaceLeft = Math.floor(Math.random() * (horizontalMax + 1));
    var spaceTop = Math.floor(Math.random() * (verticalMax - verticalMin + 1)) + verticalMin;
    this.setState({
      ghost:
        <TouchableHighlight underlayColor='transparent' style={[styles.ghost, {left: spaceLeft}, {top: spaceTop}]} onPress={this.triggerSleep.bind(this)}>
          <View></View>
        </TouchableHighlight>
    });
  }

  triggerSleep() {
    var that = this;
    var updatedProgress = that.state.progressPercent += 0.5;
    that.setState({
      progressPercent: updatedProgress,
      ghost: null,
    });
    if (updatedProgress >= 1) {
      that.endTime = new Date();
      that.setState({
        gameStart: false,
        gameComplete: true,
        button:
          <TouchableHighlight underlayColor={'transparent'} style={[styles.tapCircle, {backgroundColor: 'green'}]}>
            <Text style={styles.tapCircleText}>COMPLETE</Text>
          </TouchableHighlight>,
        continueButton: <Button title={'Continue'} onPress={that.continue.bind(that)}/>,
        timer: <Text style={styles.timerText}>Elapsed Time: {that.endTime - that.startTime} ms</Text>,
      });
    } else {
      that.generateRandomGhost();
    }
  }

  continue() {
    var sleeping = {'status': 'sleeping'};
    window.sensorHandler(true, 'http://138.68.6.148:3000/api/pet', sleeping);
    Actions.popTo('NativeHR2');
  }

  render() {
    return (
      <Animated.View style={styles.gameContainer}>
        <Image source={{uri: 'cookingmg'}} style={styles.gifContainer}></Image>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>SLEEPING CHALLENGE</Text>
          </View>
          <View style={styles.barContainer}>
            <Progress.Bar progress={this.state.progressPercent} color={'red'} width={Dimensions.get('window').width * 0.9} height={30} style={styles.progressBar}/>
          </View>
          <View style={styles.inputContainer}>
            {this.state.button}
          </View>
            {this.state.ghost}
          <View style={styles.continueContainer}>
            {this.state.timer}
            {this.state.continueButton}
          </View>
        </View>
      </Animated.View>
    ); 
  }
}