import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';


export default class TransItem extends React.PureComponent {
    render() {
        return (
        
                <View style={styles.item}>
                    <Text style={styles.itemtext}>{this.props.title} ${this.props.amount} {this.props.date} {this.props.category}</Text>
                </View>
            

        );
    }
}


const styles = StyleSheet.create({
    item: {
        height: 50,
        backgroundColor: "#7ACCC7",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start'
    },
    itemtext: {
        color: "#fff",
        fontSize: 15,
        padding: 30
    }
});