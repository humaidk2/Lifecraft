// import React, { Component } from 'react';
// import { SensorManager } from 'NativeModules';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Button,
//   Image,
//   Dimensions,
//   DeviceEventEmitter,
//   Animated,
// } from 'react-native';
// import PetBox from './petBox.js';
// import Buttons from './buttons.js';
// import StatusMessage from './statusMessage.js';
// import Info from './info.js';
// import Restart from './restart.js';
// import Question from './question.js';
// import {Scene, Router} from 'react-native-router-flux';
// import {Actions} from 'react-native-router-flux';
// import Sound from 'react-native-sound';


// var mSensorManager = require('NativeModules').SensorManager;

// export default class Petlist extends Component {
//   constructor(props) {
//     super(props);
//     //this.getLog = this.getLog.bind(this);
//     this.state = {
//       pets: [],
//       user: {},
//       petName: ''
//     };
//     this.getInput = this.getInput.bind(this);
//     this.newPet = this.newPet.bind(this);                                  
//     fetch('http://10.6.19.73:3000/findpets', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({username: props.username})
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       // if data = true, user is found and route to home. if false, stay on login page
//       console.log('data', data);
//       if (data) {
//         //browserHistory.currentUser = that.state.username;
//         //that.props.router.push({pathname: '/home'});
        
//         that.setState({
//           pets: data.pet,
//           user: data.user
//         });
//       } else {
//         console.log('not a valid user');
//         Actions.Login({type: 'reset'});
//       }
//     })
//     .catch((error) => {
//       console.warn(error);
//     }).done();                         
//   }



//   newPet(e) {
//     var that = this;
//     fetch('http://10.6.19.73:3000/api/newPet', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({name: that.state.petName, userId: that.state.user.userId})
//     })
//     .then((response) => response)
//     .then((data) => {
//       console.log(that.state.petName, that.state.user.userId);
//     })
//     .catch((error) => {
//       console.warn(error);
//     }).done();
//   }
//   getInput(petName) {
//     this.setState({
//       petName: petName
//     });
//   }
//   render() {
//     return (
//       <View className='signin-box container'>
//         <View>
//          {this.state.pets.map((pet) => (<Text>{pet.name}</Text>))} 
//         </View> 
//          <TextInput onSubmitEditing={this.newPet} placeholder='Enter new pet name!' className='newPetName' onChangeText={(text) => this.getInput(text)} />
//          <View>
//          <Button title="Restart" onPress={this.newPet} />
//          </View>
//       </View>
//     );
//   }

    
// }