import React from 'react';  
import {StyleSheet, Text, View,Button} from 'react-native';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/FontAwesome5';  

import Transactions from './containers/Transactions';
import Budget from './containers/Budget';
import Statistics from './containers/Statistics';
import Settings from './containers/Settings';

const TabNavigator = createMaterialBottomTabNavigator(  
    {  
      Transactions: { 
        screen: Transactions,  
        navigationOptions:{  
          tabBarLabel:<Text style = {{fontSize:9}}>Transactions</Text>,   
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
          tabBarLabel:<Text style = {{fontSize:9}}>Budget</Text>,  
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
          tabBarLabel:<Text style = {{fontSize:9}}>Statistics</Text>,  
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
          tabBarLabel:<Text style = {{fontSize:9}}>Settings</Text>,
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
      activeColor: '#7BCCC7',  
      inactiveColor: '#72757E',  
      barStyle: { backgroundColor: '#ffffff' },
    },  
);  
  
export default createAppContainer(TabNavigator);

// import React, { Component } from "react";


// // for navigation
// import 

// /*
//     other import statements or 
//     JS variables like const here - can be dummy datas to use for development
// */
// export default class App extends Component {
//   render() {
//     return (
//       <Trans />
//     );
//   }
// }