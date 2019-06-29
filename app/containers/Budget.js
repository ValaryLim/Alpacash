import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    ImageBackground,
    Animated,
    Image,
    Easing,
    Dimensions
} from "react-native";


import { Icon } from 'react-native-elements'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from 'react-native-firebase';
import Gestures from 'react-native-easy-gestures';
import * as Progress from 'react-native-progress';

import MovableAlpaca from "../components/MovableAlpaca";
import BudgetSetting from './BudgetSetting.js';
import BudgetChart from '../components/BudgetChart.js'


class BudgetScreen extends React.Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('budget');
        this.unsubscribe = null;
        this.state = {
            budget:[],
            loading: true
        }
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate); 
      }
    
    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const budget = [];
        querySnapshot.forEach((doc) => {
          const { amount, currAmount } = doc.data();
          
          budget.push({
            key: doc.id,
            doc, // DocumentSnapshot
            amount,
            currAmount
          });
        });

        this.setState({ 
          budget, 
          loading: false
       });
    }
    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.progressContainer}>
                    <BudgetChart/>
                </View>
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
                        size={45}
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
    progressContainer: {
        marginTop: 10,
    },
    progressContainer: {
        marginTop: 10,
    },
    alpacaContainer: {
        flex: 0.85,
        flexDirection: 'column',
        height: "60%",
    },
    navigationContainer: {
        flex: 0.15
    }
  });
