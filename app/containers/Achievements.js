import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default class Achievements extends Component {
  render() {
    const items = [
        { name: "Level 1", color: "#BBDED6", source: require("../assets/images/achievements/achieved/alpaca1_achieved.png") }, 
        { name: "Level 2", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca2_black.png") }, 
        { name: "Level 3", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca3_black.png") }, 
        { name: "Level 4", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca4_black.png") }, 
        { name: "Level 5", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca5_black.png") }, 
        { name: "Level 6", color: "#FFB6B9", source: require("../assets/images/achievements/unachieved/alpaca6_black.png") },
    ];

    return (
      <FlatGrid
        itemDimension={ 130 }
        items={ items }
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
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#DDD",
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 210,
  },
  image: {
      width: 170,
      height: 170,
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
