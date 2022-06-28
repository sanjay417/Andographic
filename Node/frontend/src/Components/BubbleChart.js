import React, {Component} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'
import More from 'highcharts/highcharts-more'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

More(Highcharts)

function handleClick () {

    console.log("hi");
//     try {
//         await axios.get('/api2/scoreCard', {
//           params:{
//           scan_hash: hash
//           }
//         }).then(res => {
//           console.log("scorecard:",res.data);
//           setRed(<Redirect to={{
//             pathname: '/scoreCard',
//             state: { data: res.data }
//         }}/>)
//       })    
//     }        
  
//     catch (err) {
//       if (err.response.status === 500) {
//         console.log('There was a problem with the server');
//       } else {
//         console.log(err.response.data.msg);
//       }
//     }
// }
}

class BubbleChart extends  Component{

    constructor(props) {
        super(props);
        this.state = {
            chart: "",
            width: "100%"
        }

    }

    render(){
        
        (function(H) {
            H.wrap(H.Tooltip.prototype, "refresh", function(proceed, points) {
            proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        
            var button = this.label.div.querySelector("button");
        
            if (button && !button.addedEvent) {
                button.addEventListener("click", handleClick);
                button.addedEvent = true;
            }
            });
        })(Highcharts);
        
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

            tooltip: {
                style: {
                    pointerEvents: 'auto'
                },
                useHTML: true,
                // headerFormat: '<table>',
                // pointFormat: '<tr><th colspan="2"><h4>{point.name}</h4></th></tr>' +
                //     '<tr><th>Value:</th><td>{point.value}</td></tr>' +
                //     '<tr><th>Apps:</th><td><a href="http://localhost:3000/#/FileUploadPage">{point.apps}</a></td></tr>' ,
                // footerFormat: '</table>',  
                
                formatter: function () {                                

                    var s = '<table><tr><th colspan="2"><h4>' + this.point.name + '</h4></th></tr>' + 
                    '<tr><th>Value:</th><td>' + this.point.value + '</td></tr>' +  
                    '<tr><th>Apps:</th>'    
                    
                    var len = this.point.apps.length
                    for (var i = 0; i < len; i++) {
                        s += '<td><a href="http://localhost:3000/#/FileUploadPage">' +  this.point.apps[i] + '</a>&nbsp</td>'
                    }

                    s += '</tr></table>'        
                    return(s)                    
                }
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
                            value: this.props.options.labelLimit !== undefined ? this.props.options.labelLimit : 100
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