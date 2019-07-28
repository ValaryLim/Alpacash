import React, { Component } from "react";

import { 
    StyleSheet,
    View, 
    ScrollView,
    Text,
    Button,
    TouchableOpacity
} from "react-native";


import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view-forked'
import firebase from 'react-native-firebase';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';

import CreateCategoryEx from "../components/CreateCategoryEx.js";
import CreateCategoryIn from "../components/CreateCategoryIn.js";

export default class EditCategories extends Component {
    constructor() {
        super();
        this.expense_categories = firebase.firestore().collection('expense_categories');
        this.income_categories = firebase.firestore().collection('income_categories');
        this.unsubscribe_expense_categories = null;
        this.unsubscribe_income_categories = null;
        this.state = {
            loading: true,
            isExModalVisible: false,
            isInModalVisible: false,
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

     getCategoryIcon(type, title) {
        var icon;
        if (type == 'expenditure') {
        this.state.expenseCategories.map((cat) => {
          if(cat.title == title) {
            icon = cat.icon;
          }
        }); 
      } else {
        this.state.incomeCategories.map((cat) => {
          if(cat.title == title) {
            icon = cat.icon;
          }
        }); 
      }
        return icon;
    }

    toggleModalEx = () => {
        this.setState({ isExModalVisible: !this.state.isExModalVisible });
    }

    toggleModalIn = () => {
        this.setState({ isInModalVisible: !this.state.isInModalVisible });
    }

    render() {
        return(      
           <ScrollableTabView
            style={styles.container}
            renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)'/>}
            tabBarTextStyle = {{fontSize: 20}}
          >
            <ScrollView tabLabel='Expenditure'>
              <Modal isVisible = {this.state.isExModalVisible}>
                    <CreateCategoryEx toggleModalChild = {this.toggleModalEx}/>
              </Modal>
              <TouchableOpacity style = { styles.addButton } onPress={() => this.toggleModalEx()}>
                  <Text style = { styles.buttonText }>ADD CATEGORY</Text>
              </TouchableOpacity>
              {this.state.expenseCategories.map((cat) => {    
                      return (            
                      <View key = {cat.id} style = {styles.item}>
                          <Icon 
                              size = {20} 
                              name={this.getCategoryIcon("expenditure", cat.title)} 
                              style = {styles.iconStyle}/>
                          <Text style = {styles.itemText}>{cat.title}</Text>
                      </View>
                      )
                  })}
            </ScrollView>
            
            <ScrollView tabLabel='Income'>
            <Modal isVisible = {this.state.isInModalVisible}>
                  <CreateCategoryIn toggleModalChild = {this.toggleModalIn}/>
            </Modal>
            <TouchableOpacity style = { styles.addButton } onPress={() => this.toggleModalIn()}>
                  <Text style = { styles.buttonText }>ADD CATEGORY</Text>
            </TouchableOpacity>
            {this.state.incomeCategories.map((cat) => {    
                    return (            
                    <View key = {cat.id} style = {styles.item}>
                        <Icon 
                            size = {20} 
                            name={this.getCategoryIcon("income", cat.title)} 
                            style = {styles.iconStyle}/>
                        <Text style = {styles.itemText}>{cat.title}</Text>
                    </View>
                    )
                })}
            </ScrollView>
          </ScrollableTabView>
        );
    }
}

/**
 * StyleSheet
 */
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 100,
        paddingTop: 25
    },
    separator: {
        height: 30,
        width: "100%"
    },
    main: {
        justifyContent: "center",
        flex: 1,
        margin: 10
    },
    addButton: {
        paddingTop: 10,
        height: 50,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "#8293FF",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        textAlignVertical: "center"
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
});
