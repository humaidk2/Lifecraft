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
    fontSize: 15,
  }
});

var StatusMessage = (props) => {
  return (
    <ScrollView>
      <View className="status-message">
        { props.logs.slice().map(function(log, index) {
          return (
            <Text key={index} class="underscore" style={styles.textStyle}>
            {(index + 1) + ': ' + log.name + ' is ' + log.action + ' at ' + log.createdAt}
            </Text> 
          );
        })}
      </View>
    </ScrollView>
  );
};

module.exports = StatusMessage;