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

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 7,
    marginLeft: 20,
    marginBottom: 20,
  },
  restartButton: {
    flex: 3,
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 20,
  }
});