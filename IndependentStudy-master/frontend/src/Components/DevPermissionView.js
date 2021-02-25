import React, { Component } from 'react';
import {GroupColumnChart, DeveloperDropDown} from './index';
import BarChart from "./Chart";
import Paper from "@material-ui/core/Paper";
import {GroupedBarChart} from './index'
import axios from 'axios';
import {Button} from "@material-ui/core";
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";


export default class DevPermissionView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multi : [],
            suggestions :[],
            suggestionsAll : [],
            devAppAndCount : [],
            graphData :[],
            permissionCount : [],
            filteredDevAppCount : [],
            dangerousPermissionCount : [],
            filter: "",
            xAxis :[],
            series :[]
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
            {name: "Normal PermissionAll Category", data : []},
            {name: "Dangerous PermissionAll Category", data : []},
        ];

        let xAxis = [];
        const devAppCount = this.state.filteredDevAppCount;
        const test = this.state.systemActionsCount;
        for(let i = 0; i < devAppCount.length; i++){
            let developer = devAppCount[i].DeveloperName;
            xAxis.push(developer);

            let permission = this.state.permissionCount.filter(permission => permission.DeveloperName ===  developer);
            series[0].data.push(this.state.dangerousPermissionCount[i].total);

            let dangerousPermission =  this.state.dangerousPermissionCount.filter(dangerousPermission => dangerousPermission.DeveloperName ==  developer);
            series[1].data.push(this.state.permissionCount[i].total - this.state.dangerousPermissionCount[i].total);
        }
        this.setState({series: series});
        this.setState({xAxis: xAxis});

    }

    populateDevPermissionCount =(developers)=>{
        axios.get('/api/getPermissionCountByDevApp?developers='+encodeURIComponent(developers)).then((result)=>{
            this.setState({permissionCount: result.data});
        }).then(()=>{
            this.populateDangerousDevPermissionCount(developers);
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    populateDangerousDevPermissionCount =(developers)=>{
        axios.get('/api/getDangerousPermissionCountByDev?developers='+encodeURIComponent(developers)).then((result)=>{
            this.setState({dangerousPermissionCount: result.data});
        }).then(()=>{
            this.plotGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    changeDevDropDown =(result) =>{

        if(!result || result.length == 0){
            this.setState({graphData: []})
            return;
        }

        const devAppCount = this.state.devAppAndCount.filter(function (data) {
            return result.includes(data.DeveloperName);
        });

        this.setState({filteredDevAppCount : devAppCount});

        var i ;
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
            d3_save_pdf.save(d3.select('#permissionChartCanvas svg').node(), {filename: 'AndroidDataInsight'});
        }
    }


    render() {

        const chartOptions = {
            title : "Number of Normal and Dangerous Permissions by Developer",
            series : this.state.series,
            xAxis : this.state.xAxis

        }

        const dropDownOptions ={
            suggestions : this.state.suggestions,
            title: "Select Developer"
        }

        return (
            <div>
                <DeveloperDropDown id="perDropDown" data = {this.state.suggestions} onChange={this.changeDevDropDown.bind(this)}
                                   selectedDevelopers = {this.props.selectedDevelopers} flow = {this.props.flow}
                                   onChangeFlow= {this.props.onChangeFlow.bind(this)} filter = {this.state.filter}  onKeyPress = {this.filterSuggestions.bind(this)}/>
                <Paper elevation={3} >
                    <GroupColumnChart options = {chartOptions} />
                </Paper>
            </div>
        )
    }
}