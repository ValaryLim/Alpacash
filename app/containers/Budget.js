import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    ScrollView, 
    TouchableWithoutFeedback,
    Animated,
    Image,
    Easing
} from "react-native";

export default class Budget extends Component {
    constructor() {
        super();
        this.moveLeftValueHolder = new Animated.ValueXY({x: 200, y: 200});
        this.flipValueHolder = new Animated.Value(0);
    }

    componentDidMount() {
        this._moveLeftAnimation();
    }

    _moveLeftAnimation() {
        Animated.timing(this.moveLeftValueHolder,
        {
            toValue: {x: 1, y: 10},
            duration: 10000,
            easing: Easing.linear
        }).start(()=>this._flipAnimation())
    }

    _flipAnimation() {
        if (this.flipValueHolder >= 90) {
            Animated.spring(
                this.flipValueHolder,
                {
                    toValue: 0,
                    tension: 10,
                    friction: 8
                }
            ).start();
        } else {
            Animated.spring(
                this.flipValueHolder,
                {
                    toValue: 180,
                    tension: 10,
                    friction: 8
                }
            ).start();
        }
    }
    
    render() {
        this.setFlipInterpolate = this.flipValueHolder.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })

        return(
            <View style = {styles.container} >
                <Animated.Image
                    source = {require('../assets/images/alpacas/alpaca1.png')}
                    style = {{ 
                        width: 50, 
                        height: 80,
                        transform: [{ rotateY: this.setFlipInterpolate }]}}
                />
                <Animated.Image
                    source = {require('../assets/images/alpacas/alpaca2.png')}
                    style = {{ 
                        width: 50, 
                        height: 75,
                        transform: this.moveLeftValueHolder.getTranslateTransform()
                        }}
                />
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
