import React, { Component } from 'react';
import {CategoryDropDown, ColumnChart, GenericDropDown, HeatMapChart, PieChart} from '../index';
import BarChart from "../Chart";
import {Button, CircularProgress, Icon} from "@material-ui/core";
import {GroupColumnChart, BubbleChartDrill, HeatMap} from '../index'
import axios from 'axios';
import jsPDF from 'jspdf';
import canvg from 'canvg';
import d3_save_pdf from 'd3-save-pdf';
import * as d3 from "d3";
import GetApp from '@material-ui/icons/GetApp';
import ReactDOM from 'react-dom';
import Paper from "@material-ui/core/Paper/Paper";
import TableChartIcon from '@material-ui/icons/TableChart';
import Avatar from '@material-ui/core/Avatar';
import BarChartIcon from '@material-ui/icons/BarChart';
import { green, pink, blue, red } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PieChartIcon from '@material-ui/icons/PieChart';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

export default class SummarySystemActions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vtdetectionSuggestions: [],
            chartType: "bubble",
            permissionCount: [],
            index : "",
            vtdetections : [2],
            pids: [],
            systemActions: [],
            pieSeries: [],
            yAxis :[],
            bubbleSeries: []
        }


    }

    componentDidMount(){
    };

    setPids =(systemActions)=>{

        let pids = [];
        for(let i in systemActions){
            pids.push(systemActions[i].value);
        }
        //alert(pids);
        this.setState({pids: pids});
        this.setState({systemActions: systemActions})
        return pids;
    };


    populateData =(index, pids) =>{
        switch (index) {
            case "All":
                this.populatePermissionUsage("/api/permissionUsage",pids, this.state.vtdetections);
                break;
            case "Malicious":
                this.populatePermissionUsage("/api/permissionUsageForMaliciousApps",pids, this.state.vtdetections);
                break;
            case "Benign":
                this.populatePermissionUsage("/api/permissionUsageForBenignApps",pids, this.state.vtdetections);
                break;
        }
    }

    getPermissionName =(id) =>{
        let permissionObj = this.state.systemActions.find(elem => elem.value == id);
        return permissionObj.label;
    }

    plotGraph = () =>{
        var dataToPlot = [];
        var i;
        const permissionCount = this.state.permissionCount;
        let series = [];
        let xAxis = [];
        let pieSeries = [];
        let bubbleSeries = [{name: "System Actions", data: []}];
        let pieElement = {name: "System Actions", data : []};
        let element = {name: "System Actions", data : []};
        for(i = 0; i < permissionCount.length; i++){
            let name;
            name = this.getPermissionName(permissionCount[i].pid);
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

    convertHeatMapData=(heatMapData)=>{
        let data = [];
        let len = this.state.yAxis;
        for(let i = 0; i < heatMapData.length; i++){
            for(let j = 0; j < heatMapData[i].length; j++){
                data.push([i, j , heatMapData[i][j]])
            }
        }

        return data;
    }



    populatePermissionUsage =(path, pids, vtdetections)=>{

        if(this.state.index == "Malicious" && vtdetections.length == 0)
            return;

        this.setState({rotate : true})
        let url =  path + '?pids='+ pids.join() + '&vtdetections='+ vtdetections;
        axios.get(url).then((result)=>{
            this.setState({rotate : false})
            this.setState({permissionCount: result.data});
        }).then(()=>{
            this.plotGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
    }


    onVTFilterChange =(result, selectedVals) => {
        let filters = [];
        if (selectedVals) {
            for (let i in selectedVals) {
                filters.push(selectedVals[i].value)
            }
        }


        this.setState({"vtdetections" : filters});
        this.populatePermissionUsage("/api/permissionUsageForMaliciousApps", this.state.pids, filters.join())

    }

    onFilterChange =(result, selectedVals) =>{
        let filters = [];
        if(selectedVals){
            for(let i in selectedVals){
                filters.push(selectedVals[i].value)
            }
        }
;

    }



    renderChart =()=>{


        const chartOptions = {
            title :  "System Action Usage",
            series : this.state.series,
            xAxis : this.state.xAxisGenre

        }

        const pieChartOptions = {
            title :  "System Action Usage",
            series : this.state.pieSeries
        }

        const bubbleChartOptions = {
            title : "System Action Usage",
            name: "Genre",

            series : this.state.bubbleSeries
        }

        const heatMapOptions = {
            title :  "System Action Usage",
            series : this.state.heatMapSeries,
            xAxis : this.state.xAxisGenre,
            yAxis: this.state.yAxis

        }


        switch(this.state.chartType ){
            case "column":  return <GroupColumnChart options = {chartOptions} />;
            case "heat": return <HeatMap options = {heatMapOptions}/>;
            case "pie" : return  <PieChart options = {pieChartOptions} />
            case  "bubble" : return <BubbleChartDrill options = {bubbleChartOptions} />
        }

    }

    changeChart =(type)=>{
        this.setState({chartType: type});
    }

    render() {

        let pids = [];
        if(this.state.vtdetectionSuggestions.length == 0 && this.props.options.vtdetections.length > 0){
            this.setState({vtdetectionSuggestions: this.props.options.vtdetections});
        }


        if(this.props.options.systemActions && this.state.pids.length == 0){

            pids = this.setPids(this.props.options.systemActions);

        }

        if(this.props.options.index && this.state.index != this.props.options.index){
            this.setState({index: this.props.options.index});
            this.populateData(this.props.options.index, pids);
        }

        const classes = {
            green: {
                color: '#fff',
                backgroundColor: green[500],
            },
        }

        const dropDownOptionsVTDetection ={
            suggestions : this.state.vtdetectionSuggestions,
            title: "Select Malicious Index"
        }

        return (
            <div>
                <div  style={{display: "flex"}}>

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

              {/*          <Avatar style={{ marginLeft: "10px", backgroundColor: green[500], color: '#fff'}} onClick={this.changeChart.bind(this, "heat")}>
                            <TableChartIcon />
                        </Avatar>*/}

                    </Grid>

                    { (this.props.options.index && this.props.options.index == "Malicious")
                        ? <GenericDropDown id="VTDropDown"  style={{marginLeft: "1%"}}  data = {dropDownOptionsVTDetection} onChange={this.onVTFilterChange.bind(this)}/>
                        : null }


                </div>
                <Paper elevation={3} style={{ width: "100%"}}>
                    {/*<GroupColumnChart options = {chartOptions} />*/}
                    {this.state.rotate ? <CircularProgress color="secondary"  style={{marginLeft : "25px"}} /> : null}
                    {this.renderChart()}
                </Paper>

            </div>
        )
    }
}