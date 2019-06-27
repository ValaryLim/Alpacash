import React from "react";
import { StyleSheet, View } from "react-native";
import { 
    VictoryLabel, VictoryPie, VictoryLine, VictoryChart, VictoryAxis, VictoryTooltip, VictoryScatter, VictoryGroup, VictorySharedEvents
} from "victory-native";
import { Svg, G } from "react-native-svg";

const categoryData = [
  { category: "Part-Time Work", amount: 1800.00, fill: "#7189BF" },
  { category: "Allowance", amount: 500.00, fill: "#DF7599" }
];

export default class StatisticsIncome extends React.Component {
    render() {
        return (
            <Svg width={400} height={400} viewBox="-70 -10 400 400" style={{ width: "auto", height: "auto" }}>
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
                    labelRadius = { 95 }
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