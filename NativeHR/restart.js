import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
  Dimensions,
  TouchableHighlight
} from 'react-native';

module.exports = (props) => (
  <View>
    <View>
      <TextInput style={{width: 100}} className='newPetName'  onChangeText={(text) => props.getInput(text)} />
      <Button title="MakeNewPet" onPress={props.newPet} />
    </View>
  </View>
);