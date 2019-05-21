import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    ScrollView, 
    Button
} from "react-native";
import Modal from "react-native-modal";
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import firebase from 'react-native-firebase';

/*
    other import statements or 
    JS variables like const here - can be dummy data to use for development
*/
export default class Trans extends Component {
    constructor() {
      super();
      this.ref = firebase.firestore().collection('trans');
      this.state = {
        isModalVisible: false,
        title: '',
        amount: '',
        category: '',
        date: '',
      }
    }
    
    updateTransactionTitle(title) {
      this.setState({title: title })
    }

    updateTransactionAmount(amount) {
      this.setState({amount: amount})
    }

    updateTransactionCategory(category) {
      this.setState({category: category})
    }

    updateTransactionDate(date) {
      this.setState({date: date})
    }

    addTransaction() {
      this.ref.add({
        title: this.state.title,
        amount: this.state.amount,
        category: this.state.category,
        date: this.state.date
      });
      this.setState({
        title: '',
        amount: '',
        category: '',
        date: '',
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
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Transactions</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                </ScrollView>

                
                <View style = {styles.addButton}>
                  <Button title="Add transaction" onPress={() => this.toggleModal()} />
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
                          <Item>
                            <Input 
                              placeholder = "Amount"
                              value = {this.state.amount}
                              onChangeText={(text) => this.updateTransactionAmount(text)}
                            />
                          </Item>
                          <Item>
                            <Input 
                              placeholder = "Category"
                              value = {this.state.category}
                              onChangeText={(text) => this.updateTransactionCategory(text)}
                            />
                          </Item>
                          <Item>
                            <Input 
                              placeholder = "Date"
                              value = {this.state.date}
                              onChangeText={(text) => this.updateTransactionDate(text)}
                            />
                          </Item>
                        </Form>
                      </View>
                      
                    <Button 
                      title="Confirm" 
                      disabled={!this.state.title.length ||
                                !this.state.amount.length ||
                                !this.state.category.length ||
                                !this.state.date.length}
                      onPress={this.confirmButton}/>
                    <Button title="Cancel" onPress={() => this.toggleModal()} />
                      
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
    backgroundColor: "#E91E63",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 10,
    borderBottomColor: "#ddd",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    padding: 26,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
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
    top: 100,
    right: 40,
    backgroundColor: "#e91e63",
    width: 300,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 10,
  },
  addButtonWindow: {
    backgroundColor: "#00B386",
    borderRadius: 5,
  }
});
