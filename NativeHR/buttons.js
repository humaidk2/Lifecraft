import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

module.exports = (props) => (
  <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', justifyContent: 'space-around'}}>
    <Image source={require('./assets/food1.png')} style={{ width: 50, height: 50}} />
    <Image source={require('./assets/love1.png')} style={{ width: 50, height: 50}} />
    <Image source={require('./assets/code1.png')} style={{ width: 50, height: 50}}/>
    <Image source={require('./assets/sleep1.png')} style={{ width: 50, height: 50}}/>
  </View>
);

//onClick={() => {props.executeCommand('eating')}
//onClick={() => {props.executeCommand('playing')}}
//onClick={() => {props.executeCommand('coding')}}
//onClick={() => {props.executeCommand('sleeping')}}
//source={props.cmdImg.food}
//source={props.cmdImg.love}
//source={props.cmdImg.code}
//source={props.cmdImg.sleep}