import React from 'react';  
import {StyleSheet, Text, View, Button} from 'react-native';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/FontAwesome5';  

import Transactions from './containers/Transactions.js';
import Budget from './containers/Budget.js';
import Statistics from './containers/Statistics.js';
import Settings from './containers/Settings.js';

const TabNavigator = createMaterialBottomTabNavigator(  
    {  
      Transactions: { 
        screen: Transactions,  
        navigationOptions:{  
          tabBarLabel:<Text style = {{fontSize:10}}>Transactions</Text>,   
          tabBarIcon: ({ tintColor }) => (  
            <View>  
              <Icon style={[{color: tintColor}]} size={20} name={'credit-card'}/>  
            </View>
          ),  
        }  
      },  
        
      Budget: { 
        screen: Budget,  
        navigationOptions:{  
          tabBarLabel:<Text style = {{fontSize:10}}>Budget</Text>,  
          tabBarIcon: ({ tintColor }) => (  
            <View>  
              <Icon style={[{color: tintColor}]} size={20} name={'piggy-bank'}/>  
            </View>
          ),  
        }  
      },  

      Statistics: { 
        screen: Statistics,  
        navigationOptions:{  
          tabBarLabel:<Text style = {{fontSize:10}}>Statistics</Text>,  
          tabBarIcon: ({ tintColor }) => (  
            <View>  
              <Icon style={[{color: tintColor}]} size={20} name={'chart-bar'}/>  
            </View>
          ),
        }  
      },  

      Settings: {  
        screen: Settings,  
        navigationOptions:{  
          tabBarLabel:<Text style = {{fontSize:10}}>Settings</Text>,
          tabBarIcon: ({ tintColor }) => (  
            <View>  
              <Icon style={[{color: tintColor}]} size={20} name={'cog'}/>  
            </View>
          ),  
        }  
      },  
    },  
    {  
      initialRouteName: "Transactions",  
      activeColor: '#1D2786',  
      inactiveColor: '#72757E',  
      barStyle: { backgroundColor: '#ffffff' },
    },  
);  
  
export default createAppContainer(TabNavigator);