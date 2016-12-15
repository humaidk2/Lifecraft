import React from 'react';
import {
  View,
  Text,
  StyleSheet,
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
  },
  choicesContainer: {
    backgroundColor: 'rgb(155, 245, 250)',
    flex: 2,
    margin: 15,
    borderWidth: 3,
    borderRadius: 20,
    borderStyle: 'solid',
  },
  choices: {
    backgroundColor: 'rgb(255, 250, 125)',
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
    marginRight: 5,
    marginLeft: 5,
    borderWidth: 3,
    borderRadius: 20,
    borderStyle: 'solid',
  },
});

var Question = (props) => {
  return (

    <View style={styles.overlayContainer}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{props.question}</Text>
      </View>
      <View style={styles.choicesContainer} justifyContent='space-between' justifyContent='space-around'>
        {props.choices.map((choice,index) => (<Text style={styles.choices} key={'' + index}>{choice}</Text>))}
      </View>
    </View>
  );
};

module.exports = Question;