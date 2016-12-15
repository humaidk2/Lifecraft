import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  questionContainer: {
    flex: 1,
  }
});

var Question = (props) => {
  return (
    <View>
      <Text>{props.question}</Text>
      <Text>{props.answer}</Text>
      <Text>{props.choices[0]}</Text>
      <Text>{props.choices[1]}</Text>
      <Text>{props.choices[2]}</Text>
    </View>
  );
};

module.exports = Question;