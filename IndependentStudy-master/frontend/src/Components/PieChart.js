import React, {Component, useRef} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


class PieChart extends  Component{

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
                    type: 'pie',
                    height: this.props.options.height
                },
               // width: "800px",
                title: {
                    text: this.props.options.title
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true
                        }
                    },
                    series: {
                        //pointWidth: 50,
                        pointPadding: 0,
                        groupPadding: 0,
                        borderWidth: 0,
                        shadow: true
                    }
                },

            credits: {
                text: '© 2020-2021 AndroGraphic San Francisco State University All Rights Reserved'
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

                <HighchartsReact ref={this.state.chart} highcharts={Highcharts} options={configMap} style={{height: "200px"}} />


        )
    }
}

export default PieChart;