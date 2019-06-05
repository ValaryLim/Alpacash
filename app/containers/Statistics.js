import React, { Component } from "react";
import { 
    StyleSheet,
    View, 
    Text, 
    TextInput, 
    ScrollView, 
    TouchableWithoutFeedback,
    ART
} from "react-native";

import * as d3 from "d3";

const { Surface, Group, Shape } = ART;

// data represents the distribution of spendings in a month
const userPurchases = [
    {
      itemName: 'Mountain Dew',
      price: 3
    },
    {
      itemName: 'Shoes',
      price: 50
    },
    {
      itemName: 'Kit Kat',
      price: 1
    },
    {
      itemName: 'Taxi',
      price: 24
    },
    {
      itemName: 'Watch',
      price: 100
    },
    {
      itemName: 'Headphones',
      price: 15
    },
    {
      itemName: 'Wine',
      price: 16
    }
  ]

export default class Statistics extends Component {
    constructor(props) {
        super(props);
        
        // Built-in Colors
        const colors = d3.schemePastel2;
    }
    render() {
        // Get angles for each slice of the donut chart
        const sectionAngles = d3.pie().value(d => d.price)(userPurchases);

        // Generate an SVG path based on chart's height and width
        const path = d3.arc()
            .outerRadius(100)
            .padAngle(0.02)
            .innerRadius(0.60)

        // Height and width of chart
        const width = 250;
        const height  = 250;

        return(
            <Surface width={width} height={height}>
                <Group x={width/2} y={height/2}>
                    {
                        sectionAngles.map(section => (
                            <Shape
                                key = {section.index}
                                d = {path(section)}
                                stroke = "#fff"
                                fill = {this.props.colors}
                                strokeWidth = {1}
                            />
                        ))
                    }
                </Group>
            </Surface>
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
