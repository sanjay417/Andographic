import React, {Component, useRef} from 'react';
import HighchartsExporting from 'highcharts/modules/exporting';
import ReactHighcharts from 'react-highcharts';
import ReactHighmaps from 'react-highcharts/ReactHighmaps';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


class HeatMap extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            chart: "",
            width: "100%"
        }

    }

    render(){

        let configMap = {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },


            title: {
                text: this.props.options.title
            },

            xAxis: {
                categories: this.props.options.xAxis,//todo
                title: null,
                visible: true
            },

            yAxis: {
                categories: this.props.options.yAxis,//todo
                title: null,
                visible: true
            },

            colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[0]
            },

            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },
            exporting: {
                enabled: true, // hide button
            },
            credits: {
                text: '© 2020-2021 AndroGraphic San Francisco State University All Rights Reserved'
            },


            series: [{
                name: this.props.options.title,
                borderWidth: 1,
                data: this.props.options.series,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]

        }

        return (
            <div>
                <ReactHighmaps  config={configMap}/>
            </div>

        )
    }
}

export default HeatMap;

/*import React, {Component, useRef} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import Heatmap from 'highcharts/modules/heatmap.js';
if (typeof Highcharts === 'object') {
    Heatmap(Highcharts);
}


class HeatMap extends  Component{
    render(){
        let configMap = {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },


            title: {
                text: this.props.options.title
            },

            xAxis: {
                categories: this.props.options.xAxis,//todo
                title: null,
                visible: true
            },

            yAxis: {
                categories: this.props.options.yAxis,//todo
                title: null,
                visible: true
            },

            colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[0]
            },

            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },
            exporting: {
                enabled: true, // hide button
            },

            series: [{
                name: this.props.options.title,
                borderWidth: 1,
                data: this.props.options.series,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]

        }

        return (
            <div>
                <HighchartsReact ref={this.state.chart} highcharts={Highcharts} options={configMap}/>
            </div>
        )
    }
}

export default HeatMap;*/