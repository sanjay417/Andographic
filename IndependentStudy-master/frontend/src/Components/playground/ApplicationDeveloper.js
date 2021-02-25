import React, { Component } from 'react';
import {GroupColumnChart, DeveloperDropDown, GenericDropDown, HeatMap, PieChart, BubbleChart} from '../index';
import BarChart from "../Chart";
import Paper from "@material-ui/core/Paper/index";
import {GroupedBarChart} from '../index'
import axios from 'axios/index';
import {Button, CircularProgress} from "@material-ui/core/index";
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";
import {blue, green, pink, red} from "@material-ui/core/colors/index";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";


export default class ApplicationDeveloper extends Component {

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
                {name: "Applications", data : []}
            ],
            currentDevFilter: [],
            vtdetectionSuggestions: [],
            vtdetectionsFilter: [],
            index: "All",
            bubbleSeries: [],
            heatMapSeries: [],
            chartType: "column",
            rotate: false,
            rangeValue: [4, 6]

        }
    }

    componentDidMount(){
        this.populateDevelopers(this.state.vtdetectionsFilter.join(), this.state.index);
    };

    populateDevelopers =(vtdetections, index) =>{
        this.setState({rotate : true})
        axios.get('/api/getDeveloperAndAppCount?vtdetections='+vtdetections+"&count="+index).then((result)=>{
            this.setState({rotate : false})
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


    plotGraph = (devAppCount) =>{

        let series = [];
        let xAxis = [];
        let pieSeries = [];
        let bubbleSeries = [{name: "Developer", data: []}];
        let element = {name: "Developer", data : []};
        let pieElement = {name: "Developer", data : []};
        for(let i = 0; i < devAppCount.length; i++){
            let developer = devAppCount[i];
            xAxis.push(developer.DeveloperName);
            element.data.push(developer.cnt);
            pieElement.data.push({name: developer.DeveloperName, y: developer.cnt});
            bubbleSeries[0].data.push({name: developer.DeveloperName, value: developer.cnt});
        }

        series.push(element);
        pieSeries.push(pieElement);

        this.setState({pieSeries: pieSeries});
        this.setState({bubbleSeries: bubbleSeries});
        this.setState({series: series});
        this.setState({xAxis: xAxis});
    }


    changeDevDropDown =(result, selectedVals) =>{

        if(!selectedVals){
            this.setState({dropDownSelectedVals : []});
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
        this.plotGraph(devAppCount);
        //this.populateDevPermissionCount(developers, this.state.vtdetectionsFilter.join());

    }



    filterSuggestions=(filterString) =>{
        const matches = this.state.suggestionsAll.filter(s => s.label.toLowerCase().includes(filterString.toLowerCase()));
        this.setState({suggestions : matches});
        this.setState({filter : filterString});
    }

    onMeasureChange =(result, selectedVals) =>{
        if(!selectedVals){
            return;
        }

        let measure = selectedVals[0].value;
        this.setState({"selectedMeasure": measure });

        if(this.state.dropDownSelectedVals.length > 0){
            if(measure === "PermissionAll") {
                this.populatePermissionCount(this.state.currentDevFilter, this.state.vtdetectionsFilter.join());
            }else if(measure === "Others"){
                this.populateDevPermissionCount(this.state.currentDevFilter, this.state.vtdetectionsFilter.join());
            }
        }
    }

    onVTFilterChange =(result, selectedVals) => {
        let filters = [];
        if (selectedVals) {
            for (let i in selectedVals) {
                filters.push(selectedVals[i].value)
            }
        }

        this.setState({"vtdetectionsFilter" : filters});


        this.populateDevelopers( filters.join(), this.state.index);

    }

    onChangeRadio = (event) =>{
        this.setState({index: event.target.value})
        this.populateDevelopers(this.state.vtdetectionsFilter.join(), event.target.value);

    };

    changeChart =(type)=>{
        this.setState({chartType: type});
    }

    renderChart =()=>{

        const chartOptions = {
            title : "Number of Applications by Developer  ",
            series : this.state.series,
            xAxis : this.state.xAxis

        }

        const pieChartOptions = {
            title : "Number of Applications by Developer  ",
            series : this.state.pieSeries
        }

        const bubbleChartOptions = {
            title : "Number of Applications by Developer  ",
            name: "Genre",
            series : this.state.bubbleSeries,
            labelLimit: 0
        }

        const heatMapOptions = {
            title :"Number of Applications by Developer  ",
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

    onSliderChecked = () => {
        this.setState({ isChecked: !this.state.isChecked });
    };

    onVTSliderFilterChange = (result, selectedVals) => {
        this.setState({ rangeValue: selectedVals});
        let filters = [];
        let start = selectedVals[0];
        let end = selectedVals[1];

        if (selectedVals) {
            for (let i = start; i <= end; i++) {
                filters.push(i);
            }
        }

        this.setState({"vtdetectionsFilter" : filters});
        this.populateDevelopers( filters.join(), this.state.index);
    }
    valuetext = value => {
        return `${value}`;
    }

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

        const chartOptions = {
            title : "Number of Applications by Developer  ",
            series : this.state.series,
            xAxis : this.state.xAxis

        }

        const dropDownOptions ={
            suggestions : this.state.suggestions,
            title: "Select Developer"
        }

        const dropDownOptionsVTDetection ={
            suggestions : this.state.vtdetectionSuggestions,
            title: "Select Malicious Index"
        }


        return (
            <div>
                <Paper elevation={3}  style={{ backgroundColor: "#F5F5F5", marginBottom: "1%", padding: "5px"}}>
                    <RadioGroup aria-label="index" row  style={{marginLeft :"25%"}} name="index" value={this.state.index} onChange={this.onChangeRadio.bind(this)}>
                        <FormControlLabel  style={{width :"20%"}} value="All" control={<Radio />} label="All" />
                        <FormControlLabel  style={{width :"20%"}}value="Malicious" control={<Radio />} label="Malicious" />
                        <FormControlLabel  style={{width :"20%"}}value="Benign" control={<Radio />} label="Benign" />
                    </RadioGroup>

                </Paper>


                <div style={{display: "flex"}}>
                    {(this.props.options.index && this.props.options.index == "Malicious") || this.state.index == "Malicious" ? (
                        <div style={{ display: "flex", alignItems: "stretch" }}>
                            <div><FormControlLabel style={{ marginLeft: "5px", marginRight: "5px" }} value="start" control={<Checkbox color="primary" />} label="Show Slider" labelPlacement="start" onChange={this.onSliderChecked.bind(this)}/></div>
                            {!this.state.isChecked
                                ? (<div> <GenericDropDown  id="VTDropDown" style={{ marginLeft: "1%" }} data={dropDownOptionsVTDetection} onChange={this.onVTFilterChange.bind(this)}/> </div>)
                                : (<div style={{ width: "300px" }}> <Typography id="range-slider" gutterBottom></Typography>
                                    <Slider max="54" min={1} value={this.state.rangeValue} onChangeCommitted={this.onVTSliderFilterChange.bind(this)} valueLabelDisplay="auto" aria-labelledby="range-slider" getAriaValueText={this.valuetext.bind(this)}/></div>)
                            }
                        </div>
                    ) : null}

                    <DeveloperDropDown id="devDropDown" data = {this.state.suggestions} onChange={this.changeDevDropDown.bind(this)}
                                       onKeyPress = {this.filterSuggestions.bind(this)} filter = {this.state.filter}/>


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


                <Paper elevation={3} style={{ width: "100%", height: "400px"}}>
                    {this.state.rotate ? <CircularProgress color="secondary"  style={{marginTop : "10%"}} /> : this.renderChart()}
                </Paper>
            </div>
        )
    }
}