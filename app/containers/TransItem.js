import React, { Component } from 'react';
import {Button, 
        StyleSheet, 
        View, 
        Text} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';  
import firebase from 'react-native-firebase';
import moment from 'moment';

export default class TransItem extends React.PureComponent {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('trans');
        this.balance = firebase.firestore().collection('trans').doc('balance');
        this.budget = firebase.firestore().collection('budget');
        this.expense_categories = firebase.firestore().collection('expense_categories');
        this.income_categories = firebase.firestore().collection('income_categories');
        this.state = {
          categoriesEx: [],
          categoriesIn: [],
          loading: true,
          startWeek: moment().startOf('isoWeek').format("YYYY-MM-DD"),
          endWeek: moment().endOf('isoWeek').format("YYYY-MM-DD"),
        }
    }

    componentDidMount() {
      this.unsubscribe_expense= this.expense_categories.onSnapshot(this.onCollectionUpdateEx);
      this.unsubscribe_income= this.income_categories.onSnapshot(this.onCollectionUpdateIn);
    }
  
  componentWillUnmount() {
      this.unsubscribe_expense();
      this.unsubscribe_income();
  }

  onCollectionUpdateEx = (querySnapshot) => {
      const categoriesEx = [];
      querySnapshot.forEach((doc) => {
        const { id, title, checked, color, icon } = doc.data();
        
        categoriesEx.push({
          key: doc.id,
          doc, // DocumentSnapshot
          id,
          title,
          checked,
          color,
          icon
        });
      });
      this.setState({ 
        categoriesEx,
        loading: false
     });
  }

    onCollectionUpdateIn = (querySnapshot) => {
      const categoriesIn = [];
      querySnapshot.forEach((doc) => {
        const { id, title, checked, color, icon } = doc.data();
        
        categoriesIn.push({
          key: doc.id,
          doc, // DocumentSnapshot
          id,
          title,
          checked,
          color,
          icon
        });
      });
      this.setState({ 
        categoriesIn,
        loading: false
    });
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

    updateCurrentAmount(amount, docId) {
        firebase.firestore().runTransaction(async transaction => {
          const doc = await transaction.get(this.budget.doc(docId));
          if (!doc.exists) {
            transaction.set(this.budget.doc(docId), { currAmount: 0 });
            return 0;
          }
  
            const newAmount = doc.data().currAmount - parseInt(amount);
  
          transaction.update(this.budget.doc(docId), {
            currAmount: newAmount,
          });
          return newAmount;
        })
        .catch(error => {
          console.log('Transaction failed: ', error);
        });
      }
  
    updateBudget(amount, category) {
        this.budget.where('categories', 'array-contains', category).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              // Build doc ref from doc.id
              this.updateCurrentAmount(amount,doc.id);
              
          });
         })
      }

    deleteButton(amount, type, id, category, date) {
        this.updateBalanceWhenDelete(amount, type, date);
        if (type == 'expenditure' && 
              date <= this.state.startWeek &&
              date >= this.state.endWeek) {
          this.updateBudget(amount, category)
        }
        this.deleteTrans(id);
    }

    getCategoryIcon(type, title) {
      var icon;
      if (type == 'expenditure') {
      this.state.categoriesEx.map((cat) => {
        if(cat.title == title) {
          icon = cat.icon;
        }
      }); 
    } else {
      this.state.categoriesIn.map((cat) => {
        if(cat.title == title) {
          icon = cat.icon;
        }
      }); 
    }
      return icon;
    }

    getStyleSheet(income) {          
        return income? incomeStyle : expendStyle;   
    }

    getColor() {
      return income ? incomeStyle : expendStyle;   
    }

    render() {
        const styles = this.getStyleSheet(this.props.type == "income");
        return (
            <SwipeRow rightOpenValue={-80}>
                <View style={styles.standaloneRowBack}>
							    <Text style={styles.backTextWhite}>Edit</Text>
                  <Button title="Delete" color="#FB3E44" onPress={() => this.deleteButton(this.props.amount, this.props.type,this.props.doc.id, this.props.category, this.props.date)}/>
				        </View>
                <View style={styles.item}>
                  <View style = {styles.leftBox}>
                    <Icon size = {20} name={this.getCategoryIcon(this.props.type, this.props.category)} style = {styles.iconStyle}/>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                  </View>
                    <Text style={styles.amountText}> ${parseFloat(this.props.amount).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
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
   
    },
    leftBox: {
      flexDirection: 'row',
      width: '65%'
    },
    titleText: {
        color: "#fff",
        fontSize: 17,
        marginLeft: '5%',
    },
    amountText: {
      color: "#fff",
      fontSize: 17,
      alignSelf: 'flex-end' && 'center',
   

    },
    iconStyle: {
        marginLeft: '10%',
        color:"#fff",
        width: '5%'
     
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
    backgroundColor: "#F3C1C7",
    flexDirection: 'row',
    alignItems: 'center',
},
leftBox: {
  flexDirection: 'row',
  width: '65%'
},
titleText: {
    color: "#fff",
    fontSize: 17,
    marginLeft: '5%'
},
amountText: {
  color: "#fff",
  fontSize: 17,
  alignSelf: 'flex-end' && 'center',


},
iconStyle: {
    marginLeft: '10%',
    color:"#fff",
    width: "5%"
 
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

