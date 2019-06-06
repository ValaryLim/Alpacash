import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLabel, VictoryPie } from "victory-native";
import Svg from "react-native-svg";
import NumberFormat from "react-number-format";

const categoryData = [
  { category: "Clothes", amount: 13000.00, fill: "#7189BF" },
  { category: "Food", amount: 16500.00, fill: "#DF7599" },
  { category: "Transport", amount: 14250.00, fill: "#FFC785" },
  { category: "Bills", amount: 19000.00, fill: "#72D6C9" }
];

export default class Statistics extends React.Component {
  render() {
    return (
        <Svg width={400} height={400} viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
            <VictoryPie
                standalone = { false }
                data= { categoryData }
                x = "category"
                y = "amount"
                labels = {(d) => `${d.category}: \n\$ ${d.amount.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
                labelRadius = { 80 }
                // Animate
                events={[{
                    target: "data",
                    eventHandlers: {
                        onPress: () => {
                            return [
                                // {
                                //     target: "all",
                                //     mutation: (props) => {
                                //         const fillOpacity = props.style && props.style.fillOpacity;
                                //         return {style: Object.assign({}, props.style, { fillOpacity: 0.5 }) };
                                //     }
                                // },
                                {
                                    target: "data",
                                    mutation: (props) => {
                                        const fillOpacity = props.style && props.style.fillOpacity;
                                        // Select if pie is unselected and unselect if pie is selected
                                        return fillOpacity === 0.5 ? { style: Object.assign({}, props.style, { fillOpacity: 1.0 }) } :
                                            {style: Object.assign({}, props.style, { fillOpacity: 0.5 }) };
                                    }
                                },
                                {
                                    target: "labels",
                                    mutation: (props) => {
                                        const fill = props.style && props.style.fill;
                                        const fontWeight = props.style && props.style.fontWeight;
                                        return fill === "#757575" ? { style: Object.assign({}, props.style, { fill: "#252525", fontWeight: "bold" })} :
                                            {style: Object.assign({}, props.style, { fill: "#757575", fontWeight: "normal" })};
                                    }
                                }
                            ];
                        }
                    }
                }]}

                // Style
                innerRadius = { 30 }
                radius = { 70 }
                padAngle = { 1.5 }
                style = {{
                    data: {
                        fill: (datum) => datum.fill,
                        fillOpacity: 0.5
                    },
                    labels: {
                        fontSize: 8,
                        fontWeight: "normal",
                        fill: "#757575"
                    }
                }}
            />
        </Svg>
        
    );
  }
}