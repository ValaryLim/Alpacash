import React, { Component } from 'react';
import {Button, 
        StyleSheet, 
        View, 
        Text} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import firebase from 'react-native-firebase';

export default class TransItem extends React.PureComponent {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('trans');
    }
    deleteTrans(deleteItemId) {
        this.ref.doc(deleteItemId).delete().then(function() {
             alert("Deleted")
         }).catch(function(error) {
             alert("Error removing document: ", error);
         });
   
     }
    render() {
        return (
            <SwipeRow rightOpenValue={-80}>
                <View style={styles.standaloneRowBack}>
							<Text style={styles.backTextWhite}>Edit</Text>
                            <Button title="Delete" color="#FB3E44" onPress={() => this.deleteTrans(this.props.doc.id)}/>
				</View>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{this.props.title} ${this.props.amount} {this.props.date} {this.props.category}</Text>
                </View>
            </SwipeRow>
            

        );
    }
}


const styles = StyleSheet.create({
    item: {
        height: 50,
        backgroundColor: "#7ACCC7",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start'
    },
    itemText: {
        color: "#fff",
        fontSize: 15,
        padding: 30
    },
    standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#FB3E44',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 8
    },
    backTextWhite: {
		color: '#FFF'
	},
});