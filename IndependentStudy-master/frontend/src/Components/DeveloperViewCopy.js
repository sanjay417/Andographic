import React, { Component } from 'react';
import {GroupColumnChart, DeveloperDropDown} from './index';
import BarChart from "./Chart";
import Paper from "@material-ui/core/Paper";
import {GroupedBarChart} from './index'
import axios from 'axios';
import {Button} from "@material-ui/core";
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";



export default class DeveloperView extends Component {

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
            systemActionsCount: [],

            xAxis :[],
            series :[
                {name: "Applications", data : []},
                {name: "Permissions", data : []},
                {name: "System Actions", data : []},
            ]
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
        let series = [
            {name: "Applications", data : []},
            {name: "Average Permissions", data : []},
            {name: "Average System Actions", data : []},
        ];

        let xAxis = [];
        const devAppCount = this.state.filteredDevAppCount;
        const test = this.state.systemActionsCount;
        for(let i = 0; i < devAppCount.length; i++){
            let developer = devAppCount[i].DeveloperName;
            xAxis.push(developer);
            series[0].data.push(devAppCount[i].cnt);

            let permission = this.state.permissionCount.filter(permission => permission.DeveloperName ===  developer);
            series[1].data.push(Math.round(permission[0].total));

            let systemAction = this.state.systemActionsCount.filter(systemAction => systemAction.DeveloperName ==  developer);
            series[2].data.push(Math.round(systemAction[0].actionTotal));
        }
        this.setState({series: series});
        this.setState({xAxis: xAxis});

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

    populateDevPermissionCount =(developers)=>{
        axios.get('/api/getPermissionCountByDeveloper?developers='+encodeURIComponent(developers)).then((result)=>{
            this.setState({permissionCount: result.data});
        }).then(()=>{
            this.populateSystemActions(developers);
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    changeDevDropDown =(result, selectedVals) =>{

        if(!selectedVals){
            this.setState({graphData: []})
            return;
        }

        this.setState({dropDownSelectedVals : selectedVals});
        const devAppCount = this.state.devAppAndCount.filter(function (data) {
            return result.includes(data.DeveloperName);
        });

        this.setState({filteredDevAppCount : devAppCount});

        let i ;
        var developers = [];
        for(i in devAppCount){
            developers.push("'"+ devAppCount[i].DeveloperName.replace(/\"/g, "")+"'")
        }

        var developers = developers.join();
        this.populateDevPermissionCount(developers);

    }

    filterSuggestions=(filterString) =>{
        const matches = this.state.suggestionsAll.filter(s => s.label.toLowerCase().includes(filterString.toLowerCase()));
        this.setState({suggestions : matches});
        this.setState({filter : filterString});
    }

    download =()=>{
        if(this.state.graphData && this.state.graphData.length != 0){
            d3_save_pdf.save(d3.select('#chartCanvas svg').node(), {filename: 'AndroidDataInsight'});
        }
    }

    render() {

        const chartOptions = {
            title : "Number of Application, Permissions and System Actions by Developer  ",
            series : this.state.series,
            xAxis : this.state.xAxis

        }

        const dropDownOptions ={
            suggestions : this.state.suggestions,
            title: "Select Developer"
        }

        return (
            <div>
                <DeveloperDropDown id="devDropDown" data = {this.state.suggestions} onChange={this.changeDevDropDown.bind(this)}
                                   onKeyPress = {this.filterSuggestions.bind(this)} filter = {this.state.filter}/>

                <Paper elevation={3} >
                    <GroupColumnChart options = {chartOptions} />
                </Paper>
            </div>
        )
    }
}