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
import Gestures from 'react-native-easy-gestures';
import * as Progress from 'react-native-progress';

import MovableAlpaca from "../components/MovableAlpaca";
import BudgetSetting from './BudgetSetting.js';
import BudgetChart from '../components/BudgetChart.js'



class BudgetScreen extends React.Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('expense_categories');
        this.budget = firebase.firestore().collection('budget');
        this.trans = firebase.firestore().collection('trans');
        this.unsubscribe_categories = null;
        this.unsubscribe_trans = null;
        this.unsubscribe_budget = null;
        this.state = {
            budget:[],
            categories: [],
            trans: [],
            currAmount: 0,
            alpacas: {'level1': 1},
            loading: true,
            startWeek: moment().startOf('isoWeek').format("YYYY-MM-DD"),
            endWeek: moment().endOf('isoWeek').format("YYYY-MM-DD"),
        }
    }

    componentDidMount() {
        this.unsubscribe_categories= this.ref.orderBy('id').onSnapshot(this.onCollectionUpdate);
        this.unsubscribe_trans = this.trans.where('date', '>=', this.state.startWeek) 
        .where('date', '<=', this.state.endWeek).onSnapshot(this.onTransUpdate);
        this.unsubscribe_budget = this.budget.onSnapshot(this.onBudgetUpdate);
        this.state.budget.forEach((budget) => { 
            this.updateCurrentAmount(budget);
        });
      }
    
    componentWillUnmount() {
        this.unsubscribe_categories();
        this.unsubscribe_trans();
        this.unsubscribe_budget();
    }

    updateCurrentAmount(budgetItem) {
        this.state.trans.forEach((transaction) => {
            budgetItem.categories.forEach((cat) => {
                if (transaction.category == cat) {
                    this.state.currAmount += parseInt(transaction.amount);
                }
            })
        });

        firebase.firestore().runTransaction(async transaction => {
            const doc = await transaction.get(this.budget.doc(budgetItem.doc.id));
            if (!doc.exists) {
              transaction.set(this.budget.doc(budgetItem.doc.id), { currAmount: 0 });
              return 0;
            }
    
              const newAmount = this.state.currAmount;
    
            transaction.update(this.budget.doc(budgetItem.doc.id), {
              currAmount: newAmount,
            });
            return newAmount;
          })
          .catch(error => {
            console.log('Transaction failed: ', error);
          });

          this.setState({
              currAmount: 0
          })
    }

    onCollectionUpdate = (querySnapshot) => {
        const categories = [];
        querySnapshot.forEach((doc) => {
          const { id, title, checked, color } = doc.data();
          
          categories.push({
            key: doc.id,
            doc, // DocumentSnapshot
            id,
            title,
            checked,
            color
          });
        });
        this.setState({ 
          categories,
          loading: false
       });
    }

    onTransUpdate = (querySnapshot) => {
      const trans = [];
      querySnapshot.forEach((doc) => {
        const { date, amount, category} = doc.data();
        
        trans.push({
          key: doc.id,
          doc, // DocumentSnapshot
          amount,
          category,
          date
        });
      });
      this.setState({ 
        trans,
        loading: false
     });
  }

  onBudgetUpdate = (querySnapshot) => {
    const budget = [];
    querySnapshot.forEach((doc) => {
      const { amount, categories, currAmount, title} = doc.data();
      
      budget.push({
        key: doc.id,
        doc, // DocumentSnapshot
        amount,
        categories,
        currAmount,
        title
      });
    });
    this.setState({ 
      budget,
      loading: false
   });
}


    render() {
        var renderAlpacas = [];
        for (let i = 0; i < this.state.alpacas['level1']; i++) {
            renderAlpacas.push(<MovableAlpaca key = {i} />)
        };

        return (
            <View style = {styles.container}>
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
