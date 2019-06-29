import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableWithoutFeedback,
    Animated,
    Image,
    Easing,
    Dimensions,
    PanResponder
} from "react-native";

import Gestures from 'react-native-easy-gestures';

import Alpaca from "./Alpaca";

export default class MovableAlpaca extends Component {
    render() {
        return (
            <View>
                <Gestures
                    rotatable = {false}
                    scalable = {false} 
                >
                    <Alpaca/>
                </Gestures>
            </View>
        );
    }
}