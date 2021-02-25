import React, { Component } from 'react';
import {ApplicationDropDown, DeveloperDropDown} from './index';
import BarChart from "./Chart";
import Paper from "@material-ui/core/Paper";
import {GroupedBarChart} from './index'
import axios from 'axios';
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";
import {Button} from "@material-ui/core";


export default class DeveloperView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multi : [],
            suggestions :[],
            suggestionsAll : [],
            applications : [],
            graphData :[],
            applicationCount : [],
            systemActionsCount : [],
            dropDownSelectedVals: [],
            filter : ""
        }
    }

    componentDidMount(){
        this.populateGenres();
    };

    populateGenres =() =>{
        axios.get('/api/getApplications').then((result)=>{
            this.setState({applications: result.data});
            const dataSuggestions = result.data.map(dev => ({
                value: dev.title,
                label: dev.title
            }))
            this.setState({suggestionsAll: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
    }

    plotGraph = () =>{
        let dataToPlot = [];
        let i;
        for(i = 0; i < this.state.applicationCount.length; i++){
            dataToPlot.push({
                group : this.state.applicationCount[i].title,
                field1: this.state.applicationCount[i].permissionTotal,
                field2: this.state.systemActionsCount[i].actionTotal
            })
        }
        document.getElementById("chartCanvas").innerHTML = '';
        this.setState({graphData: dataToPlot})

    }

    populateSystemActions =(applications)=>{
        axios.get('/api/getSystemActionsCountByApplications?applications='+encodeURIComponent(applications)).then((result)=>{
            this.setState({systemActionsCount: result.data});
        }).
        then(()=>{
            this.plotGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    populateApplications =(applications)=>{
        axios.get('/api/getPermissionCountByApplication?applications='+encodeURIComponent(applications)).then((result)=>{
            this.setState({applicationCount: result.data});
        }).then(()=>{
            this.populateSystemActions(applications);
        }).catch((err)=>{
            console.log(err)
        })
    }

    changeDropDown =(result, selectedVals) =>{

        if(!selectedVals){
            this.setState({graphData: []})
            return;
        }

        this.setState({dropDownSelectedVals : selectedVals});
        let i = 0;
        let applications = [];
        for(i = 0; i < selectedVals.length; i++){
            applications.push("'"+ selectedVals[i].value.replace(/\"/g, "")+"'")
        }
        this.populateApplications(applications.join());

    }

    filterSuggestions=(filterString) =>{
        //const matches = this.state.suggestionsAll.filter(s => s.label.toLowerCase().includes(filterString.toLowerCase()));
        //this.setState({suggestions : matches});
        this.setState({filter : filterString});

        axios.get('/api/getApplicationsWithFilter?filter='+filterString).then((result)=>{
            //this.setState({applications: result.data});
            const dataSuggestions = result.data.map(dev => ({
                value: dev.title,
                label: dev.title
            }))
            this.setState({suggestions: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
    }

    download =()=>{
        if(this.state.graphData && this.state.graphData.length != 0){
            d3_save_pdf.save(d3.select('#chartApplicationCanvas svg').node(), {filename: 'AndroidDataInsight'});
        }
    }

    removeChartCanvas = () =>{
        var element = document.getElementById('chartApplicationCanvas');
        if(element)
         document.getElementById("chartApplicationCanvas").innerHTML = '';
    }

    render() {
        this.removeChartCanvas();
        const attributes = {
            showLegend : true,
            color :   ["#98abc5", "#8a89a6", "#96cde5", "#f4a460", "#A3E4D7","#F7DC6F", "#98abc5","#96cde5"],
            legend : ['System Actions', 'Permissions'],
            elem : 'chartApplicationCanvas',
            selectedDevelopers: this.state.dropDownSelectedVals,
            title : "Number of Permissions and System Actions by Application"

        }
        return (
            <div>
                <ApplicationDropDown id="categoryDropDown" data = {this.state.suggestions} onChange={this.changeDropDown.bind(this)}
                                     onKeyPress = {this.filterSuggestions.bind(this)} filter = {this.state.filter}/>
                    <div id = 'chartApplicationCanvas' style={{boxShadow : "2px 2px 2px 2px #a8a8a8", height: "25.7em", width: "100%"}}>
                            <GroupedBarChart data ={this.state.graphData} attributes = {attributes}/>
                    </div>
                    <Button variant="contained"  color="primary" onClick={this.download} style={{marginTop :"10px"}} >Download</Button>
            </div>
        )
    }
}