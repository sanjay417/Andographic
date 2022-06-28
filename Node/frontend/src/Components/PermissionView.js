import React, { Component } from 'react';
import {
    BubbleChart,
    CategoryDropDown,
    ColumnChart,
    GenericDropDown,
    GroupColumnChart,
    HeatMap,
    PieChart
} from './index';
import BarChart from "./Chart";
import Paper from "@material-ui/core/Paper";
import {GroupedBarChart} from './index'
import axios from 'axios';
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {blue, green, pink, red} from "@material-ui/core/colors";
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import TableChartIcon from '@material-ui/icons/TableChart';


export default class PermissionView extends Component {

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
            series :[],
            measures: [{value: "PermissionAll", label: "PermissionAll"},
                {value: "Category", label: "Dangerous PermissionAll Category"}],
            pieSeries: [],
            yAxis :[],
            bubbleSeries: [],
            heatMapSeries: [],
            chartType: "column",
            selectedMeasure: "",
            vtdetectionSuggestions: [],
            vtdetectionsFilter: [],
            measureFilter: [],

        }
    }

    componentDidMount(){
        this.populatePermissions();
    };


    getPermissionName =(id) =>{
        let permissionObj = this.state.suggestions.find(elem => elem.value == id);
        return permissionObj.label;
    }

    populateCategory =() =>{

        let result = [{name: "Calendar"}, {name: "Camera"}, {name: "Contacts"}, {name: "Location"}, {name: "Microphone"}, {name: "Phone"}, {name: "Sensor"}, {name: "SMS"}, {name: "Storage"}]
        const dataSuggestions = result.map(entry => ({
            value: entry.name,
            label: entry.name,
        }))
        this.setState({suggestions: dataSuggestions});

    }


    populatePermissions =() =>{
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
        let pieSeries = [];
        let bubbleSeries = [{name: "Permissions", data: []}];
        let pieElement = {name: "Permissions", data : []};
        let element = {name: "Permissions", data : []};
        for(i = 0; i < permissionCount.length; i++){
            let name;
            if(this.state.selectedMeasure === "PermissionAll") {
                name = this.getPermissionName(permissionCount[i].pid);
            }else{
                name = permissionCount[i].name;
            }
            xAxis.push(name);
            element.data.push(permissionCount[i].total);
            pieElement.data.push({name: name, y: permissionCount[i].total});
            bubbleSeries[0].data.push({name: name, value: permissionCount[i].total});
        }
        series.push(element);
        pieSeries.push(pieElement);

        this.setState({pieSeries: pieSeries});
        this.setState({bubbleSeries: bubbleSeries});
        this.setState({series: series});
        this.setState({xAxis: xAxis});

    }

    populateDevPermissionCount =(permissionIds, vtdetections)=>{

        axios.get('/api/getPermissionUsageCount?permissionIds='+ permissionIds+"&vtdetections=" + vtdetections).then((result)=>{
            this.setState({permissionCount: result.data});
        }).then(()=>{
            this.plotGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    populatePermissionCategory =(filteredPermissionCategories, vtdetections)=>{

        let data = [];
        let i;
        for( i = 0; i < filteredPermissionCategories.length; i++){
            let category = filteredPermissionCategories[i];
            axios.get('/api/getPermissionsByGroup/'+filteredPermissionCategories[i]+"?vtdetections="+vtdetections).then((result)=>{
                data.push({name: category, total : result.data[0][category]});
            }).then(()=>{
                if(data.length == filteredPermissionCategories.length){
                    this.setState({permissionCount: data});
                    this.plotGraph();
                }

            }).
            catch((err)=>{
                console.log(err)
            })
        }

    }

    onFilterChange =(result) =>{

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
        //this.setState({filteredPermissions : filteredPermissions});
        this.repopulate(this.state.vtdetectionsFilter, filteredPermissions);

    }

    repopulate(vtdetections, measureFilter) {
        if (this.state.selectedMeasure === "PermissionAll") {
            let permissionIds = measureFilter.join(",");
            this.setState({measureFilter: measureFilter})
            this.populateDevPermissionCount(permissionIds, vtdetections);
        } else {
            this.setState({measureFilter: measureFilter})
            this.populatePermissionCategory(measureFilter, vtdetections);
        }
    }

    renderChart =()=>{

        const chartOptions = {
            title : "PermissionAll Usage by application",
            series : this.state.series,
            xAxis : this.state.xAxis

        }

        const pieChartOptions = {
            title : "PermissionAll Usage by application",
            series : this.state.pieSeries
        }

        const bubbleChartOptions = {
            title : "PermissionAll Usage by application",
            name: "Genre",
            series : this.state.bubbleSeries
        }

        const heatMapOptions = {
            title : "PermissionAll Usage by application",
            series : this.state.heatMapSeries,
            xAxis : this.state.xAxisGenre,
            yAxis: this.state.yAxis

        }


        switch(this.state.chartType ){
            case "column":  return <GroupColumnChart options = {chartOptions} />;
            case "heat": return <HeatMap options = {heatMapOptions}/>;
            case "pie" : return  <PieChart options = {pieChartOptions} />
            case  "bubble" : return <BubbleChart options = {bubbleChartOptions} />
        }

    }

    onMeasureChange =(result, selectedVals) =>{
        if(!selectedVals){
            return;
        }

        let filter = selectedVals[0].value;
        this.setState({"selectedMeasure": filter });
        switch (filter) {
            case "PermissionAll": this.populatePermissions(); break;
            case "Category": this.populateCategory(); break;
        }
    }

    changeChart =(type)=>{
        this.setState({chartType: type});
    }

    onVTFilterChange =(result, selectedVals) => {
        let filters = [];
        if (selectedVals) {
            for (let i in selectedVals) {
                filters.push(selectedVals[i].value)
            }
        }

        this.setState({"vtdetectionsFilter" : filters});
        this.repopulate(filters, this.state.measureFilter);
    }


    onChangeRadio = (event) =>{
        this.setState({index: event.target.value})
    };


    render() {

        if(this.state.vtdetectionSuggestions.length == 0 && this.props.options.vtdetections.length > 0){
            this.setState({vtdetectionSuggestions: this.props.options.vtdetections});
        }

        const classes = {
            green: {
                color: '#fff',
                backgroundColor: green[500],
            },
        }

        const dropDownOptionsMeasure ={
            suggestions : this.state.measures,
            title: "Select Measure"
        }

        const dropDownOptions ={
            suggestions : this.state.suggestions,
            title: "Select " + this.state.selectedMeasure
        }

        const dropDownOptionsVTDetection ={
            suggestions : this.state.vtdetectionSuggestions,
            title: "Select VT Detection"
        }


        return (
            <div>
                <div style={{display: "flex"}}>
                    <GenericDropDown id="measureDropDown" style={{marginLeft: "1%", width: "30%"}} data = {dropDownOptionsMeasure} onChange={this.onMeasureChange.bind(this)}/>
                    <GenericDropDown id="filterDropDown"  style={{marginLeft: "1%"}}  data = {dropDownOptions} onChange={this.onFilterChange.bind(this)}/>
                    <GenericDropDown id="VTDropDown"  style={{marginLeft: "1%"}}  data = {dropDownOptionsVTDetection} onChange={this.onVTFilterChange.bind(this)}/>
                </div>
                <Grid container justify="left" alignItems="left" style={{ marginBottom: "10px"}} >
                    <Avatar style={{ marginLeft: "10px", backgroundColor: pink[500], color: '#fff'}} onClick={this.changeChart.bind(this, "column")}>
                        <BarChartIcon />
                    </Avatar>

                    <Avatar style={{ marginLeft: "10px", backgroundColor: blue[500], color: '#fff'}} onClick={this.changeChart.bind(this, "pie")}>
                        <PieChartIcon />
                    </Avatar>

                    <Avatar style={{ marginLeft: "10px", backgroundColor: red[500], color: '#fff'}} onClick={this.changeChart.bind(this, "bubble")}>
                        <BubbleChartIcon />
                    </Avatar>


                </Grid>

                <Paper elevation={3} style={{ width: "100%"}}>
                    {/*<GroupColumnChart options = {chartOptions} />*/}
                    {this.renderChart()}
                </Paper>

            </div>


        )
    }
}