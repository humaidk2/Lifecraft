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



export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
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
      // if data = true, user is found and route to home. if false, stay on login page
      console.log('data', data);
      if (data.user) {
        //browserHistory.currentUser = that.state.username;
        //that.props.router.push({pathname: '/home'});
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
      <View className='signin-box container'>
        <Text className='form-signin-header'>HR50 Sign In</Text>
        <TextInput onChangeText={(text) => this.handleUserChange(text)} id='username' className='form-control' placeholder='Enter username'></TextInput>
        <TextInput onChangeText={(text) => this.handlePasswordChange(text)} secureTextEntry={true} id='password' className='form-control' placeholder='Enter password'></TextInput>
        <CheckBox label='Remember Me' checked={this.state.checked} onChange={this.handleCheck.bind(this)}/>
        <Button onPress={this.handleSubmit} className='btn btn-large btn-primary btn-block' title='Submit'></Button>
        <Button onPress={this.handleSignUp} title='Signup'></Button>
      </View>
    );
  }
}
