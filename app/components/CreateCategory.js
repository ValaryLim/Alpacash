import React, { Component } from "react";

import { 
    StyleSheet,
    View, 
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

import { Button } from 'native-base';

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view-forked'
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';


class CreateCategoryIn extends Component {
    constructor() {
        super();
        this.income_categories = firebase.firestore().collection('income_categories');
        this.unsubscribe_income_categories = null;
        this.state = {
            loading: true,
            incomeCategories: [],
            id: 0,
            iconName: '',
            icons: [
                {'id': 1, name: "ticket-alt"}, 
                {'id': 2, name: "bolt"}, 
                {'id': 3, name: "shopping-bag"}, 
                {'id': 4, name: "bus"}, 
                {'id': 5, name: "car"}, 
                {'id': 6, name: "utensils"},
                {'id': 7, name: "wallet"}, 
                {'id': 8, name: "briefcase"},
                {'id': 9, name: "home"},
                {'id': 10, name: "tshirt"},
                {'id': 11, name: "gift"}, 
                {'id': 12, name: "book"},
                {'id': 13, name: "heartbeat"},
                {'id': 14, name: "desktop"},
                {'id': 15, name: "dog"},
                {'id': 16, name: "plane"},
                {'id': 17, name: "coffee"},
                {'id': 6, name: "beer"}],
            title: "",
        }
    }

    componentDidMount() {
        this.unsubscribe_income_categories = this.income_categories.orderBy('id').onSnapshot(this.onInCategoriesUpdate);
    }
    
    componentWillUnmount() {
        this.unsubscribe_income_categories();
    }

    onInCategoriesUpdate = (querySnapshot) => {
        const incomeCategories = [];
        querySnapshot.forEach((doc) => {
          const { id, title, checked, icon, color } = doc.data();
          
          incomeCategories.push({
            key: doc.id,
            doc, // DocumentSnapshot
            id,
            title,
            icon,
            checked,
            color
          });
        });
        this.setState({ 
          incomeCategories,
          loading: false
       });
       this.setState({
           id: parseInt(incomeCategories[incomeCategories.length-1].id) + 1
       })
     }

    updateCategoryTitle(title) {
        this.setState({title: title})
    }

    updateIconName(name) {
        this.setState({iconName: name})
    }

    updateIconStyles(name) {
        for (let i = 0; i < this.state.icons.length; i++) {
            if (this.state.icons[i]["name"] === name) {
                const iconsUpdate = this.state.icons;
                iconsUpdate[i].selected = true;

                this.setState({
                    icons: iconsUpdate
                });
            } else {
                const iconsUpdate = this.state.icons;
                iconsUpdate[i].selected = false;

                this.setState({
                    icons: iconsUpdate
                });
            }
        }
    }

    updateIcons(name) {
        this.updateIconName(name);
        this.updateIconStyles(name);
    }
    
    confirmCategory() {
        this.income_categories.add({
            checked: false,
            color: "#FFFFFF",
            icon: this.state.iconName,
            id: this.state.id,
            title: this.state.title
        }),
        this.setState({
            title: '',
            id: this.state.id+1,
            iconName: '',
          })
          this.props.toggleModalChild();
    }

    render() {
        return(      
          <View style = {styles.container}>
              <View style = {styles.header}>
                <TextInput style = {styles.categoryTitle}
                    placeholder='Enter category title'
                    placeholderTextColor = 'white'
                    autoCapitalize = 'characters'
                    underlineColorAndroid = 'transparent'
                    onChangeText = {(text) => this.updateCategoryTitle(text)}
                    maxLength = {20}
                />
                </View>
                <View style = {styles.iconBox}>
                    {this.state.icons.map((icon, index) => {return(
                        <TouchableOpacity 
                            key = { "I" + icon.id}
                            style = { styles.iconButton } 
                            onPress = {() => this.updateIcons(icon.name)}>
                            <Icon 
                                size = {10} 
                                name= {icon.name} 
                                style = {
                                    icon.selected === true ? styles.iconSelected : styles.iconUnselected
                                }
                            />
                        </TouchableOpacity>
                            )
                    })}
                </View>
                <View style = {styles.footer}>
                  <Button rounded success 
                    style = {styles.confirmButton}
                    onPress = {() => this.confirmCategory()}> 
                    <Text> Confirm</Text>
                  </Button>
                  <Button rounded danger
                    style = {styles.confirmButton}
                    onPress = {() => this.props.toggleModalChild()}>
                    <Text> Delete </Text>
                  </Button>
                </View>
              </View>
        );
    }
}


export default class CreateCategoryEx extends Component {
    constructor() {
        super();
        this.expense_categories = firebase.firestore().collection('expense_categories');
        this.unsubscribe_expense_categories = null;
        this.state = {
            loading: true,
            expenseCategories: [],
            id: 0,
            iconName: '',
            icons: [
                {'id': 1, name: "ticket-alt", selected: false}, 
                {'id': 2, name: "bolt", selected: false}, 
                {'id': 3, name: "shopping-bag", selected: false}, 
                {'id': 4, name: "bus", selected: false}, 
                {'id': 5, name: "car", selected: false}, 
                {'id': 6, name: "utensils", selected: false},
                {'id': 7, name: "wallet", selected: false}, 
                {'id': 8, name: "briefcase", selected: false},
                {'id': 9, name: "home", selected: false},
                {'id': 10, name: "tshirt", selected: false},
                {'id': 11, name: "gift", selected: false}, 
                {'id': 12, name: "book", selected: false},
                {'id': 13, name: "heartbeat", selected: false},
                {'id': 14, name: "desktop", selected: false},
                {'id': 15, name: "dog", selected: false},
                {'id': 16, name: "plane", selected: false},
                {'id': 17, name: "coffee", selected: false},
                {'id': 6, name: "beer", selected:false}],
            title: "",
        }
    }

    componentDidMount() {
        this.unsubscribe_expense_categories = this.expense_categories.orderBy('id').onSnapshot(this.onExCategoriesUpdate);
    }
    
    componentWillUnmount() {
        this.unsubscribe_expense_categories();
    }

    onExCategoriesUpdate = (querySnapshot) => {
        const expenseCategories = [];
        querySnapshot.forEach((doc) => {
          const { id, title, checked, icon, color } = doc.data();
          
          expenseCategories.push({
            key: doc.id,
            doc, // DocumentSnapshot
            id,
            title,
            icon,
            checked,
            color
          });
        });
        this.setState({ 
          expenseCategories,
          loading: false
       });
       this.setState({
           id: parseInt(expenseCategories[expenseCategories.length-1].id) + 1
       })
     }

    updateCategoryTitle(title) {
        this.setState({title: title})
    }

    updateIconName(name) {
        this.setState({iconName: name})
    }

    confirmCategory() {
        this.expense_categories.add({
            checked: false,
            color: "#FFFFFF",
            icon: this.state.iconName,
            id: this.state.id,
            title: this.state.title
        }),
        this.setState({
            title: '',
            id: this.state.id+1,
            iconName: '',
          })
          this.props.toggleModalChild();
    }

    updateIconStyles(name) {
        for (let i = 0; i < this.state.icons.length; i++) {
            if (this.state.icons[i]["name"] === name) {
                const iconsUpdate = this.state.icons;
                iconsUpdate[i].selected = true;

                this.setState({
                    icons: iconsUpdate
                });
            } else {
                const iconsUpdate = this.state.icons;
                iconsUpdate[i].selected = false;

                this.setState({
                    icons: iconsUpdate
                });
            }
        }
    }

    updateIcons(name) {
        this.updateIconName(name);
        this.updateIconStyles(name);
    }

    render() {
        return(      
          <View style = {styles.container}>
              <View style = {styles.header}>
                <TextInput style = {styles.categoryTitle}
                    placeholder='Enter category title'
                    placeholderTextColor = 'white'
                    autoCapitalize = 'characters'
                    underlineColorAndroid = 'transparent'
                    onChangeText = {(text) => this.updateCategoryTitle(text)}
                    maxLength = {20}
                />
                </View>
                <View style = {styles.iconBox}>
                    {this.state.icons.map((icon, index) => {return(
                        <TouchableOpacity 
                            key = { "E" + icon.id }
                            style = { styles.iconButton } 
                            onPress = {() => this.updateIcons(icon.name)}>
                            <Icon 
                                size = {10} 
                                name= {icon.name} 
                                style = {
                                    icon.selected === true ? styles.iconSelected : styles.iconUnselected
                                }
                            />
                        </TouchableOpacity>
                            )
                    })}
                </View>
                <View style = {styles.footer}>
                  <Button rounded success 
                    style = {styles.confirmButton}
                    onPress = {() => this.confirmCategory()}> 
                    <Text> Confirm</Text>
                  </Button>
                  <Button rounded danger
                    style = {styles.confirmButton}
                    onPress = {() => this.props.toggleModalChild()}>
                    <Text> Delete </Text>
                  </Button>
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
        justifyContent: "center",
        margin: 10,
        height: "60%"
    },
    header: {
        backgroundColor: "#F66A73",
        height: '30%',
        alignItems: 'center'
      },
      footer: {
        backgroundColor: "#fff",
        height: '20%',
        justifyContent: 'space-between',
        flexDirection: 'row'
      },
    item: {
        height: 70,
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconUnselected: {
        color: "white",
        width: "100%",
        fontSize: 20,
        marginLeft: 15,
    },
    iconSelected: {
        color: "black",
        width: "100%",
        fontSize: 20,
        marginLeft: 15,
    },
    iconBox: {
        flexDirection: 'row',
        backgroundColor: "#F66A73",
        flexWrap: 'wrap',
        justifyContent: "center",
        flex: 1,
    },
    iconButton: {
        height: 50,
        width: 50
    },
    categoryTitle: {
        color: "white",
        fontSize: 30,
    },
    confirmButton: {
        width: 100,
        justifyContent: 'center',
        marginLeft: '10%',
        marginRight: '10%'
      }
});
