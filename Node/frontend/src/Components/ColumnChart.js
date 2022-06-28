import React, {Component, useRef} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import Boost from "highcharts/modules/boost";

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

class ColumnChart extends  Component{

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
                    type: 'column',
                    height: this.props.options.height,
             /*       panning: true,
                    panKey: 'shift'*/
                },
                width: "800px",
                title: {
                    text: this.props.options.title
                },
                xAxis: {
                    categories: this.props.options.xAxis
                },
                yAxis: {
                    title: {text: "Count"},
                    allowDecimals: false
                },
                credits: {
                    text: '© 2020-2021 AndroGraphic San Francisco State University All Rights Reserved'
                },

                plotOptions: {
                        column: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        series: {
                            pointWidth: 50,
                            pointPadding: 0,
                            groupPadding: 0,
                            borderWidth: 0,
                            shadow: true
                        }
                    },
                    exporting: {
                        enabled: true, // hide button
                        chart: {
                            plotBackgroundText: "AndroGraphic"//'https://i.stack.imgur.com/E1r9X.png'
                        }
                    },
                    series: this.props.options.series,
                    legend: {
                        enabled: true
                    }

            }

        return (
            <div>
                <HighchartsReact ref={this.state.chart} highcharts={Highcharts} options={configMap}/>
            </div>

        )
    }
}

export default ColumnChart;