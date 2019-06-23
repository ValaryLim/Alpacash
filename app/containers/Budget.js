import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableWithoutFeedback,
    Animated,
    Image,
    Easing
} from "react-native";

import { Icon } from 'react-native-elements'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'react-native-firebase';


import Alpaca from "../components/Alpaca";
import BudgetSetting from './BudgetSetting.js';

class BudgetScreen extends React.Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('budget');
    }
    render() {
        return (

            <View style = {styles.container} >
                <Alpaca/>
                <Alpaca/>
                <Alpaca/>
                <Alpaca/>
                <Alpaca/>
                <Icon 
                    name='add-circle-outline'
                    type='material'
                    color='#fff'
                    size={40}
                    onPress={() => this.props.navigation.navigate('BudgetSetting')} />
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
      Budget: BudgetScreen,
      BudgetSetting: BudgetSetting,
    },
    {
      initialRouteName: 'Budget',
    }
  );
  
const AppContainer = createAppContainer(RootStack);

export default class Budget extends React.Component {
    render() {
      return <AppContainer />;
    }
}

/**
 * StyleSheet
 */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1EE3CF"
    },
  });
