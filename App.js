import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import Home from './src/screen/Home';
import Multiplayer from './src/screen/Multiplayer';
import Singleplayer from './src/screen/Singleplayer';

import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const RootStack = createStackNavigator({
  Home:Home,
  Multiplayer:Multiplayer,
  Singleplayer:Singleplayer
});
const App = createAppContainer(RootStack);
export default  App;
  


