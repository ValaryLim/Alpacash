import React, { Component } from "react";
import { 
    StyleSheet,
    FlatList,
    SectionList,
    View, 
    Text, 
    Image,
    Button,
    Dimensions
} from "react-native";
import { 
    Container,
    Content,
    Header,
    Form, 
    Item, 
    Input, 
    Picker as OptionPicker
} from 'native-base';
import Modal from "react-native-modal";
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import TransItem from './TransItem';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';



/*
    other import statements or 
    JS variables like const here - can be dummy data to use for development
*/
export default class Transactions extends Component {
    constructor() {
      super();
      this.ref = firebase.firestore().collection('trans');
      this.balance = firebase.firestore().collection('trans').doc('balance');
      this.budget = firebase.firestore().collection('budget');
      this.expense_categories = firebase.firestore().collection('expense_categories');
      this.income_categories = firebase.firestore().collection('income_categories');
      this.currBalance = null;
      this.unsubscribe = null;
      this.state = {
        isModalVisible: false,
        isDateTimePickerVisible: false,
        balance: 0,
        title: '',
        amount: '',
        category: 'Work',
        date: '',
        month:'',
        type: 'income',
        loading: true,
        trans: [],
        budget: [],
        expenseCategories: [],
        incomeCategories: [],
        headerDate: moment().startOf('isoWeek').format("YYYY-MM-DD"),
        startWeek: moment().startOf('isoWeek').format("YYYY-MM-DD"),
        endWeek: moment().endOf('isoWeek').format("YYYY-MM-DD")
      }
    }

    componentDidMount() {
      this.unsubscribe = this.ref
        .where('date', '>=', this.state.startWeek) 
        .where('date', '<=', this.state.endWeek).onSnapshot(this.onCollectionUpdate);
      this.unsubscribe_budget = this.budget.onSnapshot(this.onBudgetUpdate);
      this.unsubscribe_expense_categories = this.expense_categories.onSnapshot(this.onExCategoriesUpdate);
      this.unsubscribe_income_categoires = this.income_categories.onSnapshot(this.onInCategoriesUpdate);
      this.balance.onSnapshot((doc) => {
        const { total } = doc.data()
        this.setState ({
          balance: total
        });
      });
    }
  
    componentWillUnmount() {
      this.unsubscribe();
      this.unsubscribe_budget();
      this.unsubscribe_categories();
    }
    
    onSelectingDate(date) {
      this.unsubscribe = this.ref.where('date', '==', date).onSnapshot(this.onCollectionUpdate);
    }

