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
    constructor(args = {level: 1}) {
        super();
        this.state = {
            level: args.level
        }
    }

    render() {
        return (
            <View>
                <Gestures
                    rotatable = {false}
                    scalable = {false} 
                    onEnd={(event, styles) => {
                        alert(event.nativeEvent.locationY);
                        this.props.mergeAlpacaChild(event.nativeEvent.locationX, event.nativeEvent.locationY);
                    }}    
                >
                    <Alpaca style = {{ overflow: "hidden" }} alpacaLevel = {"hi"}/>
                </Gestures>
            </View>
        );
    }
}