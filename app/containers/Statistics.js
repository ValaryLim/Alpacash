import React, { Component } from "react";
import { StyleSheet, Text, ScrollView, View} from "react-native";

// import income and expense files
import StatisticsIncome from '../components/StatisticsIncome.js';
import StatisticsExpense from '../components/StatisticsExpense.js';

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view-forked'

export default class Statistics extends React.Component {
    render() {
        return (
            <ScrollableTabView
                style={styles.container}
                renderTabBar={() => <DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)'/>}
                tabBarTextStyle = {{fontSize: 20}}
            >
                <ScrollView tabLabel='Expenditure'>
                    <StatisticsExpense/>
                </ScrollView>
                    
                <ScrollView tabLabel='Income'>
                    <StatisticsIncome/>
                </ScrollView>
            </ScrollableTabView>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        height: 75,
        fontWeight: '600',
        textAlign: "center",
        textAlignVertical: "bottom",
        color: "#000000",
        padding: 10,
        backgroundColor: "white"
    },
    container: {
        backgroundColor: 'white',
        height: 100,
        paddingTop: 25
    }
});