    onSelectingWeek(date) {
      startOfWeek = moment(date, "YYYY-MM-DD").startOf('isoWeek').format('YYYY-MM-DD');
      endOfWeek = moment(date, "YYYY-MM-DD").endOf('isoWeek').format("YYYY-MM-DD");
      this.state.headerDate = startOfWeek;
      this.unsubscribe = this.ref.where('date', '>=', startOfWeek).where('date', '<=', endOfWeek).onSnapshot(this.onCollectionUpdate);
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

    onBudgetUpdate = (querySnapshot) => {
      const budget = [];
      querySnapshot.forEach((doc) => {
        const { categories, currAmount, amount } = doc.data();
        
        budget.push({
          key: doc.id,
          doc, // DocumentSnapshot
          categories,
          currAmount,
          amount
        });

      });
    
      this.setState({ 
        budget,
        loading: false,
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

    updateCurrentAmount(amount, docId) {
      firebase.firestore().runTransaction(async transaction => {
        const doc = await transaction.get(this.budget.doc(docId));
        if (!doc.exists) {
          transaction.set(this.budget.doc(docId), { currAmount: 0 });
          return 0;
        }

          const newAmount = doc.data().currAmount + parseInt(amount);

        transaction.update(this.budget.doc(docId), {
          currAmount: newAmount,
        });
        return newAmount;
      })
      .catch(error => {
        console.log('Transaction failed: ', error);
      });
    }

    updateBudget() {
      if (this.state.date >= this.state.startWeek && this.state.date <= this.state.endWeek) {
        this.state.budget.forEach((budget) => {
          budget.categories.forEach((cat) => {
            if (this.state.category == cat) {
              this.updateCurrentAmount(this.state.amount, budget.doc.id);
            }
          });
        });
      }
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

    generateSections(date) {
      const sections = [];
      var i;
      for (i = 0; i < 7; i++) {
        currDate = moment(date, 'YYYY-MM-DD').add(i, 'days')
        sections.push({
          title: currDate.format('LL'), 
          data: this.generateDayData(currDate.format('YYYY-MM-DD'))
        });
      }
      return sections;
    }

    generateDayData(date) {
      const data = [];
      this.state.trans.forEach((item) => {
        if(item.date == date) {
          data.push(item);
        }
      });
        return data;
      }
     

    addTransaction() {
      this.updateBalance(this.state.amount, this.state.type);
      this.updateBudget();
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
        category: 'Work',
        headerDate: moment(this.state.date, 'YYYY-MM-DD').startOf('isoWeek').format('YYYY-MM-DD'),
        date: '',
        type: 'income',
        month:''
      });
    }

    toggleModal() {
      this.setState({ isModalVisible: !this.state.isModalVisible });
    }
    
    confirmButton = () => {
      this.addTransaction();
      this.toggleModal();
      this.onSelectingWeek(this.state.headerDate);
    };

    render() {
      if (this.state.loading) {
        return null; // or render a loading icon
      }
        return (
            <View style = {styles.container}>
                  <View style = {styles.header}>
                    <CalendarStrip
                      style={{height:100, paddingTop: 20, paddingBottom: 10, width: '100%' }}
                      calendarHeaderStyle={{color: 'white', fontSize: 30, paddingBottom: 15, textTransform: "uppercase"}}
                      dateNumberStyle={{color: 'white'}}
                      dateNameStyle={{color: 'white'}}
                      selectedDate={this.state.headerDate}
                      onWeekChanged = {(date) => this.onSelectingWeek(date.format("YYYY-MM-DD"))}
                    />
                    <Text style = {styles.headerText}> balance: ${parseFloat(this.state.balance).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                  </View>

                <SectionList
                  renderItem={({item}) => <TransItem {...item}/>}
                  renderSectionHeader={({section: {title}}) => (
                    <View style = {styles.dateHeader}>
                      <Text style={styles.dateText}>{title}</Text>
                    </View>
                  )}
                  sections={this.generateSections(this.state.headerDate)}
                />
  
                {/* Add transactions popup window */}
                
                <View style = {styles.addButton}>
                  <Button title="Add transaction" color = "#F66A73" onPress={() => this.toggleModal()} />
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
                            <OptionPicker
                            mode="dropdown"
                            placeholder="Income/Expenditure"
                            selectedValue={this.state.type}
                            onValueChange={(value) => this.updateTransactionType(value)}>
                              <OptionPicker.Item label="   Income" value="income" />
                              <OptionPicker.Item label="   Expenditure" value="expenditure" />
                            </OptionPicker>
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
                          {this.state.type == "expenditure" ? (        
                           <OptionPicker
                              mode="dropdown"
                              placeholder="Category"
                              selectedValue={this.state.category}
                              onValueChange={(value) => this.updateTransactionCategory(value)}>   
                                {this.state.expenseCategories.map((cat) => { return (<OptionPicker.Item key = {cat.id} label={'  ' + cat.title} value={cat.title} />);})}
                              </OptionPicker> ) : 
                              (
                                <OptionPicker
                                  mode="dropdown"
                                  placeholder="Category"
                                  selectedValue={this.state.category}
                                  onValueChange={(value) => this.updateTransactionCategory(value)}>                
                                  {this.state.incomeCategories.map((cat) => { return (<OptionPicker.Item key = {cat.id} label={'  ' + cat.title} value={cat.title} />);})}
                              </OptionPicker>
                              )}
                          </Item>
                        </Form>
                        <DatePicker
                          style={{width: 200}}
                          date={this.state.date} //initial date from state
                          mode="date" //The enum of date, datetime and time
                          placeholder="Select Date"
                          format="YYYY-MM-DD"
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: 15
                            },
                            dateInput: {
                              marginLeft: 60,
                              fontSize: 30
                            }
                          }}
                          onDateChange={(date) => {this.updateTransactionDate(date)}}
                        />
                        <Button 
                          title="Confirm" 
                          disabled={!this.state.title.length ||
                                    !this.state.amount.length ||
                                    !this.state.date.length}
                          color="#00BDAA"
                          onPress={this.confirmButton}
                          />
                       <Button fontColor = 'black' color = "#F17E7E" title="Cancel" onPress={() => this.toggleModal()} />
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
    flexDirection:'column',
    borderBottomColor: "#ddd",
    height: '30%'
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
  dateHeader: {
    backgroundColor: '#5A6076',
    height: 40,
    justifyContent: 'center',
    marginTop: 5
  },
  dateText: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: '8%',
    textTransform: 'uppercase'
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 10,
  },
  addButtonWindow: {
    backgroundColor: "#fff",
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
