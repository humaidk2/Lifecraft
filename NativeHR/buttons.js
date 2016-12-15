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

module.exports = (props) => (
  <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', justifyContent: 'space-around'}}>
    <TouchableHighlight underlayColor='transparent' onPress={() => { props.executeCommand('eating'); } }>
      <View>
        <Image source={{uri: props.cmdImg.food}} style={{ width: 50, height: 50}} />
      </View>
    </TouchableHighlight>
    <TouchableHighlight underlayColor='transparent' onPress={() => { props.executeCommand('playing'); }}>
      <View>
        <Image source={{uri: props.cmdImg.love}} style={{ width: 50, height: 50}} />
      </View>
    </TouchableHighlight>
    <TouchableHighlight underlayColor='transparent' onPress={() => { props.setQuestion(); props.getQuestion(); }}>
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