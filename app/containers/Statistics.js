import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLabel, VictoryPie, VictoryLine, VictoryChart } from "victory-native";
import Svg from "react-native-svg";
import NumberFormat from "react-number-format";

const categoryData = [
  { category: "Clothes", amount: 130.00, fill: "#7189BF" },
  { category: "Food", amount: 160.00, fill: "#DF7599" },
  { category: "Transport", amount: 142.00, fill: "#FFC785" },
  { category: "Bills", amount: 190.00, fill: "#72D6C9" }
];

const monthlyData = [
    { date: new Date(2018, 7, 1), amount: 600.00 }, 
    { date: new Date(2018, 8, 1), amount: 634.85 },
    { date: new Date(2018, 9, 1), amount: 520.00 },
    { date: new Date(2018, 10, 1), amount: 480.00 },
    { date: new Date(2018, 11, 1), amount: 620.00 },
    { date: new Date(2018, 12, 1), amount: 800.00 },
    { date: new Date(2019, 1, 1), amount: 480.00 },
    { date: new Date(2019, 2, 1), amount: 420.00 },
    { date: new Date(2019, 3, 1), amount: 500.00 },
    { date: new Date(2019, 4, 1), amount: 510.00 },
    { date: new Date(2019, 5, 1), amount: 507.50 },
    { date: new Date(2019, 6, 1), amount: 612.90 },
    { date: new Date(2019, 7, 1), amount: 370.10 }
];

export default class Statistics extends React.Component {
  render() {
    return (
        <Svg width={400} height={400} viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
            <VictoryChart>
                
            </VictoryChart>
            <VictoryPie
                name = "pie"
                standalone = { false }
                data= { categoryData }
                x = "category"
                y = "amount"
                labels = {(datum) => `${datum.category}: \n\$ ${d.amount.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
                labelRadius = { 80 }
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
                                },
                                // {
                                //     target: "all",
                                //     mutation: (props) => {
                                //         const fillOpacity = props.style && props.style.fillOpacity;
                                //         return {style: Object.assign({}, props.style, { fillOpacity: 0.5 }) };
                                //     }
                                // },
                                // {
                                //     target: "labels",
                                //     mutation: (props) => {
                                //         const fill = props.style && props.style.fill;
                                //         const fontWeight = props.style && props.style.fontWeight;
                                //         return fill === "#757575" ? { style: Object.assign({}, props.style, { fill: "#252525", fontWeight: "bold" })} :
                                //             {style: Object.assign({}, props.style, { fill: "#757575", fontWeight: "normal" })};
                                //     }
                                // }
                            ];
                        }
                    }
                },
                {
                    target: "labels",
                    eventHandlers: {
                        onPress: () => {
                            return [
                                {
                                    eventKey: "all",
                                    mutation: (props) => {
                                        const fill = props.style && props.style.fill;
                                        const fontWeight = props.style && props.style.fontWeight;
                                        return { style: Object.assign({}, props.style, { fill: "#757575", fontWeight: "normal" }) };
                                    }
                                },
                                {
                                    mutation: (props) => {
                                        const fill = props.style && props.style.fill;
                                        const fontWeight = props.style && props.style.fontWeight;
                                        return fill === "#757575" ? { style: Object.assign({}, props.style, { fill: "#252525", fontWeight: "bold" })} :
                                            { style: Object.assign({}, props.style, { fill: "#757575", fontWeight: "normal" }) }; 
                                    }
                                }
                            ];
                        }
                    }
                }
                ]}

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

            <VictoryChart
                //origin = {{x: 100, y: 200}} = try putting standalone = true
            >
                <VictoryLine
                    name = "line"
                    data = { monthlyData }
                    x = "date"
                    y = "amount"
                    labels = {(datum) => datum.amount}
                    labelComponent={<VictoryLabel renderInPortal dy={-10}/>}
                    style = {{
                        data: { stroke: "#252525" },
                        parent: { border: "1px solid #ccc" }
                    }}
                />
            </VictoryChart>
        </Svg>
        
    );
  }
}