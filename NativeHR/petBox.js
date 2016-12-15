import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  padding: {
    width: 20,
  },
  statsContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  barContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  barText: {
    marginLeft: 20,
    width: 50,
  },
  bar: {
    flex: 1,
    marginTop: 5,
    marginBottom: 15,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
  },
});

var PetBox = (props) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Stats</Text>
      </View>
      <View style={styles.barContainer}>
        <Text style={styles.barText}>Health:</Text><View style={styles.bar}><Progress.Bar progress={props.pet.health / 8} width={Dimensions.get('window').width * 0.74} height={10} borderRadius={10} /></View>
      </View>
      <View style={styles.barContainer}>
        <Text style={styles.barText}>Love:</Text><View style={styles.bar}><Progress.Bar progress={props.pet.love / 8} width={Dimensions.get('window').width * 0.74} height={10} borderRadius={10} /></View>
      </View>
      <View style={styles.barContainer}>
        <Text style={styles.barText}>Energy:</Text><View style={styles.bar}><Progress.Bar progress={props.pet.feed / 8} width={Dimensions.get('window').width * 0.74} height={10} borderRadius={10} /></View>
      </View>
      <View style={styles.barContainer}>
        <Text style={styles.barText}>Level:{props.pet.level}/3</Text><View style={styles.bar}><Progress.Bar progress={props.pet.level / 3} width={Dimensions.get('window').width * 0.74} height={10} borderRadius={10} /></View>
      </View>
      <View style={styles.barContainer}>
        <Text style={styles.barText}>Exp:</Text><View style={styles.bar}><Progress.Bar progress={props.pet.experience / 5} width={Dimensions.get('window').width * 0.74} height={10} borderRadius={10} /></View>
      </View>
    </View>
  );
};

module.exports = PetBox;