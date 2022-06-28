import React from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts";
import wordCloud from "highcharts/modules/wordcloud.js";
//import HighchartsReact from "./HighchartsReact.js";
import HighchartsReact from "highcharts-react-official";

wordCloud(Highcharts);

Highcharts.seriesTypes.wordcloud.prototype.deriveFontSize = function(
    relativeWeight
) {
    var maxFontSize = 25;
    // Will return a fontSize between 0px and 25px.
    return Math.floor(maxFontSize * relativeWeight);
};

export default class WordCountChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       // let data = //[{name: "A", weight: 100},{name: "Bbbbbbb", weight: 50}, {name: "CCCCCCCC", weight: 150}]
        const options = {
            chart: {
                type: 'wordcloud',
                height: this.props.options.height
            },
            title: {
                text: this.props.options.title
            },
            credits: {
                text: '© 2020-2021 AndroGraphic San Francisco State University All Rights Reserved'
            },

            series: [
                {
                    type: "wordcloud",
                    data: this.props.options.series
                }
            ]
        };

        return (
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        );
    }
}

