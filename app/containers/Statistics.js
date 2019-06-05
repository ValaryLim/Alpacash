import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from "victory-native";
import Svg from "react-native-svg";

const data = [
  { category: "clothes", amount: 13000, fill: "#7189BF" },
  { category: "food", amount: 16500, fill: "#DF7599" },
  { category: "transport", amount: 14250, fill: "#FFC785" },
  { category: "bills", amount: 19000, fill: "#72D6C9" }
];

export default class Statistics extends React.Component {
  render() {
    return (
        <Svg width={400} height={400} viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
            <VictoryPie
                standalone = { false }
                data= { data }
                padAngle = { 1.5 }
                x = "category"
                y = "amount"
                
                // Animate
                events={[{
                    target: "data",
                    eventHandlers: {
                        onPress: () => {
                            return [
                                {
                                    target: "data",
                                    mutation: (props) => {
                                        const fillOpacity = props.style && props.style.fillOpacity;
                                        // Select if pie is unselected and unselect if pie is selected
                                        return fillOpacity === 0.7 ? { style: Object.assign({}, props.style, { fillOpacity: 1.0 }) } :
                                            {style: Object.assign({}, props.style, { fillOpacity: 0.7 }) };
                                    }
                                }
                            ];
                        }
                    }
                }]}

                // Style
                innerRadius = { 40 }
                style = {{
                    data: {
                        fill: (datum) => datum.fill,
                        fillOpacity: 0.7
                    },
                    labels: {
                        fontSize: 13
                    }
                }}
            />
        </Svg>
        
    );
  }
}