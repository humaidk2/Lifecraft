import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import PetBox from './petBox.js';
import Buttons from './buttons.js';
import StatusMessage from './statusMessage.js';

export default class NativeHR extends Component {
  constructor(props){
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
      cmdImg: {
        food:'../assets/food1.png',
        sleep:'../assets/sleep1.png',
        love:'../assets/love1.png',
        code:'../assets/code1.png'
      },
      logs: []
    }

    var that = this;
    setInterval(function() {
      if (that.state.status !== 'dead') {
        that.getCurrent();
        that.getLog();
      }
    }, 2000);
  }

  componentWillMount() {
    this.getCurrent();
    this.getLog();
  }

  getCurrent() {
    console.log('Fetching pet status...');
    var that = this;

    fetch('http://10.6.19.22:3000/api/pet'  , {
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

    fetch('http://10.6.19.22:3000/log'  , {
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
    $.ajax({
      method: 'POST',
      url: 'http://10.6.19.22:3000/api/pet',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {status: status}
    })
    .success(function() {
      console.log('Pet status updated!');
      that.getCurrent();
    }).catch(function(error) {
      console.log(error);
    });
  }

  getInput(event) {
    var key = event.target.getAttribute('class');
    var value = event.target.value;
    var obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  showNameInput(){
    this.setState({
      showNewName: !this.showNewName
    });
  }

  newPet(e) {
    e.preventDefault();

    var that = this;
    $.ajax({
      method: 'POST',
      url: 'http://10.6.19.22:3000/api/newPet',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: {name: this.state.newPetName}
    })
    .success(function() {
      console.log('New pet created!');
      that.getCurrent();
    }).catch(function(error) {
console.log('There has been a problem with your fetch operation: ' + error.message);
  throw error;
});
  }


  changeCommandIcon (command) {
    if (command === 'eating') {
      this.setState({cmdImg: {
          food:'../assets/food2.png',
          sleep:'../assets/sleep1.png',
          love:'../assets/love1.png',
          code:'../assets/code1.png'
        }})
        ;
    } else if (command === 'sleeping') {
      this.setState({cmdImg: {
          food:'../assets/food1.png',
          sleep:'../assets/sleep2.png',
          love:'../assets/love1.png',
          code:'../assets/code1.png'
        }});
    } else if (command === 'coding') {
      this.setState({cmdImg: {
          food:'../assets/food1.png',
          sleep:'../assets/sleep1.png',
          love:'../assets/love1.png',
          code:'../assets/code2.png'
        }});
    } else if (command === 'playing') {
      this.setState({cmdImg: {
          food:'../assets/food1.png',
          sleep:'../assets/sleep1.png',
          love:'../assets/love2.png',
          code:'../assets/code1.png'
        }});
    }
  }

  executeCommand(command){
    this.changeCommandIcon(command);
    this.setStatus(command)
    this.getCurrent();
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.gifContainer}>
        <Image source={{uri: 'http://i.imgur.com/KTNujjY.gif'}} style={styles.petGif}/>
        </View>
        <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Hello {this.state.name} is currently {this.state.status}</Text>
        </View>
        <View style={styles.statsContainer}>
          <PetBox />
        </View>
        <View style={styles.logContainer}>
          <StatusMessage />
        </View>
        <View style={styles.actionContainer}>
          <Buttons />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  gifContainer: {
    flex: 4,
  },
  statusContainer: {
    flex: 1,
  },
  statusText: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 28,
  },
  statsContainer: {
    flex: 3.5,
  },
  logContainer: {
    flex: 2,
    backgroundColor: 'lightskyblue',
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

AppRegistry.registerComponent('NativeHR', () => NativeHR);
