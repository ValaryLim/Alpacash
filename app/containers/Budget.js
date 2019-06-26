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
import Draggable from 'react-native-draggable';


import Alpaca from "../components/Alpaca";
import BudgetSetting from './BudgetSetting.js';


class BudgetScreen extends React.Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('budget');
        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;
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
        height: "100%",
        width: "100%",
        backgroundColor: "#1EE3CF"
    },
  });

