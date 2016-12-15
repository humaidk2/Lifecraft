import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10
  },
  containerStyle: {
    paddingLeft: 5
  }
});

var Info = (props) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>Name: {props.info.name}</Text>
      <Text style={styles.textStyle}>Mood: {props.info.mood}</Text>
      <Text style={styles.textStyle}>Phys: {props.info.phys}</Text>
    </View>
  );
};


module.exports = Info;