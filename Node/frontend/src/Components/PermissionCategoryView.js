import React, { Component } from 'react';
import {ColumnChart, GenericDropDown, PermissionCategoryDropDown} from './index';
import BarChart from "./Chart";
import Paper from "@material-ui/core/Paper";
import {GroupedBarChart} from './index'
import axios from 'axios';
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";
import {Button} from "@material-ui/core";


export default class PermissionCategoryView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multi : [],
            suggestions :[],
            permissions : [],
            graphData :[],
            permissionCount : [],
            filteredPermissionCategories : [],
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

        let result = [{name: "Calendar"}, {name: "Camera"}, {name: "Contacts"}, {name: "Location"}, {name: "Microphone"}, {name: "Phone"}, {name: "Sensor"}, {name: "SMS"}, {name: "Storage"}]
        const dataSuggestions = result.map(entry => ({
            value: entry.name,
            label: entry.name,
        }))
        this.setState({suggestions: dataSuggestions});

    }

    plotGraph = (graphData) =>{
        let i;
        let series = [];
        let xAxis = [];
        let element = {name: "Permissions", data : []};
        for(i = 0; i < graphData.length; i++){
            xAxis.push(graphData[i].name);
            element.data.push(graphData[i].count);
        }
        series.push(element);
        this.setState({series: series});
        this.setState({xAxis: xAxis});

    }

    populatePermissionCategory =(filteredPermissionCategories)=>{

        let data = [];
        let i;
        for( i = 0; i < filteredPermissionCategories.length; i++){
            let category = filteredPermissionCategories[i];
            axios.get('/api/getPermissionsByGroup/'+filteredPermissionCategories[i]).then((result)=>{
                data.push({name: category, count : result.data[0][category]});
            }).then(()=>{
                if(data.length == filteredPermissionCategories.length){
                    this.plotGraph(data);
                }

            }).
            catch((err)=>{
                console.log(err)
            })
        }

    }

    changeDevDropDown =(result) =>{

        if(!result || result.length == 0){
            this.setState({graphData: []})
            return;
        }

        let i ;
        let permissionIds;
        let filteredPermissionCategories = [];
        for(i in result){
            filteredPermissionCategories.push(result[i]);
        }
        this.setState({filteredPermissionCategories : filteredPermissionCategories});
        this.populatePermissionCategory(filteredPermissionCategories);

    }

    download =()=>{
        if(this.state.graphData && this.state.graphData.length != 0){
            d3_save_pdf.save(d3.select('#permissionCategoryChartCanvas svg').node(), {filename: 'AndroidDataInsight'});
        }
    }


    render() {

        const chartOptions = {
            title : "Number of Permissions",
            series : this.state.series,
            xAxis : this.state.xAxis


        }

        const dropDownOptions ={
            suggestions : this.state.suggestions,
            title: "Select PermissionAll Name"
        }

        return (
            <div  style={{width: "100%"}}>
                <GenericDropDown id="perDropDown" data = {dropDownOptions} onChange={this.changeDevDropDown.bind(this)}/>
                <Paper elevation={3} style={{width: "100%"}}>
                    <ColumnChart options = {chartOptions} />
                </Paper>
            </div>
        )
    }
}