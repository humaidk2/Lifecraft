import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

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
      <View style={styles.loveContainer}>
        <Text style={styles.loveText}>Love:</Text><View style={styles.loveBar}></View>
      </View>
      <View style={styles.energyContainer}>
        <Text style={styles.energyText}>Energy:</Text><View style={styles.energyBar}></View>
      </View>
      <View style={styles.healthContainer}>
        <Text style={styles.healthText}>Health:</Text><View style={styles.healthBar}></View>
      </View>
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>Level:</Text><View style={styles.levelBar}></View>
      </View>
      <View style={styles.expContainer}>
        <Text style={styles.expText}>Exp:</Text><View style={styles.expBar}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginLeft: 10,
    width: 50,
  },
  loveBar: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 20,
    width: 30,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  energyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  energyText: {
    marginLeft: 10,
    width: 50,
  },
  energyBar: {
    marginTop: 5,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 20,
    width: 100,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  healthContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  healthText: {
    marginLeft: 10,
    width: 50,
  },
  healthBar: {
    marginTop: 5,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 20,
    width: 50,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  levelContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  levelText: {
    marginLeft: 10,
    width: 50,
  },
  levelBar: {
    marginTop: 5,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 20,
    width: 200,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  expContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  expText: {
    marginLeft: 10,
    width: 50,
  },
  expBar: {
    marginTop: 5,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 20,
    width: 130,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
  },
});

module.exports = PetBox;