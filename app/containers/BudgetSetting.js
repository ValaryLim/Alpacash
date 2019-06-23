import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    TextInput, 
    ScrollView, 
    TouchableOpacity,
} from "react-native";
import { FormLabel, FormInput, Input, FormValidationMessage } from 'react-native-elements';
import firebase from 'react-native-firebase';
/*
    other import statements or 
    JS variables like const here - can be dummy data to use for development
*/
export default class BudgetSetting extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('budget');
    }

    render() {
        return(
            <View style = {styles.container}>
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
        );
    }
}



/**
 * StyleSheet
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F56B74'
  },
  budgetTitle: {
  }
});
