import React, { Component } from 'react';
import {PermissionCategoryDropDown, CategoryDropDown} from './index';
import BarChart from "./Chart";
import {Paper, Grid, Button} from "@material-ui/core";
import {GroupedBarChart} from './index'
import axios from 'axios';
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";


export default class GenrePermissionCategoryView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multi : [],
            suggestionsPermissions :[],
            suggestionsGenres : [],
            systemActions : [],
            graphData :[],
            permissionCount : [],
            filteredPermissions : [],
            permissionIDMapping : {},
            selectedGenre: [],
            selectedPermission: []
        }
    }

    componentDidMount(){
        this.populatePermissions();
        this.populateGenres();
    };


    getPermissionName =(id) =>{
        let permissionObj = this.state.suggestionsPermissions.find(elem => elem.value == id);
        return permissionObj.label;
    }

    populatePermissions =() =>{

        let result = [{name: "Calendar"}, {name: "Camera"}, {name: "Contacts"}, {name: "Location"}, {name: "Microphone"}, {name: "Phone"}, {name: "Sensor"}, {name: "SMS"}, {name: "Storage"}]
        const dataSuggestions = result.map(entry => ({
            value: entry.name,
            label: entry.name,
        }))

        this.setState({suggestionsPermissions: dataSuggestions});

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

    plotGraph = (data) =>{
        let dataToPlot = []
        for(let i in data){
            let fieldVar = "field" + i;
            dataToPlot.push({
                group : data[i].name,
                field1: data[i].count
            })
        }
        document.getElementById("genrePermissionCategoryChartCanvas").innerHTML = '';
        this.setState({graphData: dataToPlot})

    }

    populateDevPermissionCount =(permissionCategories, genres)=>{
        let data = [];
        let i;
        for( i = 0; i < permissionCategories.length; i++){
            let category = permissionCategories[i];
            axios.get('/api/getPermissionsByGenre/'+permissionCategories[i]+"?genres="+encodeURIComponent(genres)).then((result)=>{
                data.push({name: category, count : result.data[0][category]});
            }).then(()=>{
                if(data.length == permissionCategories.length){
                    this.plotGraph(data);
                }

            }).
            catch((err)=>{
                console.log(err)
            })
        }
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
            if(this.state.selectedPermission.length != 0){
                isSelected = true;
            }
            permissions = this.state.selectedPermission;
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

            this.populateDevPermissionCount(filteredPermissions, genresVals.join(","));
        }

    }

    download =()=>{
        if(this.state.graphData && this.state.graphData.length != 0){
            d3_save_pdf.save(d3.select('#genrePermissionCategoryChartCanvas svg').node(), {filename: 'AndroidDataInsight'});
        }
    }

    removeChartCanvas = () =>{
        var element = document.getElementById('genrePermissionCategoryChartCanvas');
        if(element)
         document.getElementById("genrePermissionCategoryChartCanvas").innerHTML = '';
    }


    render() {
        this.removeChartCanvas();
        const attributes = {
            showLegend : true,
            color :   ["#98abc5", "#8a89a6", "#98abc5", "#f4a460", "#566573"],
            legend : ['Permissions'],
            elem : 'genrePermissionCategoryChartCanvas',
            title : "Number of Permissions by Dangerous Permissions Category in Application Genre"

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
                        <PermissionCategoryDropDown id="perDropDown" data = {this.state.suggestionsPermissions} onChange={this.changeDevDropDown.bind(this, "PermissionNameDropDown")}/>
                    </Grid>

                </Grid>
                <div id = 'genrePermissionCategoryChartCanvas' style={{boxShadow : "2px 2px 2px 2px #a8a8a8", height: "30em", width: "100%"}}>
                        <GroupedBarChart data ={this.state.graphData} attributes = {attributes}/>
                </div>
                <Button variant="contained"  color="primary" onClick={this.download} style={{marginTop :"10px"}} >Download</Button>
            </div>
        )
    }
}