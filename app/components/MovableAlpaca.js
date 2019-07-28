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

import {createResponder} from "react-native-gesture-responder";

import Alpaca from "./Alpaca";

export default class MovableAlpaca extends Component {
    componentWillMount() {
        this.gestureResponder = createResponder({
            onStartShouldSetResponder: (evt, gestureState) => true,
            onStartShouldSetResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetResponder: (evt, gestureState) => true,
            onMoveShouldSetResponderCapture: (evt, gestureState) => true,
            onResponderGrant: (evt, gestureState) => {},
            onResponderMove: (evt, gestureState) => {},
            onResponderTerminationRequest: (evt, gestureState) => true,
            onResponderRelease: (evt, gestureState) => {},
            onResponderTerminate: (evt, gestureState) => {},
            
            onResponderSingleTapConfirmed: (evt, gestureState) => {},
            
            moveThreshold: 2,
            debug: false
        });
    }
    render() {
        return (
            <View>
                <Gestures
                    rotatable = {false}
                    scalable = {false} 
                    onEnd={(event, styles) => {
                        alert(this.myComponent.measure((fx, fy, width, height, px, py) => {
                            alert(py);
                        }));
                    }}    
                >
                    <Alpaca style = {{ overflow: "hidden" }} />
                </Gestures>
            </View>
        );
    }
}