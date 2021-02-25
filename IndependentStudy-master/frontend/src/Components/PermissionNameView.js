import React, { Component } from 'react';
import {ColumnChart, GenericDropDown} from './index';
import BarChart from "./Chart";
import Paper from "@material-ui/core/Paper";
import {GroupedBarChart} from './index'
import axios from 'axios';
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";
import {Button} from "@material-ui/core";


export default class PermissionNameView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multi : [],
            suggestions :[],
            permissions : [],
            graphData :[],
            permissionCount : [],
            filteredPermissions : [],
            permissionIDMapping : {},
            xAxis :[],
            series :[]
        }
    }

    componentDidMount(){
        this.populateDevelopers();
    };


    getPermissionName =(id) =>{
        let permissionObj = this.state.suggestions.find(elem => elem.value == id);
        return permissionObj.label;
    }

    populateDevelopers =() =>{
        axios.get('/api/getPermissions').then((result)=>{
            this.setState({permissions: result.data});
            const dataSuggestions = result.data.map(entry => ({
                value: entry.pid,
                label: entry.permission,
            }))
            this.setState({suggestions: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
    }

    plotGraph = () =>{
        var dataToPlot = [];
        var i;
        const permissionCount = this.state.permissionCount;
        let series = [];
        let xAxis = [];
        let element = {name: "Permissions", data : []};
        for(i = 0; i < permissionCount.length; i++){
            xAxis.push(this.getPermissionName(permissionCount[i].pid));
            element.data.push(permissionCount[i].total);
        }
        series.push(element);
        this.setState({series: series});
        this.setState({xAxis: xAxis});

    }

    populateDevPermissionCount =(permissionIds)=>{

        axios.get('/api/getPermissionUsageCount?permissionIds='+ permissionIds).then((result)=>{
            this.setState({permissionCount: result.data});
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

        let i ;
        let permissionIds;
        let filteredPermissions = [];
        for(i in result){
            filteredPermissions.push(result[i]);
        }
        this.setState({filteredPermissions : filteredPermissions});
        permissionIds = filteredPermissions.join(",");
        this.populateDevPermissionCount(permissionIds);

    }

    download =()=>{
        if(this.state.graphData && this.state.graphData.length != 0){
            d3_save_pdf.save(d3.select('#permissionNameChartCanvas svg').node(), {filename: 'AndroidDataInsight'});
        }
    }

    render() {

        const chartOptions = {
            title : "Number of Permissions by PermissionAll Name",
            series : this.state.series,
            xAxis : this.state.xAxis


        }

        const dropDownOptions ={
            suggestions : this.state.suggestions,
            title: "Select PermissionAll Name"
        }

        return (
            <div>
                <GenericDropDown id="perDropDown" data = {dropDownOptions} onChange={this.changeDevDropDown.bind(this)}/>
                <Paper elevation={3} >
                    <ColumnChart options = {chartOptions} />
                </Paper>

            </div>
        )
    }
}