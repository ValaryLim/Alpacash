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

        // Set state
        this.state = {
            faceLeft: true
        };
    }

    componentDidMount() {
        this.moveLeftAnimation();
    }

    flipImage() {
        this.setState({
           faceLeft: !this.state.faceLeft
         });
         this.state.faceLeft === true ? 
            this.moveLeftAnimation() : this.moveRightAnimation();
     }

    moveLeftAnimation() {
        // Generate random x and y values to move left
        var randomX = Math.floor(Math.random() * 100) + 1;
        var randomY = Math.floor(Math.random() * 200) + 1;

        // Generate random duration and pause
        var randomDuration = Math.floor(Math.random()*10000) + 8000;
        var randomPause = Math.floor(Math.random() * 20000);

        // Move left
        Animated.timing(this.moveValueHolder,
        {
            toValue: {x: randomX, y: randomY},
            duration: randomDuration,
            easing: Easing.linear
        }).start(() => setTimeout(() => this.flipImage(), randomPause));
    }

    moveRightAnimation() {
        // Generate random x and y values to move right
        var randomX = Math.floor(Math.random() * 100) + 100;
        var randomY = Math.floor(Math.random() * 200) + 1;

        // Generate random duration and pause
        var randomDuration = Math.floor(Math.random()*10000) + 8000;
        var randomPause = Math.floor(Math.random() * 20000);

        // Move right
        Animated.timing(this.moveValueHolder,
        {
            toValue: {x: randomX, y: randomY},
            duration: randomDuration,
            easing: Easing.linear
        }).start(() => setTimeout(() => this.flipImage(), randomPause));
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
                    source = {
                        this.state.faceLeft === true ?
                            require('../assets/images/alpacas/alpaca6.png') :
                            require('../assets/images/alpacas/alpaca6_flipped.png')
                    }
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
  