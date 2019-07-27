import React, { Component } from "react";

import { 
    StyleSheet,
    View, 
    Text
} from "react-native";

export default class Achievements extends Component {
    render() {
        return(
            <View style = {styles.main}>
                <Text>Edit Categories Screen</Text>
            </View>
        );
    }
}

/**
 * StyleSheet
 */
const styles = StyleSheet.create({
    separator: {
        height: 30,
        width: "100%"
    },
    main: {
        justifyContent: "center",
        flex: 1,
        margin: 10
    },
    button: {
        padding: 10,
        fontSize: 18,
        height: 40
    }
});
