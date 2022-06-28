import React, { Component } from 'react';
import {GenericDropDown, CategoryDropDown} from './index';
import BarChart from "./Chart";
import {Paper, Grid, Button} from "@material-ui/core";
import {GroupedBarChart} from './index'
import axios from 'axios';
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";


export default class GenreSystemActionsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multi : [],
            suggestionsActions :[],
            suggestionsGenres : [],
            systemActions : [],
            graphData :[],
            permissionCount : [],
            filteredPermissions : [],
            permissionIDMapping : {},
            selectedGenre: [],
            selectedActions: []
        }
    }

    componentDidMount(){
        this.populateSystemActions();
        this.populateGenres();
    };


    getPermissionName =(id) =>{
        let permissionObj = this.state.suggestionsActions.find(elem => elem.value == id);
        return permissionObj.label;
    }

    populateSystemActions =() =>{
        axios.get('/api/getSystemActions').then((result)=>{
            this.setState({systemActions: result.data});
            const dataSuggestions = result.data.map(entry => ({
                value: entry.pid,
                label: entry.permission.split(".").pop(-1),
            }))
            this.setState({suggestionsActions: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
    }

    populateGenres =() =>{
        axios.get('/api/getGenre').then((result)=>{
            this.setState({devAppAndCount: result.data});
            const dataSuggestions = result.data.map(dev => ({
                value: dev.Genre,
                label: dev.Genre
            }))
            this.setState({suggestionsGenres: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
    }

    plotGraph = () =>{
        var dataToPlot = [];
        var i;
        const permissionCount = this.state.permissionCount;
        for(i = 0; i < permissionCount.length; i++){
            dataToPlot.push({
                group : this.getPermissionName(permissionCount[i].pid),
                field1: permissionCount[i].total
            })
        }
        document.getElementById("genreSystemActionCanvas").innerHTML = '';
        this.setState({graphData: dataToPlot})

    }

    populateActionsPermissionCount =(permissionIds, genres)=>{

        axios.get('/api/getGenrePermissionUsageCount?permissionIds='+ permissionIds+"&genres="+ encodeURIComponent(genres)).then((result)=>{
            this.setState({permissionCount: result.data});
        }).then(()=>{
            this.plotGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    changeDevDropDown =(dropdown, result) =>{

        if(!result || result.length == 0){
            this.setState({graphData: []})
            return;
        }

        let isSelected = false;
        let permissions;
        let genres;
        if(dropdown == "CategoryDropDown"){
            this.setState({selectedGenre: result});
            if(this.state.selectedActions.length != 0){
                isSelected = true;
            }
            permissions = this.state.selectedActions;
            genres = result;
        }else{
            this.setState({selectedPermission: result});
            if(this.state.selectedGenre.length != 0){
                isSelected = true;
            }
            genres = this.state.selectedGenre;
            permissions = result;
        }

        if(isSelected){
            let i ;
            let permissionIds;
            let filteredPermissions = [];
            for(i in permissions){
                filteredPermissions.push(permissions[i]);
            }
            this.setState({filteredPermissions : filteredPermissions});

            let genresVals = [];
            console.log(genres);
            for(i = 0; i < genres.length; i++){
                genresVals.push("'"+ genres[i].replace(/\"/g, "")+"'")
            }

            this.populateActionsPermissionCount(filteredPermissions.join(","), genresVals.join(","));
        }

    }

    download =()=>{
        if(this.state.graphData && this.state.graphData.length != 0){
            d3_save_pdf.save(d3.select('#genreSystemActionCanvas svg').node(), {filename: 'AndroidDataInsight'});
        }
    }

    removeChartCanvas = () =>{
        var element = document.getElementById('genreSystemActionCanvas');
        if(element)
         document.getElementById("genreSystemActionCanvas").innerHTML = '';
    }


    render() {
        this.removeChartCanvas();
        const attributes = {
            showLegend : true,
            color :   ["#98abc5", "#8a89a6", "#98abc5", "#f4a460", "#566573"],
            legend : ['System Actions'],
            elem : 'genreSystemActionCanvas',
            title : "Number of System Actions by System Action Name in Application Genre"

        }

        return (
            <div>
                <Grid container>
                    <Grid item xs={5}>
                        <CategoryDropDown id="catDropDown" data = {this.state.suggestionsGenres} onChange={this.changeDevDropDown.bind(this, "CategoryDropDown")}/>
                    </Grid>

                    <Grid item xs={1}>
                    </Grid>

                    <Grid item xs={5}>
                        <GenericDropDown id="perDropDown" data = {this.state.suggestionsActions} onChange={this.changeDevDropDown.bind(this, "SystemActionDropDown")}/>
                    </Grid>

                </Grid>
                <div id = 'genreSystemActionCanvas' style={{boxShadow : "2px 2px 2px 2px #a8a8a8", height: "25.7em", width: "100%"}}>
                        <GroupedBarChart data ={this.state.graphData} attributes = {attributes}/>
                </div>
                <Button variant="contained"  color="primary" onClick={this.download} style={{marginTop :"10px"}} >Download</Button>
            </div>
        )
    }
}