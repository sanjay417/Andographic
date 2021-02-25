import React, { Component } from 'react';
import {
    ScatterChart,
    ColumnChart,
    GenericDropDown,
    HeatMapChart,
    PieChart,
    GroupColumnChart,
    BubbleChart,
    HeatMap,
    BubbleChartDrill, WordCountChart,
    ScatterHeatChart
} from './index';
import axios from 'axios';
import Paper from "@material-ui/core/Paper/Paper";
import { green, pink, blue, red } from '@material-ui/core/colors';
import {Button, CircularProgress} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import BarChartIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Grid from "@material-ui/core/Grid";
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import TableChartIcon from '@material-ui/icons/TableChart';

export default class Correlation extends Component {

    constructor(props) {
        super(props);
        this.state = {

            measures: [{value: "permission", label: "Permission"},
                {value: "action", label: "System Action"}],
            rotate: false,
            filter: "",
            appData: [],
            genres: [],
            series: [],
            allSeries: [],
            create: false,
            filteredSeries: [],
            type: "",
            subgraph: false,
            chartType: "heat",
            heatSeries: [],
            allHeatSeries: [],
            filteredHeatSeries: [],
            suggestions: [],
            heatSubgraph: false

        }
    }

    componentDidMount(){
        this.populateGenres();
    };

    populateGenres =() =>{
        axios.get('/api/getGenre').then((result)=>{
            this.setState({genres: result.data});
            const dataSuggestions = result.data.map(dev => ({
                value: dev.Genre,
                label: dev.Genre
            }))
            this.setState({suggestions: dataSuggestions});
        }).then(()=>{
            //this.plotGraph();

        }).catch((err)=>{
            console.log(err)
        })
    }


