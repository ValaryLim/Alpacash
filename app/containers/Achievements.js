import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { name: "Level 1", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca1_achieved.png") }, 
                { name: "Level 2", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca2_black.png") }, 
                { name: "Level 3", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca3_black.png") }, 
                { name: "Level 4", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca4_black.png") }, 
                { name: "Level 5", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca5_black.png") }, 
                { name: "Level 6", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca6_black.png") },
            ]
        }
    }

    achievedLevel1() {
        this.setState(
            {
                items: [
                    { name: "Level 1", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca1_achieved.png") }, 
                    { name: "Level 2", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca2_black.png") }, 
                    { name: "Level 3", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca3_black.png") }, 
                    { name: "Level 4", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca4_black.png") }, 
                    { name: "Level 5", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca5_black.png") }, 
                    { name: "Level 6", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca6_black.png") },
                ]
            }
        );
    }

    achievedLevel2() {
        this.setState(
            {
                items: [
                    { name: "Level 1", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca1_achieved.png") }, 
                    { name: "Level 2", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca2_achieved.png") }, 
                    { name: "Level 3", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca3_black.png") }, 
                    { name: "Level 4", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca4_black.png") }, 
                    { name: "Level 5", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca5_black.png") }, 
                    { name: "Level 6", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca6_black.png") },
                ]
            }
        );
    }

    achievedLevel3() {
        this.setState(
            {
                items: [
                    { name: "Level 1", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca1_achieved.png") }, 
                    { name: "Level 2", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca2_achieved.png") }, 
                    { name: "Level 3", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca3_achieved.png") }, 
                    { name: "Level 4", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca4_black.png") }, 
                    { name: "Level 5", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca5_black.png") }, 
                    { name: "Level 6", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca6_black.png") },
                ]
            }
        );
    }

    achievedLevel4() {
        this.setState(
            {
                items: [
                    { name: "Level 1", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca1_achieved.png") }, 
                    { name: "Level 2", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca2_achieved.png") }, 
                    { name: "Level 3", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca3_achieved.png") }, 
                    { name: "Level 4", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca4_achieved.png") }, 
                    { name: "Level 5", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca5_black.png") }, 
                    { name: "Level 6", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca6_black.png") },
                ]
            }
        );
    }

    achievedLevel5() {
        this.setState(
            {
                items: [
                    { name: "Level 1", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca1_achieved.png") }, 
                    { name: "Level 2", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca2_achieved.png") }, 
                    { name: "Level 3", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca3_achieved.png") }, 
                    { name: "Level 4", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca4_achieved.png") }, 
                    { name: "Level 5", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca5_achieved.png") }, 
                    { name: "Level 6", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca6_black.png") },
                ]
            }
        );
    }

    achievedLevel6() {
        this.setState(
            {
                items: [
                    { name: "Level 1", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca1_achieved.png") }, 
                    { name: "Level 2", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca2_achieved.png") }, 
                    { name: "Level 3", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca3_achieved.png") }, 
                    { name: "Level 4", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca4_achieved.png") }, 
                    { name: "Level 5", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca5_achieved.png") }, 
                    { name: "Level 6", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca6_achieved.png") },
                ]
            }
        );
    }

    render() {
        return (
            <View style = {styles.main }>
                <Text style = { styles.header }>ACHIEVEMENTS</Text>
                <FlatGrid
                    itemDimension={ 130 }
                    items={ this.state.items }
                    style={ styles.gridView }
                    renderItem={({ item, index }) => (
                    <View style={ styles.itemContainer }>
                        <Image style = { styles.image } source = { item.source }/>
                        <Text style = {[
                            styles.itemName,
                            { backgroundColor: item.color }
                        ]}> { item.name } </Text>
                    </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        fontSize: 30,
        height: 75,
        fontWeight: '600',
        textAlign: "center",
        textAlignVertical: "bottom",
        color: "#000000",
        padding: 10,
    },
    gridView: {
        marginTop: 20,
        flex: 1,
        backgroundColor: "#EAF5FF",
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        height: 235,
    },
    image: {
        width: 190,
        height: 190,
    },
    itemName: {
        fontSize: 12,
        color: "#000000",
        fontWeight: '400',
        textAlign: "center",
        textAlignVertical: "center",
        height: 30
    }
});
