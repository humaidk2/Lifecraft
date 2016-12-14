import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

var Info = (props) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>Name: {props.info.name}</Text>
      <Text style={styles.textStyle}>Mood: {props.info.mood}</Text>
      <Text style={styles.textStyle}>Phys: {props.info.phys}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: 'black'
  },
  containerStyle: {
    width: 100
  }
});

module.exports = Info;