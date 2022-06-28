import React, { Component } from 'react';
import {CategoryDropDown, ColumnChart, GenericDropDown, HeatMapChart, PieChart, BubbleChartDrill} from '../index';
import BarChart from "../Chart";
import {Button, CircularProgress, Icon} from "@material-ui/core";
import {GroupColumnChart, BubbleChart, HeatMap} from '../index'
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

export default class SummaryGenre extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vtdetectionSuggestions: [],
            chartType: "bubble",
            genre: [],
            index : "",
            vtdetections : []
        }


    }

    componentDidMount(){
        //
    };

    populateData =(index) =>{
        switch (index) {
            case "All":
                this.populateApplicationsCountByGenre();
                break;
            case "Malicious":
                this.populateMaliciousApplicationsCountByGenre(this.state.vtdetections);
                break;
            case "Benign":
                this.populateBenignApplicationsCountByGenre();
                break;
        }
    }

    plotGraph = () =>{

        const permissionCount = this.state.genre;
        let series = [];
        let xAxis = [];
        let pieSeries = [];
        let bubbleSeries = [{name: "Genre", data: []}];
        let element = {name: "Permissions", data : []};
        let pieElement = {name: "Genre", data : []};
        for(let i = 0; i < permissionCount.length; i++){
            xAxis.push(permissionCount[i].genre);
            element.data.push(permissionCount[i].total);
            pieElement.data.push({name: permissionCount[i].genre, y: permissionCount[i].total});
            bubbleSeries[0].data.push({name: permissionCount[i].genre, value: permissionCount[i].total});
        }

        series.push(element);
        pieSeries.push(pieElement);

        this.setState({pieSeries: pieSeries});
        this.setState({bubbleSeries: bubbleSeries});
        this.setState({series: series});
        this.setState({xAxisGenre: xAxis});
        this.setState({heatMapSeries: []});


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


    populateApplicationsCountByGenre =(genres, vtdetections)=>{
        this.setState({rotate : true})
        axios.get('/api/applicationsByGenre').then((result)=>{
            this.setState({rotate : false})
            this.setState({genre: result.data});
        }).then(()=>{
            this.plotGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    populateMaliciousApplicationsCountByGenre =(vtdetections)=>{
        this.setState({rotate : true})
        axios.get('/api/maliciousApplicationsByGenre?vtdetections='+vtdetections).then((result)=>{
            this.setState({rotate : false})
            this.setState({genre: result.data});
        }).then(()=>{
            this.plotGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    populateBenignApplicationsCountByGenre =(genres, vtdetections)=>{
        this.setState({rotate : true})
        axios.get('/api/benignApplicationsByGenre').then((result)=>{
            this.setState({rotate : false})
            this.setState({genre: result.data});
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
        this.populateMaliciousApplicationsCountByGenre(filters.join())

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
            title : "Number of Applications by Genre",
            series : this.state.series,
            xAxis : this.state.xAxisGenre

        }

        const pieChartOptions = {
            title : "Number of Applications by Genre",
            series : this.state.pieSeries
        }

        const bubbleChartOptions = {
            title : "Number of Applications by Genre",
            name: "Genre",
            series : this.state.bubbleSeries
        }

        const heatMapOptions = {
            title : "Number of Applications by Genre",
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

        if(this.state.vtdetectionSuggestions.length == 0 && this.props.options.vtdetections.length > 0){
            this.setState({vtdetectionSuggestions: this.props.options.vtdetections});
        }

        if(this.props.options.index && this.state.index != this.props.options.index){
            this.setState({index: this.props.options.index});
            this.populateData(this.props.options.index);
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