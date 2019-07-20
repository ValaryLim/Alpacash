import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    TextInput, 
    ScrollView
} from "react-native";
import { CheckBox, Text} from 'react-native-elements';
import {Button} from 'native-base';
import firebase from 'react-native-firebase';
import moment from 'moment';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Budget from './Budget.js';

/*
    other import statements or 
    JS variables like const here - can be dummy data to use for development
*/
export default class BudgetSetting extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('expense_categories');
        this.budget = firebase.firestore().collection('budget');
        this.trans = firebase.firestore().collection('trans');
        this.checkbox = null;
        this.unsubscribe = null;
        this.unsubscribe_trans = null;
        this.state = {
            categories: [],
            trans: [],
            loading: true,
            title: '',
            amount: '',
            startWeek: moment().startOf('isoWeek').format("YYYY-MM-DD"),
            endWeek: moment().endOf('isoWeek').format("YYYY-MM-DD"),
            selected: [],
            currAmount: 0,
        };
    }

    componentDidMount() {
        this.unsubscribe_categories= this.ref.orderBy('id').onSnapshot(this.onCollectionUpdate);
        this.unsubscribe_trans = this.trans.where('date', '>=', this.state.startWeek) 
        .where('date', '<=', this.state.endWeek).onSnapshot(this.onTransUpdate);
      }
    
    componentWillUnmount() {
        this.unsubscribe_categories();
        this.unsubscribe_trans();
    }
    

      updateBudgetTitle(title) {
        this.setState({title: title})
      }

      updateBudgetAmount(amount) {
        this.setState({amount: amount})
      }

      updateSelectedCategories() {
        this.state.categories.forEach((cat) => {
          if (cat.checked) {
            this.state.selected.push(cat.title);
          }
        });
      }

      updateCurrentAmount() {
        this.state.selected.forEach((sel) => { 
          this.state.trans.forEach((trans) => {
            if (trans.category == sel) {
              this.state.currAmount += parseInt(trans.amount);
          }
      });
      });
    }    

      addBudget() {
        this.budget.add({
          title: this.state.title,
          amount: parseFloat(this.state.amount),
          categories: this.state.selected,
          currAmount: this.state.currAmount,
        });
        this.setState({
          title: '',
          amount: '',
          selected: [],
        })
      }

      confirmBudget() {
        this.updateSelectedCategories();
        this.updateCurrentAmount();
        this.addBudget();
        this.props.navigation.navigate('Budget');
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

    toggleCheckbox(id) {
      this.checkbox = this.ref.doc(id);
        firebase.firestore().runTransaction(async transaction => {
          const doc = await transaction.get(this.checkbox);
          if (!doc.exists) {
            transaction.set(this.checkbox, {checked: false});
            return false;
          }
        
          const newState = !(doc.data().checked);
  
          transaction.update(this.checkbox, {
            checked: newState
          });
          return newState;
        })
        .catch(error => {
          console.log('Transaction failed: ', error);
        });
    }
    

      updateBudgetTitle(title) {
        this.setState({title: title})
      }

      updateBudgetAmount(amount) {
        this.setState({amount: amount})
      }

      updateSelectedCategories() {
        this.state.categories.forEach((cat) => {
          if (cat.checked) {
            this.state.selected.push(cat.title);
          }
        });
      }

      updateCurrentAmount() {
        this.state.selected.forEach((sel) => { 
          this.state.trans.forEach((trans) => {
            if (trans.category == sel)
              this.state.currAmount += parseInt(trans.amount);
          })
      });
      }    

      addBudget() {
        this.budget.add({
          title: this.state.title,
          amount: parseFloat(this.state.amount),
          categories: this.state.selected,
          currAmount: this.state.currAmount,
        });
        this.setState({
          title: '',
          amount: '',
          selected: [],
        })
      }

      confirmBudget() {
        this.updateSelectedCategories();
        this.updateCurrentAmount();
        this.addBudget();
        this.props.navigation.navigate('Budget');
      }

      

    render() {
        return (
            <View style = {styles.container}>
              <View style = {styles.header}>
                <TextInput style = {styles.budgetTitle}
                    placeholder='Enter budget title'
                    placeholderTextColor = 'white'
                    autoCapitalize = 'characters'
                    underlineColorAndroid = 'transparent'
                    onChangeText = {(text) => this.updateBudgetTitle(text)}
                    maxLength = {20}
                />
                <View style = {styles.amountContainer}>
                <Text style = {{fontSize: 30, color: 'white'}}>$</Text>
                <TextInput style = {styles.budgetAmount}
                    placeholder='Enter amount'
                    placeholderTextColor = 'white'
                    keyboardType ='numeric'
                    underlineColorAndroid = 'transparent'
                    onChangeText = {(text) => this.updateBudgetAmount(text)}
                />
                </View>
              </View>
                <ScrollView style = {styles.categoryBox}>
                {this.state.categories.map((cat) => {    
                    return (            
                    <CheckBox
                            key = {cat.id}
                            title={cat.title}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={cat.checked}
                            onPress = {() => this.toggleCheckbox(cat.doc.id) } 
                    />
                    )
                })}
                </ScrollView>
                <View style = {styles.footer}>
                  <Button rounded success 
                    style = {styles.confirmButton}
                    onPress = {() => this.confirmBudget()}> 
                    <Text> Confirm</Text>
                  </Button>
                  <Button rounded danger
                    style = {styles.confirmButton}
                    onPress = {() => this.props.navigation.navigate('Budget')}>
                      <Text> Delete </Text>
                  </Button>
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
    flex: 1,
  },
  header: {
    backgroundColor: "#F66A73",
    height: '30%',
    alignItems: 'center'
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  budgetTitle: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center'
  },
  budgetAmount: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  categoryBox: {
      backgroundColor: '#fff'
  },
  footer: {
    backgroundColor: "#fff",
    height: '20%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  confirmButton: {
    width: 100,
    justifyContent: 'center',
    marginLeft: '10%',
    marginRight: '10%'
  }
});
