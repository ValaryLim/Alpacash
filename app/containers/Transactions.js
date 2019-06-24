import React, { Component } from "react";
import { 
    StyleSheet,
    FlatList,
    View, 
    Text, 
    Image,
    Button,
    TouchableHighlight
} from "react-native";
import { 
    Container,
    Content,
    Header,
    Form, 
    Item, 
    Input, 
    Picker
} from 'native-base';
import Modal from "react-native-modal";
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import TransItem from './TransItem';
import { ScrollView } from "react-native-gesture-handler";

/*
    other import statements or 
    JS variables like const here - can be dummy data to use for development
*/
export default class Transactions extends Component {
    constructor() {
      super();
      this.ref = firebase.firestore().collection('trans');
      this.balance = firebase.firestore().collection('trans').doc('balance');
      this.currBalance = null;
      this.unsubscribe = null;
      this.state = {
        isModalVisible: false,
        isDateTimePickerVisible: false,
        balance: 0,
        title: '',
        amount: '',
        category: '',
        date: '',
        month:'',
        type: 'income',
        loading: true,
        trans: [],
        headerDate: moment()
      }
    }

    componentDidMount() {
      this.unsubscribe = this.ref.where('date', '==', moment().format("DD-MM-YYYY")).onSnapshot(this.onCollectionUpdate);
      this.balance.onSnapshot((doc) => {
        const { total } = doc.data()
        this.setState ({
          balance: total
        });
      });
    }
  
    componentWillUnmount() {
      this.unsubscribe();
    }
    
    onSelectingDate(date) {
      this.unsubscribe = this.ref.where('date', '==', date).onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (querySnapshot) => {
      const trans = [];
      querySnapshot.forEach((doc) => {
        const { title, amount, category, date, type } = doc.data();
        
        trans.push({
          key: doc.id,
          doc, // DocumentSnapshot
          title,
          amount,
          category,
          date,
          type
        });
      });
    
      this.setState({ 
        trans,
        loading: false,
     });
    }
    
    updateBalance(amount, type) {
      firebase.firestore().runTransaction(async transaction => {
        const doc = await transaction.get(this.balance);
        if (!doc.exists) {
          transaction.set(this.balance, { total: 0 });
          return 0;
        }

          const newBalance = type == "expenditure" 
                ? doc.data().total - parseInt(amount)
                :  type == "income"
                      ? doc.data().total + parseInt(amount)
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

    updateTransactionTitle(title) {
      this.setState({title: title})
    }

    updateTransactionAmount(amount) {
      this.setState({amount: amount})
    }

    updateTransactionCategory(category) {
      this.setState({category: category})
    }

    updateTransactionDate(date) {
      splitDate = String(date).split('-');
      this.setState({
        date: date,
        month: splitDate[1],
        headerDate: date})
    }

    updateTransactionType(type) {
      this.setState({type: type})
    }

    

    addTransaction() {
      this.updateBalance(this.state.amount, this.state.type);
      this.ref.add({
        title: this.state.title,
        amount: this.state.amount,
        category: this.state.category,
        date: this.state.date,
        type: this.state.type,
        month: this.state.month
      });
      this.setState({
        title: '',
        amount: '',
        category: '',
        date: '',
        type: 'income',
        month:''
      });
    }

    toggleModal() {
      this.setState({ isModalVisible: !this.state.isModalVisible });
    }
    
    confirmButton = () => {
      this.toggleModal();
      this.addTransaction();
    };

    render() {
      if (this.state.loading) {
        return null; // or render a loading icon
      }

        return (
            <View>
                <View style={styles.header}>
                    <CalendarStrip
                      style={{height:100, paddingTop: 20, paddingBottom: 10, width: 400 }}
                      calendarHeaderStyle={{color: 'white', fontSize: 30, paddingBottom: 15, textTransform: "uppercase"}}
                      dateNumberStyle={{color: 'white'}}
                      dateNameStyle={{color: 'white'}}
                      selectedDate={this.state.headerDate}
                      onDateSelected = {(date) => this.onSelectingDate(date.format("DD-MM-YYYY"))}
                    />
                    <Text style = {styles.headerText}> balance: ${this.state.balance}</Text>
                </View>
            

                
    
                <FlatList
                  data={this.state.trans}
                  renderItem={({ item }) => <TransItem {...item}/>}
                />

                {/* Add transactions popup window */}
                <View style = {styles.addButton}>
                  <Button title="Add transaction" color = "#7ACCC7" onPress={() => this.toggleModal()} />
                  <Modal isVisible={this.state.isModalVisible}>
                
                      <View style = {styles.addButtonWindow}>
                        <Form>
                          <Item>
                            <Input 
                              placeholder = "Title"
                              value = {this.state.title}
                              onChangeText={(text) => this.updateTransactionTitle(text)}
                            />
                          </Item>
                          <Item picker>
                            <Picker
                            mode="dropdown"
                            placeholder="Income/Expenditure"
                            selectedValue={this.state.type}
                            onValueChange={(value) => this.updateTransactionType(value)}>
                              <Picker.Item label="Income" value="income" />
                              <Picker.Item label="Expenditure" value="expenditure" />
                            </Picker>
                          </Item>
                          <Item>
                            <Input 
                              placeholder = "Amount"
                              keyboardType = 'numeric'
                              value = {this.state.amount}
                              onChangeText={(text) => this.updateTransactionAmount(text)}
                            />
                          </Item>
                          <Item picker>
                           <Picker
                              mode="dropdown"
                              placeholder="Category"
                              selectedValue={this.state.category}
                              onValueChange={(value) => this.updateTransactionCategory(value)}>
                                <Picker.Item label="Food" value="food" />
                                <Picker.Item label="Shopping" value="shopping"/>
                                <Picker.Item label="Entertainment" value ="entertainment"/>
                                <Picker.Item label="Transport" value ="transport"/>
                                <Picker.Item label="Utilities" value ="utilities"/>
                              </Picker>
                          </Item>
                        </Form>
                        <DatePicker
                          style={{width: 200}}
                          date={this.state.date} //initial date from state
                          mode="date" //The enum of date, datetime and time
                          placeholder="Select Date"
                          format="DD-MM-YYYY"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: 10
                            },
                            dateInput: {
                              marginLeft: 36,
                              fontSize: 30
                            }
                          }}
                          onDateChange={(date) => {this.updateTransactionDate(date)}}
                        />
                        <Button 
                          title="Confirm" 
                          disabled={!this.state.title.length ||
                                    !this.state.amount.length ||
                                    !this.state.category.length ||
                                    !this.state.date.length}
                          onPress={this.confirmButton}/>
                       <Button title="Cancel" onPress={() => this.toggleModal()} />
                        </View>
                      
                    
                      
                  </Modal>
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
    backgroundColor: "#7ACCC7",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 10,
    borderBottomColor: "#ddd",
  },
  headerText: {
    color: "white",
    fontSize: 15,
    padding: 15,
  },
  scrollContainer: {
    marginTop: 50
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: "stretch",
    color: "#fff",
    padding: 20,
    backgroundColor: "#252525",
    borderTopWidth: 2,
    borderTopColor: "#ededed",
  },
  addButton: {
    position: "absolute",
    zIndex: 11,
    top: 450,
    right: 20,
    backgroundColor: "#7ACCC7",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 10,
  },
  addButtonWindow: {
    backgroundColor: "#F66A73",
    borderRadius: 10,
    width: 300,
    position: "relative",
    marginLeft: 25,
  },
  rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  rowButton: {
    backgroundColor: '#3f002d'
  },
});
