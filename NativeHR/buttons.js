import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import Sound from 'react-native-sound';

module.exports = (props) => (
  <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', justifyContent: 'space-around'}}>
    <TouchableHighlight underlayColor='transparent' onPress={() => { Actions.cookingChallenge(); } }>
      <View>
        <Image source={{uri: props.cmdImg.food}} style={{ width: 50, height: 50}} />
      </View>
    </TouchableHighlight>
    <TouchableHighlight underlayColor='transparent' onPress={() => { props.executeCommand('playing'); }}>
      <View>
        <Image source={{uri: props.cmdImg.love}} style={{ width: 50, height: 50}} />
      </View>
    </TouchableHighlight>

    <TouchableHighlight underlayColor='transparent' onPress={() => { props.getQuestion(); }}>
    <View>
    <Image source={{uri: props.cmdImg.code}} style={{ width: 50, height: 50}}/>
    </View>
    </TouchableHighlight>
    <TouchableHighlight underlayColor='transparent' onPress={() => { props.executeCommand('sleeping'); }}>
      <View>
        <Image source={{uri: props.cmdImg.sleep}} style={{ width: 50, height: 50}}/>
        </View>
    </TouchableHighlight>
  </View>
);