import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Svg, G } from "react-native-svg";

// Import segment control tab
import SegmentedControlTab from 'react-native-segmented-control-tab';

// import income and expense files
import StatisticsIncome from '../components/StatisticsIncome.js';
import StatisticsExpense from '../components/StatisticsExpense.js';

export default class Statistics extends React.Component {
    constructor() {
        super();
        this.state = {
            customStyleIndex: 0
        }
    }

    handleCustomIndexSelect = (index) => {
        // handle tab selection
        this.setState(prevState => ({ ...prevState, customStyleIndex: index}));
    }

    render() {
        const { customStyleIndex } = this.state;

        return (
            <View style = {styles.container} >
                <SegmentedControlTab
                    values = {['Income', 'Expenditure']}
                    selectedIndex = {customStyleIndex}
                    onTabPress = {this.handleCustomIndexSelect}
                    borderRadius = {0}
                    tabsContainerStyle = {{height: 30, backgroundColor: '#DEDEDE'}}
                    tabStyle={{
                        backgroundColor: '#DEDEDE',
                        borderWidth: 5,
                        borderColor: 'transparent',
                    }}
                    activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
                    tabTextStyle={{ color: '#444444', fontSize: 12 }}
                    activeTabTextStyle={{ color: '#212121' }}
                />

                {customStyleIndex === 0 && (
                    <StatisticsIncome />
                )}
                {customStyleIndex === 1 && (
                    <StatisticsExpense />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white'
    }
});
