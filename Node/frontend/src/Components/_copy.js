import React, { Component } from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {ListItem,ListItemIcon,ListItemText,IconButton,Divider, List,Typography, CssBaseline, Toolbar,
    AppBar,Drawer } from '@material-ui/core';
import {InsertChartOutlinedOutlined, ViewList, ChevronLeft, ChevronRight} from '@material-ui/icons';
import {CategoryTabs, TableView, ReactTable, ColumnChart, PieChart} from './index';
import {Link, HashRouter, Route, Switch} from 'react-router-dom';
import {GroupedBarChartForConsole,PieClass} from './index'
import {DeveloperAppDropDown} from './index';
import axios from 'axios';
import Paper from "@material-ui/core/Paper/Paper";



export default class GenreSystemActionsView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            multi : [],
            suggestions :[],
            devAppAndCount : [],
            graphData :[],
            filter: "",
            permissionCount : [],
            permissionGraphData : [],
            filteredDevAppCount : [],
            dropDownSelectedVals: [],
            ratingGraphData: [],
            androidVersionGraphData: [],
            genreGraphData: [],
            contentRatingGraphData: [],
            suggestionsAll : [],
            systemActionsCount: [],
            developerName: '',
            actionGraphData:[],


            permissionSeries : [],
            permissionXaxis :[],
            systemActionSeries : [],
            systemActionXaxis :[],
            ratingSeries : [],
            ratingXaxis :[],
            androidVersionSeries : [],
            genreVersionSeries: [],
            contentRatingVersionSeries: []

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

    //populates the data for permissions bar chart
    populatePermissions = (developer) => {

        axios.get(`/api/getDevConsolePermissions?developer=${developer}`)
            .then((result)=>{
                if(result != null && result.data != null && result.data[0] != null){

                    let series = [];
                    let xAxis = [];
                    let permissionObj = result.data[0];
                    let element = {name: "Permissions", data : []};
                    for (let key of Object.keys(permissionObj)) {
                        xAxis.push(key);
                        element.data.push(permissionObj[key]);
                    }

                    series.push(element);
                    this.setState({permissionSeries: series});
                    this.setState({permissionXaxis: xAxis});

                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    populateRatings = (developer) => {
        axios.get(`/api/getDevConsoleRatings?developer=${developer}`)
            .then((result)=>{
                if(result != null && result.data != null && result.data[0] != null){
                    var ratingObj = result.data[0]
                    let series = [];
                    let xAxis = [];
                    let element = {name: "Ratings", data : []};
                    for (let key of Object.keys(ratingObj)) {
                        xAxis.push(key);
                        element.data.push(ratingObj[key]);
                    }

                    series.push(element);
                    this.setState({ratingSeries: series});
                    this.setState({ratingXaxis: xAxis});
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    populateAndroidVersion = (developer) => {
        axios.get(`/api/getDevConsoleAndroidVersion?developer=${developer}`)
            .then((result)=>{
                // console.log('Successfully got data from the request')
                if(result != null && result.data != null && result.data[0] != null){
                    var versionObjArray = result.data
                    let series = [];
                    let element = {name: "Android Version", data : []};
                    for (let key of Object.keys(versionObjArray)) {
                        let obj = { name : versionObjArray[key].AndroidVersion, y :versionObjArray[key].total}
                        element.data.push(obj);
                    }

                    series.push(element);
                    this.setState({androidVersionSeries: series});


                    /*const androidVersionGraphData = versionObjArray.map(key => ({
                        group: key["AndroidVersion"],
                        field1: key["total"]
                    }))

                    androidVersionSeries
                    this.setState({androidVersionGraphData: androidVersionGraphData});*/
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    populateGenre = (developer) => {
        axios.get(`/api/getDevConsoleGenre?developer=${developer}`)
            .then((result)=>{
                // console.log('Successfully got data from the request')
                if(result != null && result.data != null && result.data[0] != null){
                    var GenreObjArray = result.data
                    let series = [];
                    let element = {name: "Genre", data : []};
                    for (let key of Object.keys(GenreObjArray)) {
                        let obj = { name : GenreObjArray[key].Genre, y :GenreObjArray[key].total}
                        element.data.push(obj);
                    }

                    series.push(element);
                    this.setState({genreVersionSeries: series});

                    /*const genreGraphData = GenreObjArray.map(key => ({
                        group: key["Genre"],
                        field1: key["total"]
                    }))
                    // console.log(genreGraphData)
                    this.setState({genreGraphData: genreGraphData});*/
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    populateContentRating = (developer) => {
        axios.get(`/api/getDevConsoleContentRating?developer=${developer}`)
            .then((result)=>{
                if(result != null && result.data != null && result.data[0] != null){
                    let contentRatingObj = result.data
                    let series = [];
                    let element = {name: "Content Rating", data : []};
                    for (let key of Object.keys(contentRatingObj)) {
                        let obj = { name : contentRatingObj[key].ContentRating, y :contentRatingObj[key].total}
                        element.data.push(obj);
                    }

                    series.push(element);
                    this.setState({contentRatingVersionSeries: series});

                   /*
                    const contentRatingGraphData = contentRatingObj.map(key => ({
                        group: key["ContentRating"],
                        field1: key["total"]
                    }))
                    this.setState({contentRatingGraphData: contentRatingGraphData});*/
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    populateDevPermissionCount =(developers)=>{
        axios.get('/api/getPermissionCountByDeveloper?developers='+developers).then((result)=>{
            this.setState({permissionCount: result.data});
        }).then(()=>{
            this.populateSystemActions(developers);
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    populateDeveloperAction = (developer) => {
        axios.get(`/api/getDevConsoleActions?developer=${developer}`)
        .then((result)=>{
            // console.log('Successfully got data from the request')
            if(result != null && result.data != null && result.data[0] != null){
                let actionDataObj = result.data
                let series = [];
                let xAxis = [];
                let element = {name: "System Actions", data : []};
                for (let key of Object.keys(actionDataObj)) {
                    xAxis.push(actionDataObj[key].Title);
                    element.data.push(actionDataObj[key].total);
                }

                series.push(element);
                this.setState({systemActionSeries: series});
                this.setState({systemActionXaxis: xAxis});

            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    populateSystemActions =(developers)=>{
        axios.get('/api/getSystemActionsCountByDevelopers?developers='+encodeURIComponent(developers)).then((result)=>{
            this.setState({systemActionsCount: result.data});
        }).
        then(()=>{
            this.plotGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    changeDevDropDown =(result, selectedVals) =>{
        this.setState({dropDownSelectedVals : selectedVals});
        const devAppCount = this.state.devAppAndCount.filter(function (data) {
            return result.includes(data.DeveloperName);
        });

        this.setState({filteredDevAppCount : devAppCount});

        var i ;
        var developers = [];
        for(i in devAppCount){
            developers.push(devAppCount[i].DeveloperName.replace(/\"/g, ""))
        }

        var developers = developers.join();
        console.log('printing selected values');
        console.log(this.state.dropDownSelectedVals);
        var DeveloperName = (  this.state.dropDownSelectedVals && this.state.dropDownSelectedVals[0] != undefined )? this.state.dropDownSelectedVals[0].label : null
        console.log('DeveloperName', DeveloperName);
        this.setState({'developerName': DeveloperName})
        //this.populateDevPermissionCount(developers);

        //insert API calls here;
        this.populateAndroidVersion(result);
        this.populatePermissions(result);
        this.populateDeveloperAction(result)
        this.populateRatings(result);
        this.populateGenre(result);
        this.populateContentRating(result);
    }

    filterSuggestions=(filterString) =>{
        const matches = this.state.suggestionsAll.filter(s => s.label.toLowerCase().includes(filterString.toLowerCase()));
        this.setState({suggestions : matches});
        this.setState({filter : filterString});
        console.log("matches")
        console.log(matches)
    }

    removeChartCanvas = () =>{

        let element = document.getElementById('chartCanvas1');
        if(element)
            document.getElementById("chartCanvas1").innerHTML = '';

         element = document.getElementById('chartCanvas2');
        if(element)
            document.getElementById("chartCanvas2").innerHTML = '';

         element = document.getElementById('chartCanvas3');
        if(element)
            document.getElementById("chartCanvas3").innerHTML = '';

    }

    render(){
        this.removeChartCanvas();

        const attributes1 = {
            showLegend : false,
            color :   ["#98abc5", "#8a89a6", "#AF7AC5", "#7FB3D5", "#E59866"],
            legend : ['Permissions'],
            elem : 'chartCanvas1',
            selectedDevelopers: this.state.dropDownSelectedVals,
            title: "Permissions By Category"
        }

        const attributes2 = {
            showLegend : false,
            color :   ["#98abc5", "#8a89a6", "#AF7AC5", "#7FB3D5", "#E59866"],
            legend : ['Number of Ratings'],
            elem : 'chartCanvas2',
            selectedDevelopers: this.state.dropDownSelectedVals,
            title: "Actions"
        }

        const attributes3 = {
            showLegend : false,
            color :   ["#98abc5", "#8a89a6", "#AF7AC5", "#7FB3D5", "#E59866"],
            legend : ['Permissions'],
            elem : 'chartCanvas3',
            selectedDevelopers: this.state.dropDownSelectedVals,
            title: "Ratings"
        }

        const permissionChartOptions = {
            title : "Permissions By Category",
            series : this.state.permissionSeries,
            xAxis : this.state.permissionXaxis

        }

        const systemActionChartOptions = {
            title : "System Actions",
            series : this.state.systemActionSeries,
            xAxis : this.state.systemActionXaxis

        }

        const ratingsChartOptions ={
            title : "Ratings",
            series : this.state.ratingSeries,
            xAxis : this.state.ratingXaxis
        }


        const androidVersionChartOptions ={
            title : "Android Version",
            series : this.state.androidVersionSeries
        }

        const genreChartOptions ={
            title : "Genre",
            series : this.state.genreVersionSeries
        }

        const contentRatingChartOptions ={
            title : "Content Rating",
            series : this.state.contentRatingVersionSeries
        }

        return(
            <div>
                <h1>Developer Console</h1>
                <DeveloperAppDropDown id="devDropDown" data = {this.state.suggestions} onChange={this.changeDevDropDown.bind(this)}
                                      onKeyPress = {this.filterSuggestions.bind(this)} filter = {this.state.filter}/>

                <div style={{display: "flex"}}>
                    <Paper elevation={3} style={{marginLeft :"1%", width: "32%"}}>
                        <ColumnChart options = {permissionChartOptions} />
                    </Paper>

                    <Paper elevation={3} style={{marginLeft :"1%", width: "32%"}}>
                        <ColumnChart options = {systemActionChartOptions} />
                    </Paper>

                    <Paper elevation={3} style={{marginLeft :"1%", width: "32%"}}>
                        <ColumnChart options = {ratingsChartOptions} />
                    </Paper>
                </div>

                <div style={{display: "flex", marginTop :"1%"}}>
                    <Paper elevation={3} style={{marginLeft :"1%", width: "32%"}}>
                        <PieChart options = {androidVersionChartOptions} />
                    </Paper>

                    <Paper elevation={3} style={{marginLeft :"1%", width: "32%"}}>
                        <PieChart options = {genreChartOptions} />
                    </Paper>

                    <Paper elevation={3} style={{marginLeft :"1%", width: "32%"}}>
                        <PieChart options = {contentRatingChartOptions} />
                    </Paper>
                </div>

               /* <div id = 'chartCanvas'  style={{display: 'inline-flex'}} >
                    <div id = 'chartCanvas1' style={{width: "650px", height: "250px", boxShadow : "2px 2px 2px 2px #a8a8a8"}}>
                        <GroupedBarChartForConsole data ={this.state.permissionGraphData} width= {650} height ={250} attributes = {attributes1}/>
                    </div>
                    <div id = 'chartCanvas2' style={{width: "300px", height: "250px", boxShadow : "2px 2px 2px 2px #a8a8a8"}}>
                        <GroupedBarChartForConsole data ={this.state.actionGraphData} width= {300} height ={250}  attributes = {attributes2} style={{boxShadow : "2px 2px 2px 2px #a8a8a8"}}/>
                    </div>
                    <div id = 'chartCanvas3' style={{ width: "300px", height: "250px", boxShadow : "2px 2px 2px 2px #a8a8a8"}}>
                        <GroupedBarChartForConsole data ={this.state.ratingGraphData} width= {250} height ={250}  attributes = {attributes3} style={{boxShadow : "2px 2px 2px 2px #a8a8a8"}}/>
                    </div>
                </div>
                <div style={{display: 'inline-flex', marginTop: "10px"}} >
                    <div id = 'chartCanvas4' style={{ width: "300px", height: "250px",boxShadow : "2px 2px 2px 2px #a8a8a8" }}>
                        <PieClass
                            data={this.state.androidVersionGraphData}
                            width={300}
                            height={250}
                            innerRadius={60}
                            outerRadius={120}
                        />
                        <p>Android Version</p>
                    </div>

                    <div id = 'chartCanvas5' style={{width: "300px", height: "250px", marginLeft: "50px", boxShadow : "2px 2px 2px 2px #a8a8a8"}}>
                        <PieClass
                            data={this.state.genreGraphData}
                            width={300}
                            height={250}
                            innerRadius={60}
                            outerRadius={120}
                        />
                        <p>Genre</p>
                        <p></p>
                    </div>
                    <div id = 'chartCanvas6' style={{ width: "300px", height: "250px",marginLeft: "50px",  boxShadow : "2px 2px 2px 2px #a8a8a8"}}>

                        <PieClass
                            data={this.state.contentRatingGraphData}
                            width={300}
                            height={250}
                            innerRadius={60}
                            outerRadius={120}
                        />
                        <p>Content Rating</p>
                        <p></p>
                    </div>
                </div>*/
            </div>
        )
    }
}