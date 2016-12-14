import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Component
} from 'react-native';

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'monospace',
    fontSize: 18,
  }
});

var StatusMessage = function(props) {
  return (
    <ScrollView>
      <View className="status-message">
          <Text key='1' class="underscore" style={styles.textStyle}>
          { 1 + ': ' + 'Humaid' + ' is ' + 'small' + ' at ' + '9 min ago'}
          </Text> 
          <Text key='2' class="underscore" style={styles.textStyle}>
          { 2 + ': ' + 'Humaid' + ' is ' + 'sad' + ' at ' + '6 min ago'}
          </Text>
           <Text key='3' class="underscore" style={styles.textStyle}>
          { 3 + ': ' + 'Humaid' + ' is ' + 'sad' + ' at ' + '3 min ago'}
          </Text> 
      </View>
    </ScrollView>
  );
};


module.exports = StatusMessage;

// { props.logs.slice().map(function(log, index) {
//         return (
//           <Text key={index} class="underscore">
//           {(index + 1) + ': ' + log.name + ' is ' + log.action + ' at ' + log.createdAt}
//           </Text> 
//         );
//       })}