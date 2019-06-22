import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableWithoutFeedback,
    Animated,
    Image,
    Easing
} from "react-native";

import Alpaca from "../components/Alpaca";

export default class Budget extends Component {
    render() {
        return (
            <View style = {styles.container} >
                <Alpaca/>
                <Alpaca/>
                <Alpaca/>
                <Alpaca/>
                <Alpaca/>
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
      backgroundColor: "#1EE3CF"
  },
});
