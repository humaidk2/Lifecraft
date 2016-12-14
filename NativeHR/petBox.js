import React from 'react';
import {
  View,
  Text,
  StatusBar,
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
    <View>
      <Text>Stats</Text>
      <Text>Love:</Text>
      <Text>Energy:</Text>
      <Text>Health:</Text>
      <Text>Level:</Text>
      <Text>Experience:</Text>
    </View>
  );
};

module.exports = PetBox;