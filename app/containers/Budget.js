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
import moment from 'moment';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';

import MovableAlpaca from "../components/MovableAlpaca";
import BudgetSetting from './BudgetSetting.js';
import BudgetChart from '../components/BudgetChart.js'
import { declareExportAllDeclaration } from "@babel/types";



export default class BudgetScreen extends Component {
    constructor() {
        super();
        this.budget = firebase.firestore().collection('budget');
        this.trans = firebase.firestore().collection('trans');
        this.unsubscribe_budget = null;
        this.unsubscribe_trans = null;
        this.state = {
            isModalVisible: false,
            trans: [],
            loading: true,
            budgetAmount: [],
            startWeek: moment().startOf('isoWeek').format("YYYY-MM-DD"),
            endWeek: moment().endOf('isoWeek').format("YYYY-MM-DD"),
            alpacas: []
        }
    }

    componentDidMount() {
        this.unsubscribe_budget = this.budget.onSnapshot(this.onBudgetUpdate); 
        this.unsubscribe_trans = this.trans.onSnapshot(this.onTransUpdate);
        // Add two initial level 1 alpacas
        this.addAlpaca(1);
        this.addAlpaca(5);
        this.addAlpaca(1);
      }
    
    componentWillUnmount() {
        this.unsubscribe_budget();
        this.unsubscribe_trans();
    }

    onBudgetUpdate = (querySnapshot) => {
        const budget = [];
        querySnapshot.forEach((doc) => {
          const { title, amount, categories, currAmount, lastUpdate } = doc.data();
          
          budget.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            amount,
            categories,
            currAmount,
            lastUpdate
          });
        });

        this.setState({ 
          budget, 
          loading: false
       });
    }

    onTransUpdate = (querySnapshot) => {
        const trans = [];
        querySnapshot.forEach((doc) => {
        const { title, amount, category, date, type } = doc.data();
          
        trans.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            amount,
            category,
            date,
            type
            
        });
    });
    
        this.setState({ 
            trans,
            loading: false,
        });
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    addAlpaca = (level) => {
        this.state.alpacas.push({
          'alpaca': new MovableAlpaca(),
          'level': level
        })
    }

    mergeAlpaca = (locationX, locationY) => {
        var mergingAlpacas = {};

        for (let i = 0; i < this.state.alpacas.length; i++) {
            // Get location of each alpaca
            var a = this.state.alpacas[i]['alpaca'];

            // If location is within 50 (width) and 200(height) 
            // Check if any alpacas have the same level =>
            // if yes =>
            // 1. add a higher level alpaca
            // 2. remove the 2 alpacas

            // else 
            // push alpaca and length in the format {length:alpaca}
        }
    }

    render() {
        var renderAlpacas = [];
        for (let i = 0; i < this.state.alpacas.length; i++) {
            renderAlpacas.push(<MovableAlpaca key = {i} src = {this.state.alpacas[i].alpaca} 
                level = {this.state.alpacas[i].level}
                mergeAlpacaChild = {this.mergeAlpaca}/>)
        };

        return (
            <View style = {styles.container}>
                <Modal isVisible = {this.state.isModalVisible}>
                  <BudgetSetting toggleModalChild = {this.toggleModal}/>
                </Modal>
                <View style = {styles.progressContainer}>
                    <BudgetChart/>
                </View>
                <View style = {styles.alpacaContainer} >
                    { renderAlpacas }
                </View>
                <View style = {styles.navigationContainer}>
                    <Icon 
                        name='add-circle-outline'
                        type='material'
                        color='#fff'
                        size={45}
                        onPress={() => this.toggleModal()} />
                        
                </View>
                </View>
            
        );
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
