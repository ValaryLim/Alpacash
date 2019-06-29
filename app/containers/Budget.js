import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableWithoutFeedback,
    Animated,
    Image,
    Easing,
    Dimensions
} from "react-native";


import { Icon } from 'react-native-elements'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'react-native-firebase';
import Gestures from 'react-native-easy-gestures';

import MovableAlpaca from "../components/MovableAlpaca";
import BudgetSetting from './BudgetSetting.js';


class BudgetScreen extends React.Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('budget');
    }
    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.alpacaContainer} >
                    <MovableAlpaca/>
                    <MovableAlpaca/>
                    <MovableAlpaca/>
                    <MovableAlpaca/>
                    <MovableAlpaca/>
                </View>
                <View style = {styles.navigationContainer}>
                    <Icon 
                        name='add-circle-outline'
                        type='material'
                        color='#fff'
                        size={30}
                        onPress={() => this.props.navigation.navigate('BudgetSetting')} />
                </View>
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
        height: "100%",
        width: "100%",
        backgroundColor: "#1EE3CF"
    },
    alpacaContainer: {
        flex: 0.85
    },
    navigationContainer: {
        flex: 0.15
    }
  });

