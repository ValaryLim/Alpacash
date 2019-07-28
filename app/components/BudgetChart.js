import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert} from "react-native";
import firebase from 'react-native-firebase';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class BudgetChart extends React.Component {
    constructor() {
        super();
        this.budget = firebase.firestore().collection('budget');
        this.unsubscribe = null;
        this.key = null;

        this.state = {
            loading: true,
            data: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.budget.onSnapshot(this.onCollectionUpdate);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const data = [];

        querySnapshot.forEach((doc) => {
            const { amount, categories, currAmount, endDate, startDate, title } = doc.data();
            
            data.push({
                key: doc.id,
                doc, // DocumentSnapshot
                amount,
                currAmount,
                title
            });
        });
        
        this.setState({ 
            data,
            loading: false,
         });
    }

    deleteBudget(deleteItemId) {
        this.budget.doc(deleteItemId).delete().then(function() {
             alert("Deleted")
         }).catch(function(error) {
             alert("Error removing document: ", error);
         });
     }
    

    render() {
        if (this.state.loading) {
            return null; // or render a loading icon
        }

        return (
            <View>
                <View>
                {this.state.data.map((bud) => {
                    const progressPercentage = bud.currAmount / bud.amount;
                    return (
                        <View key = {bud.doc.id} style = {styles.barBox}>
                            <Text> {bud.title} </Text>
                            <Progress.Bar 
                            progress = { progressPercentage } 
                            width = {200} 
                            height = {50}
                            color = "#8293FF"
                            unfilledColor = "#FFFFFF"
                            borderColor = "#FFFFFF"
                            />      
                            <Text> {progressPercentage*100}% </Text>
                            <TouchableOpacity 
                            onPress = {() => Alert.alert("Confirm Delete", "Do you want to delete?", 
                                [{text: 'Yes', onPress: () => this.deleteBudget(bud.doc.id)}, 
                                {text: 'No', onPress: () => console.log('Cancel')}])}>
                                <Icon
                                    size = {15} 
                                    name= "trash" 
                                    style = {styles.deleteIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                })}
                </View>             
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1
    },
    barBox: {
        flexDirection: 'row',
        height: 20,
        marginBottom: 5,
        alignSelf: 'flex-end'
    },
    deleteIcon: {
        marginRight: 5
    }
  });
