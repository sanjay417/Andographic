import React, { Component } from 'react';
import {CategoryDropDown, ColumnChart, GenericDropDown, HeatMapChart, PieChart} from '../index';
import {GroupColumnChart, BubbleChart, HeatMap} from '../index'
import axios from 'axios';
import ReactDOM from 'react-dom';
import Paper from "@material-ui/core/Paper/Paper";
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import TableChartIcon from '@material-ui/icons/TableChart';
import Avatar from '@material-ui/core/Avatar';
import BarChartIcon from '@material-ui/icons/BarChart';
import { green, pink, blue, red } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import PieChartIcon from '@material-ui/icons/PieChart';

import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import {CircularProgress} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

export default class PermissionGenre extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multi : [],
            suggestions :[],
            devAppAndCount : [],
            graphData :[],
            genre : [],
            permissionCount: [],
            filteredDevAppCount : [],
            dropDownSelectedVals: [],
            measures: [{value: "PermissionAll", label: "PermissionAll"},
                {value: "Category", label: "Dangerous PermissionAll Category"},
                {value: "Action", label: "System Action"}],
            filterSuggestions: [],
            selectedMeasure: "",
            xAxisGenre :[],
            series :[],
            pieSeries: [],
            yAxis :[],
            bubbleSeries: [],
            heatMapSeries: [],
            chartType: "column",
            vtdetectionSuggestions: [],
            vtdetectionsFilter: [],
            measureFilter: [],
            index: "All",
            rotate: false,
            rangeValue: [4, 6]

        }

    }

    componentDidMount(){
        this.populateGenres();
        this.populatePermissions();
    };

    populateGenres =() =>{
        axios.get('/api/getGenre').then((result)=>{
            this.setState({genres: result.data});
            const dataSuggestions = result.data.map(dev => ({
                value: dev.Genre,
                label: dev.Genre
            }))
            this.setState({suggestions: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
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
        this.setState({yAxis: []});


    }

    getPermissionName =(id) =>{
        let permissionObj = this.state.filterSuggestions.find(elem => elem.value == id);
        return permissionObj.label;
    }

    plotCategoryGraph = () =>{
        let series = [];
        let bubbleSeries = [];
        let heatMapSeries = [];

        let yAxis = [];
        let temp = [];

        for(let i in this.state.permissionCount){
            if(!temp.includes(this.state.permissionCount[i].name)){
                temp.push(this.state.permissionCount[i].name);
                series.push({name: this.state.permissionCount[i].name, data : []})
            }

        }

        this.setState({heatMapSeries: []});
        const permissionCount = this.state.permissionCount;
        for(let i = 0; i < this.state.xAxisGenre.length; i++){


            let genre = this.state.xAxisGenre[i];
            let bubbleElem = {name: genre, data: []};
            let heatMapElem = [];

            let data = permissionCount.filter(function (data) {
                return data.Genre == genre;
            })

            let self = this;
            for(let j = 0; j < data.length; j++){
                let elem = series.filter(function (val) {
                    return val.name == data[j].name
                })

                elem[0].data.push(data[j].total);
                bubbleElem.data.push({name: data[j].name, value: data[j].total})
                heatMapElem.push(data[j].total);


                if(!yAxis.includes(data[j].name)){
                    yAxis.push(data[j].name);
                }
            }
            bubbleSeries.push(bubbleElem);
            heatMapSeries.push(heatMapElem);
        }

        this.setState({series: series});
        this.setState({bubbleSeries: bubbleSeries});
        this.setState({heatMapSeries: this.convertHeatMapData(heatMapSeries)});

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


    plotPermissionGraph = () =>{
        let series = [];
        let bubbleSeries = [];
        let heatMapSeries = [];

        let temp = [];
        let yAxis = [];
        for(let i in this.state.permissionCount){
            if(!temp.includes(this.state.permissionCount[i].pid)){
                temp.push(this.state.permissionCount[i].pid);
                series.push({name: this.getPermissionName(this.state.permissionCount[i].pid), data : []})
            }

        }

        const permissionCount = this.state.permissionCount;
        let xAxisGenre = this.state.xAxisGenre;
    /*    xAxisGenre.sort(function(a, b){
            return a > b;
        });
*/
        for(let i = 0; i < xAxisGenre.length; i++){
            let genre = xAxisGenre[i];
            let bubbleElem = {name: genre, data: []};
            let heatMapElem = [];

            let data = permissionCount.filter(function (data) {
                return data.Genre == genre;
            })


            data.sort((a, b) => {
                if (a.pid < b.pid) return -1
                return a.pid > b.pid ? 1 : 0
            })

            let self = this;
            for(let j = 0; j < data.length; j++){
                let elem = series.filter(function (val) {
                    return val.name == self.getPermissionName(data[j].pid)
                })

                let name = self.getPermissionName(data[j].pid);
                elem[0].data.push(data[j].total);
                bubbleElem.data.push({name: name, value: data[j].total})
               // heatMapElem.push({name: name, value: data[j].total});
                heatMapElem.push(data[j].total)

                if(!yAxis.includes(name)){
                    yAxis.push(name);
                }
            }
            bubbleSeries.push(bubbleElem);
            heatMapSeries.push(heatMapElem);
        }

        this.setState({xAxisGenre: xAxisGenre});
        this.setState({series: series});
        this.setState({yAxis: yAxis});
        this.setState({bubbleSeries: bubbleSeries});
        this.setState({heatMapSeries: this.convertHeatMapData(heatMapSeries)});

    }

    populateGenrePermissionCount =(genres, vtdetections, index)=>{
        //let vtdetections = this.state.vtdetectionsFilter.join(",");
        this.setState({rotate : true})
        axios.get('/api/getGenreCount?genres='+encodeURIComponent(genres)+"&vtdetections="+vtdetections+"&count="+index).then((result)=>{
            this.setState({rotate : false})
            this.setState({genre: result.data});
        }).then(()=>{
            this.plotGraph();

        }).
        catch((err)=>{
            console.log(err)
        })
    }

    changeCatDropDown =(result, selectedVals) =>{
        if(!selectedVals){
            this.setState({graphData: []})
            return;
        }

        ReactDOM.findDOMNode(this)

        this.setState({dropDownSelectedVals : selectedVals});
        let i = 0;
        let genres = [];
        if(selectedVals == null){
            document.getElementById("chartCategoryCanvas").innerHTML = '';
            this.setState({genre: []});
            return;
        }


        for(i = 0; i < selectedVals.length; i++){
            genres.push("'"+ selectedVals[i].value.replace(/\"/g, "")+"'")
        }
        this.setState({genreFilter: genres});
        this.repopulateCharts(this.state.measureFilter, genres, this.state.vtdetectionsFilter, "", this.state.index);

    }

    onVTFilterChange =(result, selectedVals) => {
        this.setState({"selectedMeasure":  "PermissionAll"});
        let filters = [];
        if (selectedVals) {

            for (let i in selectedVals) {
                filters.push(selectedVals[i].value)
            }
        }

        this.setState({"vtdetectionsFilter" : filters});
        this.repopulateCharts(this.state.measureFilter,this.state.genreFilter, filters, "", this.state.index);


    }

    onFilterChange =(result, selectedVals) =>{
        let filters = [];
        if(selectedVals){
            for(let i in selectedVals){
                filters.push(selectedVals[i].value)
            }
        }
        this.repopulateCharts(filters, this.state.genreFilter, this.state.vtdetectionsFilter, "PermissionAll", this.state.index);

    }


    repopulateCharts(measureFilter, genreFilter, vtdetectionFilter, measure, index) {
        if(genreFilter == undefined || genreFilter.length == 0)
            return;

        if (measure === "PermissionAll" || this.state.selectedMeasure === "Action") {
            measureFilter.join(",");
            this.populatePermissionsCount(measureFilter, vtdetectionFilter.join(), index);
        }  else {
            this.setState({"genreFilter": genreFilter});
            this.populateGenrePermissionCount(genreFilter.join(), vtdetectionFilter.join(","), index);
        }
    }

    populateCategoryPermissionCount =(filters, vtdetections)=>{
        let data = [];
        let permissionCategories = this.state.filterSuggestions;
        let genres = this.state.xAxisGenre;

        for(let i = 0; i < filters.length; i++){
            for(let j = 0; j < genres.length; j++){
                let genreTemp = genres[j];
                let genre = "'"+ genres[j].replace(/\"/g, "")+"'";
                let category = filters[i];
                axios.get('/api/getPermissionsByGenre/'+category+"?genres="+encodeURIComponent(genre) +"&vtdetections=" + vtdetections).then((result)=>{
                    data.push({name: category, total : result.data[0][category], Genre: genreTemp});
                }).then(()=>{
                    if(data.length == filters.length * genres.length){
                        this.setState({permissionCount: data});
                        this.plotCategoryGraph();
                    }

                }).
                catch((err)=>{
                    console.log(err)
                })
            }

        }
    }

    populateDevPermissionCount =()=>{
        let genres = this.state.xAxisGenre.join(",");
        let categories = this.state.filterSuggestions.join(",");
        this.setState({rotate : true})
        axios.get('/api/v2/getPermissionsByGenre?categories = '+categories+"& genres="+encodeURIComponent(genres)).then((result)=>{
            this.setState({rotate : false})
            this.setState({permissionCount: result.data});
        }).then(() => {
            this.plotPermissionGraph();
        }).catch((err) => {
            console.log(err)
        })
    }

    populatePermissionsCount =(permissionIds, vtdetections, index)=> {

        if(this.state.xAxisGenre.length == 0)
            return;

        let genres = this.state.xAxisGenre.join(",");
        this.setState({rotate : true})
        axios.get('/api/v2/getGenrePermissionUsageCount?permissionIds=' + permissionIds + "&genres=" + genres + "&vtdetections=" + vtdetections+"&count="+index).then((result) => {
            this.setState({rotate : false})
            this.setState({permissionCount: result.data});
        }).then(() => {
            this.plotPermissionGraph();
        }).catch((err) => {
            console.log(err)
        })
    }

    populatePermissions =() =>{
        this.setState({rotate : true})
        axios.get('/api/getPermissions').then((result)=>{
            this.setState({permissions: result.data});
            this.setState({rotate : false})
            const dataSuggestions = result.data.map(entry => ({

                value: entry.pid,
                label: entry.permission,
            }))
            this.setState({filterSuggestions: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
    }

    populateSystemActions =() =>{
        this.setState({rotate : true})
        axios.get('/api/getSystemActions').then((result)=>{
            this.setState({rotate : false})
            this.setState({systemActions: result.data});
            const dataSuggestions = result.data.map(entry => ({
                value: entry.pid,
                label: entry.permission.split(".").pop(-1),
            }))
            this.setState({filterSuggestions: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
    }

    populateCategory =() =>{

        let result = [{name: "Calendar"}, {name: "Camera"}, {name: "Contacts"}, {name: "Location"}, {name: "Microphone"}, {name: "Phone"}, {name: "Sensor"}, {name: "SMS"}, {name: "Storage"}]
        const dataSuggestions = result.map(entry => ({
            value: entry.name,
            label: entry.name,
        }))
        this.setState({filterSuggestions: dataSuggestions});

    }

    onChangeRadio = (event) =>{
        this.setState({index: event.target.value})
        this.repopulateCharts(this.state.measureFilter,this.state.genreFilter, this.state.vtdetectionsFilter, "",  event.target.value);
    };

    renderChart =()=>{


        const chartOptions = {
            title : "Number of Permissions by Application Genre",
            series : this.state.series,
            xAxis : this.state.xAxisGenre

        }

        const pieChartOptions = {
            title : "Number of Permissions by Application Genre",
            series : this.state.pieSeries
        }

        const bubbleChartOptions = {
            title : "Number of Permissions by Application Genre",
            name: "Genre",
            series : this.state.bubbleSeries,
            labelLimit: 5
        }

        const heatMapOptions = {
            title : "Number of Permissions by Application Genre",
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
        this.repopulateCharts(this.state.measureFilter,this.state.genreFilter, filters, "", this.state.index);
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

        const dropDownOptionsVTDetection ={
            suggestions : this.state.vtdetectionSuggestions,
            title: "Select Malicious Index"
        }

        const dropDownOptions ={
            suggestions : this.state.filterSuggestions,
            title: "Select Permission"
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

                    <CategoryDropDown id="categoryDropDown" style={{width: "30%"}} data = {this.state.suggestions} onChange={this.changeCatDropDown.bind(this)}/>


                    {(this.props.options.index && this.props.options.index == "Malicious") || this.state.index == "Malicious" ? (
                        <div style={{ display: "flex", alignItems: "stretch" }}>
                            <div><FormControlLabel style={{ marginLeft: "5px", marginRight: "5px" }} value="start" control={<Checkbox color="primary" />} label="Show Slider" labelPlacement="start" onChange={this.onSliderChecked.bind(this)}/></div>
                            {!this.state.isChecked
                                ? (<div> <GenericDropDown  id="VTDropDown" style={{ marginLeft: "1%" }} data={dropDownOptionsVTDetection} onChange={this.onVTFilterChange.bind(this)}/> </div>)
                                : (<div style={{ width: "300px", marginRight: "20px"  }}> <Typography id="range-slider" gutterBottom></Typography>
                                    <Slider max="54" min={1} value={this.state.rangeValue} onChangeCommitted={this.onVTSliderFilterChange.bind(this)} valueLabelDisplay="auto" aria-labelledby="range-slider" getAriaValueText={this.valuetext.bind(this)}/></div>)
                            }
                        </div>
                    ) : null}


                    <GenericDropDown id="filterDropDown"  style={{marginLeft: "1%"}}  data = {dropDownOptions} onChange={this.onFilterChange.bind(this)}/>
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

                    <Avatar style={{ marginLeft: "10px", backgroundColor: green[500], color: '#fff'}} onClick={this.changeChart.bind(this, "heat")}>
                        <TableChartIcon />
                    </Avatar>

                </Grid>

                <Paper elevation={3} style={{ width: "100%", height: "400px"}}>
                    {this.state.rotate ? <CircularProgress color="secondary"  style={{marginTop : "10%"}} /> : this.renderChart()}
                </Paper>

            </div>
        )
    }
}