import React, { Component } from 'react';
import {DeveloperHeatMapDropDown} from './index';
import BarChart from "./Chart";
import Paper from "@material-ui/core/Paper";
import {HeatMapChart} from './index'
import axios from 'axios';
import {Button} from "@material-ui/core";
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";
import Highcharts from "highcharts";


export default class DeveloperHeatMapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multi : [],
            suggestions :[],
            devAppAndCount : [],
            graphData :[],
            permissionCount : [],
            filteredDevAppCount : [],
            dropDownSelectedVals: [],
            suggestionsAll : [],
            filter: "",
            systemActionsCount: []
        }
    }

    componentDidMount(){
        this.populateDevelopers();
    };

    populateDevelopers =() =>{

        axios.get('/api/getDeveloperAndAppCount').then((result)=>{
            this.setState({devAppAndCount: result.data});
            const dataSuggestions = result.data.map(dev => ({
                value: dev.DeveloperName != null ? dev.DeveloperName : "",
                label: dev.DeveloperName != null ? dev.DeveloperName : ""
            }))
            this.setState({suggestionsAll: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
    }

    plotGraph = () =>{
        var dataToPlot = [];
        var i;
        const devAppCount = this.state.filteredDevAppCount;
        const test = this.state.systemActionsCount;
        for(i = 0; i < devAppCount.length; i++){
            dataToPlot.push({
                group : devAppCount[i].DeveloperName,
                field1: devAppCount[i].cnt,
                field2: this.state.permissionCount[i].total,
                field3: this.state.systemActionsCount[i].actionTotal
            })
        }
        document.getElementById("devHeatChartCanvas").innerHTML = '';
        this.setState({graphData: dataToPlot})

    }

    populateSystemActions =(developers)=>{
        axios.get('/api/getSystemActionsCountByDevelopers?developers='+encodeURIComponent(developers)).then((result)=>{
            this.setState({systemActionsCount: result.data});
        }).
        then(()=>{
            this.plotGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    addSeriesData = (data)=>{
        let length =  this.state.permissionCount.length;
        let value  =  this.state.permissionCount;
        for (let i = 0; i < data.length; i++) {
            value.push([i,length/9, data[i][0].count]);
        }
        this.setState({permissionCount: value});
    }

    populateDevPermissionCount =(developers)=>{
        this.setState({permissionCount: []});
        for (let i in developers) {
            axios.get('/api/getPermissionsByGroupForFilter?filterName=DeveloperName&developer='+encodeURIComponent(developers[i])).then((result)=>{
                this.addSeriesData(result.data);

            })
        }
    }

    changeDevDropDown =(result, selectedVals) =>{

        if(!selectedVals){
            this.setState({graphData: []})
            return;
        }

        //this.setState({dropDownSelectedVals : selectedVals});
        const devAppCount = this.state.devAppAndCount.filter(function (data) {
            return result.includes(data.DeveloperName);
        });

        this.setState({filteredDevAppCount : devAppCount});

        let i ;
        var developers = [];
        let dropDownSelectedVals = [];
        for(i in devAppCount){
            dropDownSelectedVals.push(devAppCount[i].DeveloperName);
            developers.push("'"+ devAppCount[i].DeveloperName.replace(/\"/g, "")+"'")
        }
        this.setState({dropDownSelectedVals : dropDownSelectedVals});
        this.populateDevPermissionCount(developers);

    }

    filterSuggestions=(filterString) =>{
        const matches = this.state.suggestionsAll.filter(s => s.label.toLowerCase().includes(filterString.toLowerCase()));
        this.setState({suggestions : matches});
        this.setState({filter : filterString});
    }

    download =()=>{
        if(this.state.graphData && this.state.graphData.length != 0){
            d3_save_pdf.save(d3.select('#devHeatChartCanvas svg').node(), {filename: 'AndroidDataInsight'});
        }
    }

    removeChartCanvas = () =>{
        var element = document.getElementById('devHeatChartCanvas');
        if(element)
         document.getElementById("devHeatChartCanvas").innerHTML = '';
    }



    render() {

        let configMap = {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },


            title: {
                text: 'Number of dangerous permission usage by developer'
            },

            xAxis: {
                categories: ['Calendar', 'Contacts', 'Camera', 'Location', 'Microphone', 'Phone', 'Sensor', 'SMS', 'Storage'],
                title: null,
                visible: true
            },

            yAxis: {
                categories: this.state.dropDownSelectedVals,
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

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.yAxis.categories[this.point.y] + '</b> is using <br><b>' +
                        this.point.value + '</b> permissions of dangerous permission category:  <br><b>' + this.series.xAxis.categories[this.point.x] + '</b>';
                }
            },

            series: [{
                name: "Number of dangerous permission usage by developer",
                borderWidth: 1,
                //data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
                data: this.state.permissionCount,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }]

        }

        const attributes = {
            data : this.state.permissionCount,
            color :   ["#98abc5", "#8a89a6", "#98abc5", "#7FB3D5", "#E59866","#AF7AC5"],
            elem : 'devHeatChartCanvas',
            selectedDevelopers: this.state.dropDownSelectedVals,
            title : "Number of dangerous permission usage by developerx"

        }
        return (
            <div>
                <DeveloperHeatMapDropDown id="devDropDown" data = {this.state.suggestions} onChange={this.changeDevDropDown.bind(this)}
                                   onKeyPress = {this.filterSuggestions.bind(this)} filter = {this.state.filter}/>
                    <div id = 'devHeatChartCanvas' style={{boxShadow : "2px 2px 2px 2px #a8a8a8", height: "25.7em", width: "100%"}}>
                        <HeatMapChart configMap = {configMap}/>
                    </div>
                    <Button variant="contained"  color="primary" onClick={this.download} style={{marginTop :"10px"}} >Download</Button>
            </div>
        )
    }
}