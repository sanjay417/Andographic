import React, { Component } from 'react';
import {CategoryDropDown} from './index';
import BarChart from "./Chart";
import {Button,Icon } from "@material-ui/core";
import {GroupedBarChart} from './index'
import axios from 'axios';
import jsPDF from 'jspdf';
import canvg from 'canvg';
import d3_save_pdf from 'd3-save-pdf';
import * as d3 from "d3";
import GetApp from '@material-ui/icons/GetApp';
import ReactDOM from 'react-dom';

export default class DeveloperView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multi : [],
            suggestions :[],
            devAppAndCount : [],
            graphData :[],
            genreCount : [],
            filteredDevAppCount : [],
            dropDownSelectedVals: []
        }
    }

    componentDidMount(){
        this.populateGenres();
    };

    populateGenres =() =>{
        axios.get('/api/getGenre').then((result)=>{
            this.setState({devAppAndCount: result.data});
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
        let dataToPlot = [];
        let i;
        for(i = 0; i < this.state.genreCount.length; i++){
            dataToPlot.push({
                group : this.state.genreCount[i].genre,
                field1: this.state.genreCount[i].total,
            })
        }
        document.getElementById("chartCategoryCanvas").innerHTML = '';
        this.setState({graphData: dataToPlot})

    }

    populateDevPermissionCount =(genres)=>{
        axios.get('/api/getGenreCount?genres='+encodeURIComponent(genres)).then((result)=>{
            this.setState({genreCount: result.data});
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
            this.setState({genreCount: []});
            return;
        }


        for(i = 0; i < selectedVals.length; i++){
            genres.push("'"+ selectedVals[i].value.replace(/\"/g, "")+"'")
        }
        this.populateDevPermissionCount(genres.join());

    }

    removeChartCanvas = () =>{
        var element = document.getElementById('chartCategoryCanvas');
        if(element)
         document.getElementById("chartCategoryCanvas").innerHTML = '';
    }

    download =()=>{
        if(this.state.graphData && this.state.graphData.length != 0){
            d3_save_pdf.save(d3.select('#chartCategoryCanvas svg').node(), {filename: 'AndroidDataInsight'});
        }
    }


    render() {
        this.removeChartCanvas();
        const attributes = {
            showLegend : false,
            color :   ["#98abc5", "#8a89a6", "#AF7AC5", "#f4a460", "#E59866","#F7DC6F", "#98abc5","#96cde5"],
            legend : ['Microphone','Location','Contacts','Camera', 'Calender'],
            elem : 'chartCategoryCanvas',
            selectedDevelopers: this.state.dropDownSelectedVals,
            title : "Number of Permissions by Application Genre"

        }
        return (
            <div>
                <CategoryDropDown id="categoryDropDown" data = {this.state.suggestions} onChange={this.changeCatDropDown.bind(this)}/>
                <div id = 'chartCategoryCanvas' style={{boxShadow : "2px 2px 2px 2px #a8a8a8", height: "25.7em", width: "100%"}}>
                    <GroupedBarChart data ={this.state.graphData} attributes = {attributes} />
                </div>
                <Button variant="contained"  color="primary" onClick={this.download} style={{marginTop :"10px"}} >Download</Button>

            </div>
        )
    }
}