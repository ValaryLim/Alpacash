import React, { Component } from "react";

import { 
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity
} from "react-native";

import { 
    createStackNavigator, 
    createAppContainer } from 'react-navigation';

import Achievements from "./Achievements.js";
import EditCategories from "./EditCategories.js";

class SettingsScreen extends Component {
    render() {
        return(
            <View style = {styles.main}>
                <Text style = {styles.headerText}>Settings</Text>
                <View style = {styles.tabs}>
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress = {() => this.props.navigation.navigate('Achievements')}>
                        <Text style = {styles.text}>Achievements</Text>
                    </TouchableOpacity>
                    <View style = {styles.separator}></View>
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress = {() => this.props.navigation.navigate('EditCategories')}>
                        <Text style = {styles.text}>Edit Categories</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const RootStack = createStackNavigator(
    {
      Settings: SettingsScreen,
      Achievements: Achievements,
      EditCategories: EditCategories,
    },
    {
      initialRouteName: 'Settings',
    }
);
  
const AppContainer = createAppContainer(RootStack);

export default class Settings extends React.Component {
    render() {
      return <AppContainer />;
    }
}


/**
 * StyleSheet
 */
const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        backgroundColor: "#EAF5FF",
        textAlign: "center",
        textAlignVertical: "center",
        height: "20%",
        color: "#000"
    },
    separator: {
        height: 10,
        width: "100%"
    },
    tabs: {
        flex: 1,
        margin: 10,
        alignItems: "center",
    },
    button: {
        justifyContent: "center",
        padding: 10,
        height: "15%",
        width: "100%",
        backgroundColor: "#EAF5FF"
    },
    text: {
        fontSize: 20,
        color: "#000",
        marginLeft: 10,
    },
});
