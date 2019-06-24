import React from "react";
import { StyleSheet, View } from "react-native";
import { 
    VictoryLabel, VictoryPie, VictoryLine, VictoryChart, VictoryAxis, VictoryTooltip, VictoryScatter, VictoryGroup, VictorySharedEvents
} from "victory-native";
import { Svg, G } from "react-native-svg";
import NumberFormat from "react-number-format";

const categoryData = [
  { category: "Clothes", amount: 130.00, fill: "#7189BF" },
  { category: "Food", amount: 160.00, fill: "#DF7599" },
  { category: "Transport", amount: 142.00, fill: "#FFC785" },
  { category: "Bills", amount: 190.00, fill: "#72D6C9" }
];

export default class Statistics extends React.Component {
    render() {
        return (
            <Svg width={400} height={400} viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
                <VictoryPie
                    name = "pie"
                    standalone = { false }
                    data= { categoryData }
                    x = "category"
                    y = "amount"
                    labels = {(datum) => `${datum.category}: \n\$ ${datum.amount.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
                    
                    // Animate
                    events={[
                        {
                        target: "data",
                        eventHandlers: {
                            onPress: () => {
                                return [
                                    {
                                        eventKey: "all",
                                        mutation: (props) => {
                                            const fillOpacity = props.style && props.style.fillOpacity;
                                            return {style: Object.assign({}, props.style, { fillOpacity: 0.5 }) };
                                        }
                                    },
                                    {
                                        mutation: (props) => {
                                            const fillOpacity = props.style && props.style.fillOpacity;
                                            return {style: Object.assign({}, props.style, { fillOpacity: 1.0 }) }
                                        }
                                    }
                                ];
                            }
                        }
                        }
                    ]}

                    // Style
                    labelRadius = { 88 }
                    innerRadius = { 40 }
                    radius = { 80 }
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