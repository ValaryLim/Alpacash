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

/*
    other import statements or 
    JS variables like const here - can be dummy data to use for development
*/
export default class BudgetSetting extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('expense_categories');
        this.budget = firebase.firestore().collection('budget');
        this.checkbox = null;
        this.unsubscribe = null;
        this.state = {
            categories: [],
            loading: true,
            
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.orderBy('id').onSnapshot(this.onCollectionUpdate);
      }
    
    componentWillUnmount() {
        this.unsubscribe();
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

      toggleCheckbox2(id) {
        firebase.firestore().collection("expense_categories").where("id", "==", id)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                doc.update(doc, {checked: !doc.data().checked});
            });
         })
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
                />
                <TextInput style = {styles.budgetAmount}
                    placeholder='Enter budget amount'
                    placeholderTextColor = 'white'
                    keyboardType ='numeric'
                    underlineColorAndroid = 'transparent'
                />
                </View>
                <ScrollView style = {styles.categoryBox}>
                {this.state.categories.map((cat) => {    
                    return (            
                    <CheckBox
                            center
                            key = {cat.id}
                            title={cat.title}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={cat.checked}
                            onPress = {() => this.toggleCheckbox(cat.doc.id)}  
                    />
                    )
                })}
                </ScrollView>
                <View style = {styles.footer}>
                  <Button rounded success 
                    style = {styles.confirmButton}> 
                    <Text> Confirm</Text>
                  </Button>
                  <Button rounded danger
                    style = {styles.confirmButton}>
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
  budgetTitle: {
    fontSize: 15,
  },
  budgetAmount: {
    fontSize: 30
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
