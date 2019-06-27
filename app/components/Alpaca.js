import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    ScrollView, 
    TouchableWithoutFeedback,
    Animated,
    Image,
    Easing,
    Dimensions,
    PanResponder
} from "react-native";

export default class Alpaca extends Component {
    constructor() {
        super();
        // Get dimensions of screen excluding bottom navigation
        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;
        this.halfScreenWidth = this.screenWidth / 2;

        // Generate random initial x and y values
        var initialX = Math.floor(Math.random() * this.halfScreenWidth) + this.halfScreenWidth - 50;
        var initialY = Math.floor(Math.random() * this.screenHeight/12);

        // Initialise value holders
        this.moveValueHolder = new Animated.ValueXY({x: initialX, y: initialY});
        this.flipValueHolder = new Animated.Value(0);

        // Set state
        this.state = {
            faceLeft: this.generateRandomInitialDirection(),
            pan: new Animated.ValueXY(),
            position: {x: initialX, y: initialY}
        };

        // Create draggable option
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove : (event, gesture) => {
                this.state.position.setValue({x: gesture.dx, y: gesture.dy});
            },
            onPanResponderRelease: (e, gesture) => {}
        });
    }

    generateRandomInitialDirection() {
        var direction = Math.random();
        return (direction < 0.5);
    }

    componentDidMount() {
        if (this.state.faceLeft) {
            this.moveLeftAnimation();
        } else {
            this.moveRightAnimation();
        }
    }

    flipImage() {
        this.setState({
           faceLeft: !this.state.faceLeft
         });
         this.state.faceLeft === true ? 
            this.moveLeftAnimation() : this.moveRightAnimation();
     }

    moveLeftAnimation = () => {
        // Generate random x and y values to move left
        var randomX = Math.floor(Math.random() * this.halfScreenWidth);
        var randomY = Math.floor(Math.random() * this.screenHeight / 12);

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

    moveRightAnimation = () => {
        // Generate random x and y values to move right
        var randomX = Math.floor(Math.random() * this.halfScreenWidth) + this.halfScreenWidth - 50;
        var randomY = Math.floor(Math.random() * this.screenHeight / 12);

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
        return(
            <View>
                <Animated.Image
                    {...this.panResponder.panHandlers} 
                    resizeMode = "contain"
                    source = {
                        // if left is true, face left, else face right
                        this.state.faceLeft === true ?
                            require('../assets/images/alpacas/alpaca6.png') :
                            require('../assets/images/alpacas/alpaca6_flipped.png')
                    }
                    style = {{ 
                        width: 42, 
                        height: 63,
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
        
    },
  });
  