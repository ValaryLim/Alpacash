import React from "react";
import { StyleSheet, View } from "react-native";
import { 
    VictoryLabel, VictoryPie, VictoryLine, VictoryChart, VictoryAxis, VictoryTooltip, VictoryScatter, VictoryGroup, VictorySharedEvents
} from "victory-native";
import { Svg, G } from "react-native-svg";
import firebase from 'react-native-firebase';

const categoryColors = {
    Work: "#7189BF",
    Allowance: "#DF7599",
};

export default class StatisticsIncome extends React.Component {
    constructor() {
        super();
        this.trans = firebase.firestore().collection('trans');
        this.income_categories = firebase.firestore().collection('income_categories');
        this.unsubscribe = null;

        this.state = {
            loading: true,
            data: []
        }
    }

    componentDidMount() {
        this.unsubscribe = this.trans.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const { amount, category, date, month, title, type } = doc.data();
          
          if (type == "income") {
            data.push({
                key: doc.id,
                doc, // DocumentSnapshot
                month,
                category,
                amount
              });
          }
        });
      
        this.setState({ 
          data,
          loading: false,
       });
    }

    getCategoryData() {
        const categoryAmount = this.getAmountData();

        // Get category data
        const categoryData = [];
        for (var key in categoryAmount) {
            cat = {};
            cat["category"] = key;
            cat["amount"] = categoryAmount[key];
            cat["fill"] = categoryColors[key];
            categoryData.push(cat);
        }
        return (categoryData);
    }

    getAmountData() {
        const categoryAmount = {};
        
        // For each trans recorded, add to category amount
        for (let i = 0; i < this.state.data.length; i++) {
            // Get category and amount
            var trans_cat = this.state.data[i]["category"];
            var trans_amount = this.state.data[i]["amount"];

            // If category not in categoryAmount ==> create new category, else, add to existing category
            if (!(trans_cat in categoryAmount)) {
                categoryAmount[trans_cat] = parseFloat(trans_amount);
            } else {
                var current_cat_amount = categoryAmount[trans_cat];
                categoryAmount[trans_cat] = current_cat_amount + parseFloat(trans_amount);
            }
        }

        return (categoryAmount);
    }


    render() {
        if (this.state.loading) {
            return null; // or render a loading icon
        }

        var categoryData = this.getCategoryData();

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
                        },
                        {
                            target: "labels",
                            eventHandlers: {
                                onPress: () => {
                                    return [
                                        {
                                            eventKey: "all",
                                            mutation: (props) => {
                                                const fontWeight = props.style && props.style.fontWeight;
                                                return {style: Object.assign({}, props.style, { fontWeight: "normal" }) };
                                            }
                                        },
                                        {
                                            mutation: (props) => {
                                                const fontWeight = props.style && props.style.fontWeight;
                                                return {style: Object.assign({}, props.style, { fontWeight: "bold" }) };
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