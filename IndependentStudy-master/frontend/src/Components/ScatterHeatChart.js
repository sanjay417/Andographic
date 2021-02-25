import React, {Component, useRef} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import More from 'highcharts/highcharts-more'
import Boost from 'highcharts/modules/boost';
import drilldown from "highcharts/modules/drilldown.js";
import {Button} from "@material-ui/core";
import cloneDeep from 'lodash/cloneDeep';



if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


drilldown(Highcharts);
Boost(Highcharts);
More(Highcharts)

class ScatterHeatChart extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            chart: "",
            width: "100%",
            data: [],
            allData: [],
            Highcharts: ""
        }

    }

 componentDidMount() {
     this.setState({ Highcharts: cloneDeep(Highcharts) })

 }

   /* reset(){
       // this.setState({data:  this.state.allData});
        this.props.onReset();
    }*/

    filterData(genre){
        let filteredData = this.state.data.filter(function (data) {
            return data.name == genre;
        })
        this.setState({data:  filteredData});
    }

    render(){

        let self = this;

        if( this.props.options.series.length != 0 && this.state.data.length == []){
            this.setState({data:  this.props.options.series});
            this.setState({allData:  this.props.options.series});
        }


        let configMap = {
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                height: 600
            },
            title: {
                text: this.props.options.title
            },

            xAxis: {
                title: {
                    enabled: true,
                    text: this.props.options.titleX
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: this.props.options.titleY
                }
            },

            credits: {
                text: '© 2020-2021 AndroGraphic San Francisco State University All Rights Reserved'
            },
            /* legend: {
                  layout: 'veritical',
                  align: 'left',
                  verticalAlign: 'bottom',
                  x: 50,
                  y: 600,
                  floating: true,
                  backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                  borderWidth: 1
              },*/
            plotOptions: {
                cropThreshold: 300,
                series: {
                    boostThreshold: 10,
                    events: {

                    }
                },
                dataLabels: {
                    enabled: true,
                    allowOverlap: false
                },
                scatter: {
                    marker: {
                        radius: 4,
                        symbol: 'circle',
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },

                   boost: {
                        useGPUTranslations: true,
                        usePreAllocated: true
                    },

                    states: {
                        hover: {
                            marker: {
                                enabled: true
                            }
                        }
                    },


                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        //pointFormat: 'Malicious Index: {point.x} <br> Permission Usage {point.y} <br> Application: {point.title} <br>Developer: {point.dev}'
                    },
                    cursor: 'pointer',
                    events: {
                        legendItemClick: function (e) {
                           //alert()
                            //self.filterData(e.target.name);
                            self.props.onChange(e.target.name);
                        }
                    },

                }
            },
         /*   series: [{
                name: 'Male',
                color: 'rgba(119, 152, 191, .5)',
                data: [{
                    x: 174.0,
                    y: 65.6,
                    drilldown: 'drill1'
                },{
                    x: 170.0,
                    y: 60.6,
                    drilldown: 'drill2'
                }]
            }],


*/
      /*series:[{
             color: "#1D3B58",
             keys: ['x','y','drilldown'],
             data: [[0, 3,  "drill2"], [0, 2, "drill1"]],
         }],*/

      series: this.props.options.series,
      //      series: this.state.data,
/*            drilldown: {
                series: [{
                    id: 'hi',
                    data: [
                        [9, 4],
                        [9, 2],
                        [9, 1],
                        [9, 0],
                        [12, -1]
                    ]
                }]
            }*/

        }

        return (
            <div>
                <HighchartsReact ref={this.state.chart} highcharts={this.state.Highcharts} options={configMap}/>


            </div>

        )
    }
}

export default ScatterHeatChart;