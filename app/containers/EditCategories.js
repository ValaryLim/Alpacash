import React, { Component } from "react";

import { 
    StyleSheet,
    View, 
    ScrollView,
    Text
} from "react-native";



import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view-forked'
import firebase from 'react-native-firebase';


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
          const { id, title, checked, color } = doc.data();
          
          incomeCategories.push({
            key: doc.id,
            doc, // DocumentSnapshot
            id,
            title,
            checked,
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
          const { id, title, checked, color } = doc.data();
          
          expenseCategories.push({
            key: doc.id,
            doc, // DocumentSnapshot
            id,
            title,
            checked,
            color
          });
        });
        this.setState({ 
          expenseCategories,
          loading: false
       });
     }

    render() {
        return(        
            <ScrollableTabView

                renderTabBar={() => (
                <ScrollableTabBar
                    style={styles.scrollStyle}
                    tabStyle={styles.tabStyle}
                />
                )}
                tabBarTextStyle={styles.tabBarTextStyle}
                tabBarInactiveTextColor={'black'}
                tabBarActiveTextColor={'red'}
                tabBarUnderlineStyle={styles.underlineStyle}
                initialPage={2}
                >

            <View key={'1'} tabLabel={'Expenditure'} style={{flex:1,backgroundColor:'white'}}/>   
            <View key={'2'} tabLabel={'  Income'} style={{flex:1,backgroundColor:'white'}}/>

            </ScrollableTabView>

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
    }
});
