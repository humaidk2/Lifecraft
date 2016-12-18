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
import CheckBox from 'react-native-checkbox';
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

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      checked: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

  }


  handleSubmit() {
    var that = this;
    fetch('http://138.68.6.148:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: that.state.username, password: that.state.password})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('data', data);
      if (data.user) {
        Actions.NativeHR2({type: 'reset'});
      } else {
        console.log('not a valid user');
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

  handleCheck() {
    this.setState({
      checked: !this.state.checked
    });
  }

  handleSignUp() {
    Actions.Signup({type: 'reset'});
  }


  render() {
    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign In</Text>
        </View>
        <View style={styles.button}>
          <TextInput onChangeText={(text) => this.handleUserChange(text)} id='username' className='form-control' placeholder='Enter username'></TextInput>
        </View>
        <View style={styles.button}>
          <TextInput onChangeText={(text) => this.handlePasswordChange(text)} secureTextEntry={true} id='password' className='form-control' placeholder='Enter password'></TextInput>
        </View>
        <View style={styles.button}>
          <Button onPress={this.handleSubmit} title='Login'></Button>
        </View>
        <View style={styles.button}>
          <Button onPress={this.handleSignUp} title='Signup'></Button>
        </View>
      </View>
    );
  }
}