    populatePermissions =(type) =>{

        let series = [];
        let heatSeries = [];
        let allData = []
        let map = {};
        this.setState({rotate: true});
        let count = 0;

        let genres = this.state.genres.filter(function (data) {
            return data.Genre != null;
        })
        console.log("Genre....." +genres.length)
        for(let i in genres){
            let genre = this.state.genres[i].Genre
            if(genre != null){
                let item = {
                    name: genre,
                    color: this.getRandomColor(),
                    data:[],
                    dataGrouping: {
                        approximation: 'average'
                    }
                }

        /*        let itemHeat = {
                    name: genre,
                    color: 'black',
                    data:[],
                    dataGrouping: {
                        approximation: 'average'
                    },
                    keys: ["x","y", "color"]
                }
*/

                genre = genre.replace(/\"/g, "");

                axios.get('/api/getPermCorrelation?type='+type+'&genre=' + encodeURIComponent(genre)).then((result)=>{
                    let resultData = result.data;

                    for(let i = 0; i < resultData.length; i++){
                        item.data.push( [resultData[i].vtdetection, resultData[i].count])
                        //itemHeat.data.push( [resultData[i].vtdetection, resultData[i].count, "pink"])
                        allData.push([resultData[i].vtdetection, resultData[i].count]);
                        let key = resultData[i].vtdetection+","+resultData[i].count;
                        map[key] = map[key] == undefined ? 1 :  map[key] + 1;
                    }
                    count = count + 1;

                }).then(()=>{
                    series.push(item)
                    //heatSeries.push(itemHeat)
                   // console.log(count);
                    if(count == (genres.length - 1)){
                        this.setState({series: series})
                        this.setState({allSeries: series})
                       // this.setState({heatSeries: heatSeries})
                        //this.setState({allHeatSeries: heatSeries})
                        this.setState({rotate: false});
                        this.setState({map: map});
                        let items = this.calculateHeatMap(allData, map);
                        this.setState({heatSeries: items})
                        this.setState({allHeatSeries: items})
                    }
                }).catch((err)=>{
                    console.log(err)
                })

            }
        }



    }

    getColor=(number)=>{

        if(number > 10000){
            return "red";
        } else if(number > 5000){
            return "orange";
        } else if(number > 1000){
            return "yellow"
        }else if(number > 1000){
            return "lightgreen"
        }else if(number > 100){
            return "green"
        }else{
            return "black"
        }

    }


    getItem=(items, value)=>{
        let item = []
        if(value > 10000){
            item = items[0]
        } else if(value > 5000){
            item = items[1]
        }else if(value > 1000){
            item = items[2]
        }else if(value > 100){
            item = items[3]
        }else if(value > 50){
            item = items[4]
        } else if(value > 10){
            item = items[5]
        }else if(value > 1){
            item = items[6]
        }else{
            item = items[7]
        }

        return item;
    }

    calculateHeatMap=(data, map)=>{
        let items = [{name: ">10000", color: "#FF0000", data: []},
            {name: ">5000", color: "#FFFF00", data: []},
            {name: ">1000", color: "#ffa500", data: []},
            {name: ">100", color: "#C71585", data: []},
            {name: ">50", color: "#0000ff", data: []},
            {name: ">10", color: "#8a2be2", data: []},
            {name: ">1", color: "#00d800", data: []},
            {name: "1", color: "#9dceff", data: []}]


        for (const key of Object.keys(map)) {
            let value = map[key]
            let item = this.getItem(items, value)
            let arr = key.split(",");
            item.data.push([parseInt(arr[0]), parseInt(arr[1])])
            console.log(key, value);
        }

        return items;

        //this.setState({allHeatSeries: heatSeries})
    }


   getRandomColor=() =>{
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    filterData(genre) {

        let series = [];
        let allData = []
        let map = {};
        if (genre != null) {
            let item = {
                name: genre,
                color: this.getRandomColor(),
                data: [],
                dataGrouping: {
                    approximation: 'average'
                }
            }

/*            let itemHeat = {
                name: genre,
                color: '#8989ff',
                data:[],
                dataGrouping: {
                    approximation: 'average'
                }
            }*/

            genre = genre.replace(/\"/g, "");

            axios.get('/api/getPermCorrelation?type=' + this.state.type + '&genre=' + encodeURIComponent(genre)).then((result) => {
                let resultData = result.data;

                for (let i = 0; i < resultData.length; i++) {
                    item.data.push([resultData[i].vtdetection, resultData[i].count])
                    allData.push([resultData[i].vtdetection, resultData[i].count]);
                    let key = resultData[i].vtdetection+","+resultData[i].count;
                    map[key] = map[key] == undefined ? 1 :  map[key] + 1;
                }


            }).then(() => {
                series.push(item)
                this.setState({filteredSeries: series});
                this.setState({subgraph: true});
                this.setState({heatSubgraph: true});
                let items = this.calculateHeatMap(allData, map);
                this.setState({filteredHeatSeries: items});
                this.setState({heatSubgraph: true});
            });

        }

    }

    reset(){
        this.forceUpdate()
        this.setState({rotate: true});
        this.setState({series:  this.state.allSeries});
        this.setState({rotate: false});
        this.setState({filteredSeries:  []});
        this.setState({subgraph: false});


    }

    resetHeat(){

        this.setState({filteredHeatSeries: []});
        this.setState({heatSubgraph: false});
        this.setState({heatSeries:  this.state.allHeatSeries});
    }


    changeChart =(type)=>{
        this.setState({chartType: type});
        this.reset();
        this.resetHeat();
    }


    populateData =(filter) =>{

        switch (filter) {
            case 'permission':
                this.setState({'title': 'Correlation of Permission Usage and Malicious Index of applications'})
                this.populatePermissions('permission');
                this.setState({type: 'permission'})
                break;
            case  'action':
                this.setState({'title': 'Correlation of System Action Usage and Malicious Index of applications'})
                this.populatePermissions('action');
                this.setState({type: 'action'})
                break;
        }
    }

    onFilterChange =(result, selectedVals) => {
        let filters = [];
        if (selectedVals) {
            for (let i in selectedVals) {
                filters.push(selectedVals[i].value)
            }
        }

        this.setState({"filter" : filters[0]});

        this.populateData(filters[0]);

    }

    onGenreChange =(result, selectedVals) => {
        let filters = [];
        if (selectedVals) {
            for (let i in selectedVals) {
                filters.push(selectedVals[i].value)
            }
        }

        this.setState({"genreFilter" : filters[0]});

        if(filters.length == 0){
            this.resetHeat();
        }else{
            this.filterData(filters[0]);
        }
    }



    render() {

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


        const chartOptions ={
            series : this.state.series,
            title: this.state.title,
            titleX: "Malicious Index",
            titleY: "Count"
        }

        const chartOptions1 ={
            series : this.state.filteredSeries,
            title: this.state.title,
            titleX: "Malicious Index",
            titleY: "Count"
        }

        const heatChartOptions ={
            series : this.state.heatSeries,
            title: this.state.title,
            titleX: "Malicious Index",
            titleY: "Count"
        }

        const heatChartSubOptions ={
            series : this.state.filteredHeatSeries,
            title: this.state.title,
            titleX: "Malicious Index",
            titleY: "Count"
        }

        const dropDownOptions ={
            suggestions : this.state.suggestions,
            title: "Select Genre"
        }


        return (
            <div style={{ minWidth: "80em"}}>

                <div  style={{display: "flex"}}>
                    <GenericDropDown id="VTDropDown"  style={{marginLeft: "1%", width :"70%"}}  data = {dropDownOptionsMeasure} onChange={this.onFilterChange.bind(this)}/>
                    { this.state.chartType == "heat" ?  <GenericDropDown id="filterDropDown"  style={{marginLeft: "1%"}}  data = {dropDownOptions} onChange={this.onGenreChange.bind(this)}/> : null}
                </div>

                <Grid container justify="right" alignItems="right" style={{ marginBottom: "10px", marginRight: "1%", width: "15%"}} >
                    <Avatar style={{ marginLeft: "10px", backgroundColor: red[500], color: '#fff'}} onClick={this.changeChart.bind(this, "scatter")}>
                        <BubbleChartIcon />
                    </Avatar>

                    <Avatar style={{ marginLeft: "10px", backgroundColor: green[500], color: '#fff'}} onClick={this.changeChart.bind(this, "heat")}>
                        <TableChartIcon />
                    </Avatar>


                </Grid>

                <Paper elevation={3} style={{ width: "100%", height: "600px"}}>

                    { this.state.rotate && this.state.chartType == "scatter" ? <CircularProgress color="secondary"  style={{marginTop: "10%"}}/> : this.state.subgraph || this.state.chartType != "scatter" ? null :
                                <ScatterChart options={chartOptions} onChange={this.filterData.bind(this)}
                                              onReset={this.reset.bind(this)}/> }

                    {this.state.subgraph && this.state.chartType == "scatter"?
                        <div> <ScatterChart options={chartOptions1} onChange={this.filterData.bind(this)} onReset={this.reset.bind(this)}/>
                        <Button variant="raised" component="span" variant="contained" color="primary" onClick={this.reset.bind(this)} style={{marginTop: "10px"}} >
                        Back
                        </Button>
                        </div>
                        : null
                    }

                    { this.state.rotate && this.state.chartType == "heat" ? <CircularProgress color="secondary"  style={{marginTop: "10%"}}/> : this.state.heatSubgraph || this.state.chartType != "heat" ? null :
                        <ScatterHeatChart options={heatChartOptions} onChange={this.filterData.bind(this)}
                                      onReset={this.reset.bind(this)}/> }

                    {this.state.heatSubgraph && this.state.chartType == "heat"?
                        <div> <ScatterHeatChart options={heatChartSubOptions} />
                            <Button variant="raised" component="span" variant="contained" color="primary" onClick={this.resetHeat.bind(this)} style={{marginTop: "10px"}} >
                                Back
                            </Button>
                        </div>
                        : null
                    }
                </Paper>

            </div>
        )
    }
}