// /login, /logout, /signup
// /login, /logout, /signup
import React, { Component } from 'react';
import { SensorManager } from 'NativeModules';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
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
import NativeHR2 from './NativeHR2.js';
import cookingChallenge from './cookingChallenge.js';

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  titleContainer: {
    height: 200,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 42,
  },
});

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      checked: false,
      petName: 'anonymous'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePetNameChange = this.handlePetNameChange.bind(this);
  }

  handleSubmit() {
    var that = this;
    fetch('http://138.68.6.148:3000/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: that.state.username, password: that.state.password})
    })
    .then((response) => response)
    .then((data) => {
          Actions.NativeHR2({type: 'reset'});
      // if data = true, user is found and route to home. if false, stay on login page
      console.log('data', data);
      if (data.user) {
        // fetch('http://138.68.6.148:3000/api/newPet', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({name: that.state.petName})
        // })
        // .then((response) => response)
        // .then((data) => {
        //   // if data = true, user is found and route to home. if false, stay on login page
        //   console.log('data', data);
        // })
        // .catch((error) => {
        //   console.warn(error);
        // }).done();
        //browserHistory.currentUser = that.state.username;
        //that.props.router.push({pathname: '/home'});
        Actions.NativeHR2({type: 'reset'});
      } else {
        console.log('not a valid user');
        Actions.Login({type: 'reset'});
      }
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  }

  handleUserChange(username) {
    this.setState({
      username: username
    });
  }

  handlePasswordChange(password) {
    this.setState({
      password: password
    });
  }

  handlePetNameChange(petName) {
    this.setState({
      petName: petName
    });
  }

  handleLogin() {
    Actions.Login({type: 'reset'});
  }

  render() {
    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.button}>
          <TextInput onChangeText={(text) => this.handleUserChange(text)} placeholder='Enter username'></TextInput>
        </View>
        <View style={styles.button}>
          <TextInput onChangeText={(text) => this.handlePasswordChange(text)} secureTextEntry={true} placeholder='Enter password'></TextInput>
        </View>
        <View style={styles.button}>
          <TextInput onChangeText={(text) => this.handlePetNameChange(text)} placeholder='Enter Pet Name'></TextInput>
        </View>
        <View style={styles.button}>
          <Button onPress={this.handleSubmit} title='Submit'></Button>
        </View>
        <View style={styles.button}>
          <Button onPress={this.handleLogin} title='Login'></Button>
        </View>
      </View>
    );
  }
}
