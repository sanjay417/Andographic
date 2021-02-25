import React, {Component, useRef} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import More from 'highcharts/highcharts-more'
import drilldown from "highcharts/modules/drilldown.js";
import Boost from 'highcharts/modules/boost';
import BoostCanvas from 'highcharts/modules/boost-canvas';


if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

//More(Highcharts)
drilldown(Highcharts);
Boost(Highcharts);
BoostCanvas(Highcharts);


class BubbleChartBoostDrill extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            chart: "",
            width: "100%",
            lastColor: ""
        }

    }

    render(){
        let self = this;
        let configMap = {

            xAxis: {
                type: 'category'
            },

            chart: {
                //type: 'bubble',
                type: 'bubble',
                 zoomType: 'xy',
                //zoomType: 'xy',
                //height: this.props.options.height ? this.props.options.height : 400
            },
            //boost: { enabled: true },

            title: {
                text: this.props.options.title
            },
            series:  this.props.options.series,
            boost: {
                useGPUTranslations: true,
                usePreallocated: true
            },

          /*  plotOptions: {
                bubble: {
                    minSize: '30%',
                    maxSize: '500%',
                    zMin: 0,
                    //zMax: 10000,
                    sizeBy: "area",
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.01
                    },
                    title: {
                        text: this.props.options.title
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.name} : {point.y}'

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
                    },
                    point: {
                        events: {
                            click: function (e) {
                                let permissionName = e.point.name;
                                self.props.onClick(permissionName);

                            }
                        }
                    }
                }
            },*/

            /*drilldown: {
                series: [{
                    type: 'bubble',
                    id: 'Chrome',
                    data: [4, 3, 4, 5]
                }, {
                    type: 'packedbubble',
                    id: 'Firefox',
                    data: [2, 7]
                }]
            } //this.props.options.drilldown*/
        }

        return (
            <div>
                <HighchartsReact ref={this.state.chart} highcharts={Highcharts} options={configMap}/>
            </div>

        )
    }
}

export default BubbleChartBoostDrill;