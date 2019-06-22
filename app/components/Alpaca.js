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

export default class Alpaca extends Component {
    constructor() {
        super();
        // Generate random initial x and y values
        var initialX = Math.floor(Math.random() * 100) + 100;
        var initialY = Math.floor(Math.random() * 200) + 1;

        // Initialise value holders
        this.moveValueHolder = new Animated.ValueXY({x: initialX, y: initialY});
        this.flipValueHolder = new Animated.Value(0);
    }

    componentDidMount() {
        this.moveLeftAnimation();
    }

    moveLeftAnimation() {
        // Generate random x and y values to move left
        var randomX = Math.floor(Math.random() * 100) + 1;
        var randomY = Math.floor(Math.random() * 200) + 1;

        // Generate random duration
        var randomDuration = Math.floor(Math.random()*1000) + 9000;

        // Move left
        Animated.timing(this.moveValueHolder,
        {
            toValue: {x: randomX, y: randomY},
            duration: randomDuration,
            easing: Easing.linear
        }).start(() => this.moveRightAnimation())
    }

    moveRightAnimation() {
        // Generate random x and y values to move right
        var randomX = Math.floor(Math.random() * 100) + 100;
        var randomY = Math.floor(Math.random() * 200) + 1;

        // Generate random duration
        var randomDuration = Math.floor(Math.random() * 5000) + 5000;

        // Move right
        Animated.timing(this.moveValueHolder,
        {
            toValue: {x: randomX, y: randomY},
            duration: randomDuration,
            easing: Easing.linear
        }).start(() => this.moveLeftAnimation())
    }

    flipAnimation() {
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
        // Set flip interpolate
        this.setFlipInterpolate = this.flipValueHolder.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })

        return(
            <View style = {styles.container} >
                <Animated.Image
                    source = {require('../assets/images/alpacas/alpaca2.png')}
                    style = {{ 
                        width: 50, 
                        height: 75,
                        transform: this.moveValueHolder.getTranslateTransform()
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
  