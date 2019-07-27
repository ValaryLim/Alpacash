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

import Help from "./Help.js";
import Achievements from "./Achievements.js";
import EditCategories from "./EditCategories.js";

class SettingsScreen extends Component {
    render() {
        return(
            <View style = {styles.main}>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => this.props.navigation.navigate('Achievements')}>
                    <Text>Achievements</Text>
                </TouchableOpacity>
                <View style = {styles.separator}></View>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => this.props.navigation.navigate('EditCategories')}>
                    <Text>Edit Categories</Text>
                </TouchableOpacity>
                <View style = {styles.separator}></View>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => this.props.navigation.navigate('Help')}>
                    <Text>Help</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const RootStack = createStackNavigator(
    {
      Settings: SettingsScreen,
      Achievements: Achievements,
      EditCategories: EditCategories,
      Help: Help
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
    separator: {
        height: 10,
        width: "100%"
    },
    main: {
        flex: 1,
        margin: 10,
        alignItems: "center",
        fontSize: 18
    },
    button: {
        justifyContent: "center",
        padding: 10,
        fontSize: 18,
        height: "15%",
        width: "100%",
        backgroundColor: "#DDD"
    }
});
