import React, { Component } from 'react';
import {GroupColumnChart, DeveloperAppDropDown} from './index';
import BarChart from "./Chart";
import Paper from "@material-ui/core/Paper";
import {GroupedBarChart} from './index'
import axios from 'axios';
import {Button} from "@material-ui/core";
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";


export default class DeveloperAppsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multi : [],
            suggestions :[],
            devAppAndCount : [],
            graphData :[],
            appsAndPermissions : [],
            filteredDevAppCount : [],
            dropDownSelectedVals: [],
            systemActionsCount:[],
            suggestionsAll : [],
            filter: "",
            xAxis :[],
            series :[],
            width : ""
        }
    }

    componentDidMount(){
        this.populateDevelopers();
    };

    populateDevelopers(){
        axios.get('/api/getDeveloperAndAppCount').then((result)=>{
            this.setState({devAppAndCount: result.data});
            console.log("appview",result)
            const dataSuggestions = result.data.map(dev => ({
                value: dev.DeveloperName != null ? dev.DeveloperName : "",
                label: dev.DeveloperName != null ? dev.DeveloperName : ""
            }))
            this.setState({suggestionsAll: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
    }

    plotGraph(){
        let series = [
            {name: "Permissions ", data : []},
            {name: "System Actions", data : []}
        ];

        let xAxis = [];
        for(let i = 0; i <  this.state.appsAndPermissions.length; i++){
            xAxis.push( this.state.appsAndPermissions[i].Title);
            let developer =  this.state.appsAndPermissions[i].DeveloperName;
            series[0].data.push(Math.round(this.state.appsAndPermissions[0].Permissions));

            let systemAction = this.state.systemActionsCount.filter(systemAction => systemAction.DeveloperName ==  developer);
            series[1].data.push(Math.round(systemAction[0].actionTotal));
        }
        this.setState({series: series});
        this.setState({xAxis: xAxis});

    }

    populateSystemActions(developer){
        axios.get('/api/getSystemActionsCountByDeveloper?developer='+encodeURIComponent(developer)).then((result)=>{
            this.setState({systemActionsCount: result.data});
        }).
        then(()=>{
            this.plotGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    populateDevPermissionCount (developer){

          axios.get('/api/getPermissionUsageByDeveloper?developer='+encodeURIComponent(developer)).then((result)=>{
            this.setState({appsAndPermissions: result.data});
        }).then(()=>{
            this.populateSystemActions(developer);
        }).catch((err)=>{
            console.log(err)
        })
    }

    changeDevDropDown(result){

        if(!result){
            this.setState({graphData: []})
            return;
        }

        this.populateDevPermissionCount(result.replace(/\"/g, ""));

    }

    filterSuggestions(filterString){
        const matches = this.state.suggestionsAll.filter(s => s.label.toLowerCase().includes(filterString.toLowerCase()));
        this.setState({suggestions : matches});
        this.setState({filter : filterString});
    }

    download (){
        if(this.state.graphData && this.state.graphData.length != 0){
            d3_save_pdf.save(d3.select('#chartDevCanvas svg').node(), {filename: 'AndroidDataInsight'});
            //d3_save_pdf.embedRasterImages(d3.select('#chartDevCanvas svg').node());
        }
    }



    render() {

        const chartOptions = {
            title : "Count of PermissionAll and System Actions by Application name ",
            series : this.state.series,
            xAxis : this.state.xAxis

        }

        const dropDownOptions = {
            suggestions : this.state.suggestions,
            title: "Select Developer"
        }

        return (
            <div style={{width: this.state.width}}>
                <DeveloperAppDropDown id="devDropDown" data = {this.state.suggestions} onChange={this.changeDevDropDown.bind(this)}
                                   onKeyPress = {this.filterSuggestions.bind(this)} filter = {this.state.filter}/>
                <Paper elevation={3} style={{width: this.state.width}}>
                    <GroupColumnChart options = {chartOptions} />
                </Paper>
            </div>
        )
    }
}