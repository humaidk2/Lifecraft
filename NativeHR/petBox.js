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
  loveContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  loveText: {
    marginLeft: 20,
    width: 50,
  },
  loveBar: {
    flex: 1,
    marginTop: 5,
    marginBottom: 15,
  },
  energyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  energyText: {
    marginLeft: 20,
    width: 50,
  },
  energyBar: {
    flex: 1,
    marginTop: 5,
    marginBottom: 15,
  },
  healthContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  healthText: {
    marginLeft: 20,
    width: 50,
  },
  healthBar: {
    flex: 1,
    marginTop: 5,
    marginBottom: 15,
  },
  levelContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  levelText: {
    marginLeft: 20,
    width: 50,
  },
  levelBar: {
    flex: 1,
    marginTop: 5,
    marginBottom: 15,
  },
  expContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  expText: {
    marginLeft: 20,
    width: 50,
  },
  expBar: {
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
      <View style={styles.healthContainer}>
        <Text style={styles.healthText}>Health:</Text><View style={styles.healthBar}><Progress.Bar progress={props.pet.health / 8} width={Dimensions.get('window').width * 0.74} height={10} borderRadius={10} /></View>
      </View>
      <View style={styles.loveContainer}>
        <Text style={styles.loveText}>Love:</Text><View style={styles.loveBar}><Progress.Bar progress={props.pet.love / 8} width={Dimensions.get('window').width * 0.74} height={10} borderRadius={10} /></View>
      </View>
      <View style={styles.energyContainer}>
        <Text style={styles.energyText}>Energy:</Text><View style={styles.energyBar}><Progress.Bar progress={props.pet.feed / 8} width={Dimensions.get('window').width * 0.74} height={10} borderRadius={10} /></View>
      </View>
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>Level:{props.pet.level}/3</Text><View style={styles.levelBar}><Progress.Bar progress={props.pet.level / 3} width={Dimensions.get('window').width * 0.74} height={10} borderRadius={10} /></View>
      </View>
      <View style={styles.expContainer}>
        <Text style={styles.expText}>Exp:</Text><View style={styles.expBar}><Progress.Bar progress={props.pet.experience / 5} width={Dimensions.get('window').width * 0.74} height={10} borderRadius={10} /></View>
      </View>
    </View>
  );
};

module.exports = PetBox;