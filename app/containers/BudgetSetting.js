import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    TextInput, 
} from "react-native";
import { CheckBox } from 'react-native-elements';
import firebase from 'react-native-firebase';

/*
    other import statements or 
    JS variables like const here - can be dummy data to use for development
*/
export default class BudgetSetting extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('categories');
        this.unsubscribe = null;
        this.state = {
            categories: [],
            loading: true
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
          const { title, checked } = doc.data();
          
          categories.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            checked
          });
        });
        this.setState({ 
          categories,
          loading: false,
       });
    }
    
    render() {
        return (
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
                {this.state.categories.map((cat) => {    
                    return (            
                    <CheckBox
                            center
                            key = {cat.id}
                            title={cat.title}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={cat.checked}
                        
                    />
                    )
                })}
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
    backgroundColor: '#F56B74',
  },
  budgetTitle: {
  },
  categoryBox: {
      flex: 1,
      height: 100
  }
});
