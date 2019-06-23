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
        this.balance = firebase.firestore().collection('trans').doc('balance');
    }

    deleteTrans(deleteItemId) {
        this.ref.doc(deleteItemId).delete().then(function() {
             alert("Deleted")
         }).catch(function(error) {
             alert("Error removing document: ", error);
         });
     }

     updateBalanceWhenDelete(amount, type) {
        firebase.firestore().runTransaction(async transaction => {
          const doc = await transaction.get(this.balance);
          if (!doc.exists) {
            transaction.set(this.balance, { total: 0 });
            return 0;
          }
  
            const newBalance = type == "expenditure" 
                  ? doc.data().total + parseInt(amount)
                  :  type == "income"
                        ? doc.data().total - parseInt(amount)
                        : doc.data().total;
  
          transaction.update(this.balance, {
            total: newBalance,
          });
          return newBalance;
        })
        .catch(error => {
          console.log('Transaction failed: ', error);
        });
      }
    
    deleteButton(amount, type, id) {
        this.updateBalanceWhenDelete(amount, type);
        this.deleteTrans(id);
    }

    getStyleSheet(income) {          
        return income? incomeStyle : expendStyle;   
    }

    render() {
        const styles = this.getStyleSheet(this.props.type == "income");
        return (
            <SwipeRow rightOpenValue={-80}>
                <View style={styles.standaloneRowBack}>
							<Text style={styles.backTextWhite}>Edit</Text>
                            <Button title="Delete" color="#FB3E44" onPress={() => this.deleteButton(this.props.amount, this.props.type,this.props.doc.id)}/>
				</View>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{this.props.title} ${this.props.amount} {this.props.date} {this.props.category}</Text>
                </View>
            </SwipeRow>
            

        );
    }
}


const incomeStyle = StyleSheet.create({
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

const expendStyle = StyleSheet.create({
    item: {
        height: 50,
        backgroundColor: "#F3C1C6",
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

