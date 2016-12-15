import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';

var PetBox = (props) => {

  // var statusProps = {
  //   love: props.pet.love,
  //   status: props.pet.status,
  //   energy: props.pet.feed,
  //   health: props.pet.health,
  //   level: props.pet.level,
  //   experience: props.pet.experience,
  //   name: props.pet.name
  // };

  // var bars = {
  //   loveBar: { width: props.pet.love / 8 * 100 + '%' },
  //   energyBar: { width: props.pet.feed / 8 * 100 + '%' },
  //   healthBar: { width: props.pet.health / 8 * 100 + '%' },
  //   levelBar: { width: props.pet.level / 3 * 100 + '%' },
  //   experienceBar: { width: props.pet.experience / 5 * 100 + '%' }
  // };

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
    // flex: 3,
    marginLeft: 20,
    width: 50,
  },
  loveBar: {
    flex: 1,
    marginTop: 5,
    marginBottom: 15,
    // marginRight: 20,
    // marginLeft: 10,
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
    // marginRight: 10,
    // marginLeft: 10,
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
    // marginRight: 10,
    // marginLeft: 10,
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
    // marginRight: 10,
    // marginLeft: 10,
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
    // marginRight: 10,
    // marginLeft: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
  },
});

module.exports = PetBox;