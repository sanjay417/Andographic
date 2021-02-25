import React, {Component, useRef} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import More from 'highcharts/highcharts-more'



if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

More(Highcharts)

class BubbleChart extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            chart: "",
            width: "100%"
        }

    }

    render(){

        let configMap = {
            xAxis: {
                type: 'category'
            },

            chart: {
                type: 'packedbubble',
                height: this.props.options.height ? this.props.options.height : 400
            },
            title: {
                text: this.props.options.title
            },

            series:  this.props.options.series,
            credits: {
                text: '© 2020-2021 AndroGraphic San Francisco State University All Rights Reserved'
            },

            plotOptions: {
                packedbubble: {
                    minSize: '10%',
                    maxSize: '100%',
                    zMin: 0,
                    //zMax: 10000,
                   // sizeBy: "area",
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.01
                    },
                    title: {
                        text: this.props.options.title
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: this.props.options.labelLimit != undefined ? this.props.options.labelLimit : 100
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            }
        }

        return (
            <div>
                <HighchartsReact ref={this.state.chart} highcharts={Highcharts} options={configMap}/>
            </div>

        )
    }
}

export default BubbleChart;