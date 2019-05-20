import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    TextInput, 
    ScrollView, 
    TouchableOpacity,
} from "react-native";
/*
    other import statements or 
    JS variables like const here - can be dummy data to use for development
*/
export default class Settings extends Component {
    render() {
        return(
            <View>
                <Text>Settings</Text>
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
});
