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
      {props.choices.map((choice,index) => (<Text key={'' + index}>{choice}</Text>))}
      <Text>{props.answer}</Text>
    </View>
  );
};

module.exports = Question;