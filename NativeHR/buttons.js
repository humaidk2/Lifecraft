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
    <TouchableHighlight onPress={() => {props.executeCommand('eating')}}>
    <View>
      <Image source={require('./assets/food1.png')} style={{ width: 50, height: 50}} />
      </View>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => {props.executeCommand('playing')}}>
    <View>
    <Image source={require('./assets/love1.png')} style={{ width: 50, height: 50}} />
    </View>
    </TouchableHighlight>
    <TouchableHighlight onPress={() => {props.executeCommand('coding')}}>
    <View>
    <Image source={require('./assets/code1.png')} style={{ width: 50, height: 50}}/>
    </View>
        </TouchableHighlight>
    <TouchableHighlight onPress={() => {props.executeCommand('sleeping')}}>
    <View>
    <Image source={require('./assets/sleep1.png')} style={{ width: 50, height: 50}}/>
  </View>
      </TouchableHighlight>
      </View>
);