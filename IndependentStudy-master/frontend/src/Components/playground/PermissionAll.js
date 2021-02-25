import React, { Component } from 'react';
import {
    BubbleChart,
    GenericDropDown,
    GroupColumnChart,
    HeatMap,
    PieChart
} from '../index';
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {blue, green, pink, red} from "@material-ui/core/colors";
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import {CircularProgress} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";


export default class PermissionAll extends Component {

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
            index: "All",
            rotate: false,
            rangeValue: [4, 6]
        }
    }

    componentDidMount(){
        this.populatePermissions();
    };


    getPermissionName =(id) =>{
        let permissionObj = this.state.suggestions.find(elem => elem.value == id);
        return permissionObj.label;
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

    populateDevPermissionCount =(permissionIds, vtdetections, index)=>{

        if(permissionIds.length == 0)
            return;
        this.setState({rotate : true})
        axios.get('/api/getPermissionUsageCount?permissionIds='+ permissionIds+"&vtdetections=" + vtdetections+"&count="+index).then((result)=>{
            this.setState({rotate : false})
            this.setState({permissionCount: result.data});
        }).then(()=>{
            this.plotGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
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

        this.setState({filteredPermissions: filteredPermissions})
        this.populateDevPermissionCount(filteredPermissions.join(), this.state.vtdetectionsFilter, this.state.index);

    }

    renderChart =()=>{

        const chartOptions = {
            title : "Permission Usage of entire dataset",
            series : this.state.series,
            xAxis : this.state.xAxis

        }

        const pieChartOptions = {
            title : "Permission Usage of entire dataset",
            series : this.state.pieSeries
        }

        const bubbleChartOptions = {
            title :  "Permission Usage of entire dataset",
            name: "Genre",
            series : this.state.bubbleSeries,
            labelLimit: 100
        }

        const heatMapOptions = {
            title : "Permission Usage of entire dataset",
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
        this.populateDevPermissionCount(this.state.filteredPermissions.join(),filters.join(), this.state.index);
    }

    onChangeRadio = (event) =>{
        this.setState({index: event.target.value})
        this.populateDevPermissionCount(this.state.filteredPermissions.join(), this.state.vtdetectionsFilter , event.target.value);
    };

    onSliderChecked = () => {
        this.setState({ isChecked: !this.state.isChecked });
    };

    onVTSliderFilterChange = (result, selectedVals) => {
        this.setState({ rangeValue: selectedVals });
        let filters = [];
        if (selectedVals) {
            let start = selectedVals[0];
            let end = selectedVals[1];
            for (let i = start; i <= end; i++) {
                filters.push(i);
            }
        }

        this.setState({ vtdetectionsFilter: filters });
        this.populateDevPermissionCount(this.state.filteredPermissions.join(),filters.join(), this.state.index);
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
                    <GenericDropDown id="filterDropDown"  style={{marginLeft: "1%"}}  data = {dropDownOptions} onChange={this.onFilterChange.bind(this)}/>
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