import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
  },
  questionContainer: {
    backgroundColor: 'rgb(185, 240, 130)',
    flex: 1,
    margin: 15,
    borderRadius: 20,
    borderWidth: 3,
    borderStyle: 'solid',
  },
  question: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    margin: 10,
  },
  choicesContainer: {
    backgroundColor: 'rgb(155, 245, 250)',
    flex: 2,
    margin: 15,
    borderWidth: 3,
    borderRadius: 20,
    borderStyle: 'solid',
  },
  choiceContainer: {
    flex: 1,
    backgroundColor: 'rgb(255, 250, 125)',
    margin: 10,
    borderWidth: 3,
    borderRadius: 20,
    borderStyle: 'solid',
  },
  choices: {
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10,
  },
});

var Question = (props) => {
  return (
    <View style={styles.overlayContainer}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{props.question}</Text>
      </View>
      <View style={styles.choicesContainer}>
        {props.choices.map((choice, index) => (<TouchableHighlight key={index + ''} underlayColor={'rgb(250, 140, 140)'} style={styles.choiceContainer}><Text onPress={props.checkAnswer.bind(this, choice)} style={styles.choices} key={'' + index}>{choice}</Text></TouchableHighlight>))}
      </View>
    </View>
  );
};

module.exports = Question;