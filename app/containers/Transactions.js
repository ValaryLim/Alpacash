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

/*
    other import statements or 
    JS variables like const here - can be dummy data to use for development
*/
export default class Trans extends Component {
    state = {
      isModalVisible: false
    };

    toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible });
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
                  <Button title="Add transaction" onPress={this.toggleModal} />
                  <Modal isVisible={this.state.isModalVisible}>
                
                      <View style = {styles.addButtonWindow}>
                        <Form>
                          <Item>
                            <Input placeholder = "Name"/>
                          </Item>
                          <Item>
                            <Input placeholder = "Amount"/>
                          </Item>
                          <Item>
                            <Input placeholder = "Category"/>
                          </Item>
                          <Item>
                            <Input placeholder = "Date"/>
                          </Item>
                        </Form>
                      </View>
                      
                    <Button title="Confirm" onPress={this.toggleModal} />
                    <Button title="Cancel" onPress={this.toggleModal} />
                      
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
