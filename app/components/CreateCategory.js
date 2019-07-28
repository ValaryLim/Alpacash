import React, { Component } from "react";

import { 
    StyleSheet,
    View, 
    Text,
    TextInput,
} from "react-native";

import { Button } from 'native-base';

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view-forked'
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';




export default class EditCategories extends Component {
    constructor() {
        super();
        this.expense_categories = firebase.firestore().collection('expense_categories');
        this.income_categories = firebase.firestore().collection('income_categories');
        this.unsubscribe_expense_categories = null;
        this.unsubscribe_income_categories = null;
        this.state = {
            loading: true,
            expenseCategories: [],
            incomeCategories: [],
            title: "",
        }
    }

    componentDidMount() {
        this.unsubscribe_expense_categories = this.expense_categories.onSnapshot(this.onExCategoriesUpdate);
        this.unsubscribe_income_categories = this.income_categories.onSnapshot(this.onInCategoriesUpdate);
    }
    
    componentWillUnmount() {
        this.unsubscribe_expense_categories();
        this.unsubscribe_income_categories();
    }

    onInCategoriesUpdate = (querySnapshot) => {
        const incomeCategories = [];
        querySnapshot.forEach((doc) => {
          const { id, title, checked, icon, color } = doc.data();
          
          incomeCategories.push({
            key: doc.id,
            doc, // DocumentSnapshot
            id,
            title,
            checked,
            icon,
            color
          });
        });
        this.setState({ 
          incomeCategories,
          loading: false
       });
    
    }

    onExCategoriesUpdate = (querySnapshot) => {
        const expenseCategories = [];
        querySnapshot.forEach((doc) => {
          const { id, title, checked, icon, color } = doc.data();
          
          expenseCategories.push({
            key: doc.id,
            doc, // DocumentSnapshot
            id,
            title,
            icon,
            checked,
            color
          });
        });
        this.setState({ 
          expenseCategories,
          loading: false
       });
     }

     updateCategoryTitle(title) {
        this.setState({title: title})
      }

    render() {
        return(      
          <View style = {styles.container}>
              <View style = {styles.header}>
                <TextInput style = {styles.categorytitle}
                    placeholder='Enter category title'
                    placeholderTextColor = 'white'
                    autoCapitalize = 'characters'
                    underlineColorAndroid = 'transparent'
                    onChangeText = {(text) => this.updateCategoryTitle(text)}
                    maxLength = {20}
                />
              </View>
                <View style = {styles.footer}>
                  <Button rounded success 
                    style = {styles.confirmButton}
                    onPress = {() => this.props.toggleModalChild()}> 
                    <Text> Confirm</Text>
                  </Button>
                  <Button rounded danger
                    style = {styles.confirmButton}
                    onPress = {() => this.props.toggleModalChild()}>
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
    separator: {
        height: 30,
        width: "100%"
    },
    main: {
        justifyContent: "center",
        flex: 1,
        margin: 10
    },
    button: {
        padding: 10,
        fontSize: 18,
        height: 40
    },
    header: {
        backgroundColor: "#F66A73",
        height: '30%',
        alignItems: 'center'
      },
      footer: {
        backgroundColor: "#fff",
        height: '20%',
        justifyContent: 'space-between',
        flexDirection: 'row'
      },
    item: {
        height: 50,
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        marginLeft: '10%',
        color:"black",
        width: '5%'
     
    },
    itemText: {
        color: "black",
        fontSize: 17,
        marginLeft: '5%'
    },
    confirmButton: {
        width: 100,
        justifyContent: 'center',
        marginLeft: '10%',
        marginRight: '10%'
      }
});
