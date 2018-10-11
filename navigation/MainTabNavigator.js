import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});


const LinksStack = createStackNavigator({
  Links: LinksScreen,
});



const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});



export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
