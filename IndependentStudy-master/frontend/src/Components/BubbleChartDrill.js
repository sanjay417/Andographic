import React, {Component, useRef} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import More from 'highcharts/highcharts-more'
import drilldown from "highcharts/modules/drilldown.js";



if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

More(Highcharts)
drilldown(Highcharts);

class BubbleChartDrill extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            chart: "bubble",
            width: "100%",
            lastColor: "",
        }

    }

    render(){

        if(this.props.options.drag == true){
            this.refs["bubble"].chart.reflow();
        }

        let self = this;
        let configMap = {

            xAxis: {
                type: 'category'
            },

            chart: {
                type: 'packedbubble',
                width: this.props.options.width,
                height: this.props.options.height ? this.props.options.height : 400,
                events: {
                    render: function() {
                        if(self.props.options.series && self.props.options.series.length > 0
                            &&  self.refs["bubble"] && self.refs["bubble"].chart.series.length > 0 && self.props.options.shrinkLabel == true){
                            self.refs["bubble"].chart.series.forEach(series => {
                                series.points.forEach(point => {

                                    if (point.dataLabel != undefined && point.graphic.width > 1) {
                                        if (point.dataLabel.width > point.graphic.width) {
                                            let indic = (
                                                    (point.dataLabel.width - point.graphic.width) /
                                                    point.dataLabel.width
                                                ),
                                                //text = point.series.name,
                                                text = point.name,
                                                textLen = text.length,
                                                maxTextLen = Math.floor(textLen * (1 - indic)),
                                                newText,
                                                dotted,
                                                substringLen;

                                            dotted = maxTextLen > 2 ? '..' : '.';
                                            substringLen = maxTextLen > 2 ? 2 : 0;
                                            if(dotted == '..')
                                                 newText = text.substring(0, maxTextLen - substringLen) + dotted;
                                            else
                                                newText = ''

                                            point.dataLabel.text.element.innerHTML =
                                                '<tspan>' + newText + '</tspan>';

                                            point.dataLabel.text.translate(
                                                (point.dataLabel.width - point.graphic.width) / 2,
                                                0
                                            );
                                        }
                                    }

                                });
                            })
                        }
                    }

                },
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

                            },
                  /*          update: function(e) {
                                alert(true)
                                let point = e;
                                if (point.graphic.width > 1) {
                                    if (point.dataLabel.width > point.graphic.width) {
                                        let indic = (
                                                (point.dataLabel.width - point.graphic.width) /
                                                point.dataLabel.width
                                            ),
                                            text = point.series.name,
                                            textLen = text.length,
                                            maxTextLen = Math.floor(textLen * (1 - indic)),
                                            newText,
                                            dotted,
                                            substringLen;

                                        dotted = maxTextLen > 2 ? '..' : '.';
                                        substringLen = maxTextLen > 2 ? 2 : 1;
                                        newText = text.substring(0, maxTextLen - substringLen) + dotted;

                                        point.dataLabel.text.element.innerHTML =
                                            '<tspan>' + newText + '</tspan>';

                                        point.dataLabel.text.translate(
                                            (point.dataLabel.width - point.graphic.width) / 2,
                                            0
                                        );
                                    }
                                }
                            }*/

                        }
                    }
                }
            },

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

export default BubbleChartDrill;