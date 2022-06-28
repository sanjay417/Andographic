import React, {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import ReactHighmaps from 'react-highcharts/ReactHighmaps';
import Highcharts from 'highcharts';


class HeatMapChart extends  Component{
    render(){

        return (
            <div>
                <ReactHighmaps config={this.props.configMap} />
            </div>
        )
    }
}

export default HeatMapChart;