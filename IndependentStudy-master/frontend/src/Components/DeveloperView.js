import React, { Component } from 'react';
import {GroupColumnChart, DeveloperDropDown, GenericDropDown} from './index';
import BarChart from "./Chart";
import Paper from "@material-ui/core/Paper";
import {GroupedBarChart} from './index'
import axios from 'axios';
import {Button} from "@material-ui/core";
import d3_save_pdf from "d3-save-pdf";
import * as d3 from "d3";
import {green} from "@material-ui/core/colors";



export default class DeveloperView extends Component {

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
            measures: [{value: "PermissionAll", label: "PermissionAll"},
                {value: "Others", label: "Applications-Permissions-Actions"}],

            xAxis :[],
            series :[
                {name: "Applications", data : []},
                {name: "Permissions", data : []},
                {name: "System Actions", data : []},
            ],
            currentDevFilter: [],
            vtdetectionSuggestions: [],
            vtdetectionsFilter: []

        }
    }

    componentDidMount(){
        this.populateDevelopers(this.state.vtdetectionsFilter.join());
    };


    populateDevelopers =(vtdetections) =>{

        axios.get('/api/getDeveloperAndAppCount?vtdetections='+vtdetections).then((result)=>{
            this.setState({devAppAndCount: result.data});
            console.log("developerView", result)
            const dataSuggestions = result.data.map(dev => ({
                value: dev.DeveloperName != null ? dev.DeveloperName : "",
                label: dev.DeveloperName != null ? dev.DeveloperName : ""
            }))
            this.setState({suggestionsAll: dataSuggestions});
        }).catch((err)=>{
            console.log(err)
        })
    }

    plotPermissionGraph = () =>{


        let series = [
            {name: "Normal PermissionAll Category", data : []},
            {name: "Dangerous PermissionAll Category", data : []},
        ];

        let xAxis = [];
        const devAppCount = this.state.filteredDevAppCount;
        const test = this.state.systemActionsCount;
        for(let i = 0; i < devAppCount.length; i++){
            let developer = devAppCount[i].DeveloperName;
            xAxis.push(developer);

            let permission = this.state.permissionCount.filter(permission => permission.DeveloperName ===  developer);
            series[0].data.push(this.state.dangerousPermissionCount[i].total);

            let dangerousPermission =  this.state.dangerousPermissionCount.filter(dangerousPermission => dangerousPermission.DeveloperName ==  developer);
            series[1].data.push(this.state.permissionCount[i].total - this.state.dangerousPermissionCount[i].total);
        }
        this.setState({series: series});
        this.setState({xAxis: xAxis});

    }

    plotGraph = () =>{
        let series = [
            {name: "Applications", data : []},
            {name: "Average Permissions", data : []},
            {name: "Average System Actions", data : []},
        ];

        let xAxis = [];
        const devAppCount = this.state.filteredDevAppCount;
        const test = this.state.systemActionsCount;
        for(let i = 0; i < devAppCount.length; i++){
            let developer = devAppCount[i].DeveloperName;
            xAxis.push(developer);
            series[0].data.push(devAppCount[i].cnt);

            let permission = this.state.permissionCount.filter(permission => permission.DeveloperName ===  developer);
            series[1].data.push(Math.round(permission[0].total));

            let systemAction = this.state.systemActionsCount.filter(systemAction => systemAction.DeveloperName ==  developer);
            series[2].data.push(Math.round(systemAction[0].actionTotal));
        }
        this.setState({series: series});
        this.setState({xAxis: xAxis});

    }

    populateSystemActions =(developers,vtdetections)=>{
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

    populateDevPermissionCount =(developers, vtdetections)=>{
        axios.get('/api/getPermissionCountByDeveloper?developers='+encodeURIComponent(developers)).then((result)=>{
            this.setState({permissionCount: result.data});
        }).then(()=>{
            this.populateSystemActions(developers, vtdetections);
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    populatePermissionCount =(developers, vtdetections)=>{
        axios.get('/api/getPermissionCountByDevApp?developers='+encodeURIComponent(developers)).then((result)=>{
            this.setState({permissionCount: result.data});
        }).then(()=>{
            this.populateDangerousDevPermissionCount(developers, vtdetections);
        }).
        catch((err)=>{
            console.log(err)
        })
    }

    populateDangerousDevPermissionCount =(developers, vtdetections)=>{
        axios.get('/api/getDangerousPermissionCountByDev?developers='+encodeURIComponent(developers)).then((result)=>{
            this.setState({dangerousPermissionCount: result.data});
        }).then(()=>{
            this.plotPermissionGraph();
        }).
        catch((err)=>{
            console.log(err)
        })
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
        this.repopulate(developers, this.state.vtdetectionsFilter.join());

    }

    repopulate(developers, vtdetections) {
        this.setState({currentDevFilter: developers});
        if (this.state.selectedMeasure === "PermissionAll") {
            this.populatePermissionCount(developers, vtdetections);
        } else {
            this.populateDevPermissionCount(developers, vtdetections);
        }
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
        //this.populateDevPermissionCount(this.state.filteredPermissions.join(), filters);

        this.populateDevelopers( filters.join());
        //this.repopulate(this.state.currentDevFilter, filters.join());
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


        const chartOptions = {
            title : "Number of Application, Permissions and System Actions by Developer  ",
            series : this.state.series,
            xAxis : this.state.xAxis

        }

        const dropDownOptions ={
            suggestions : this.state.suggestions,
            title: "Select Developer"
        }

        const dropDownOptionsVTDetection ={
            suggestions : this.state.vtdetectionSuggestions,
            title: "Select VT Detection"
        }


        return (
            <div>
                <div style={{display: "flex"}}>
                    <GenericDropDown id="VTDropDown"  style={{marginLeft: "1%"}}  data = {dropDownOptionsVTDetection} onChange={this.onVTFilterChange.bind(this)}/>
                    <GenericDropDown id="measureDropDown" style={{marginLeft: "1%", width: "30%"}} data = {dropDownOptionsMeasure} onChange={this.onMeasureChange.bind(this)}/>
                    <DeveloperDropDown id="devDropDown" data = {this.state.suggestions} onChange={this.changeDevDropDown.bind(this)}
                                       onKeyPress = {this.filterSuggestions.bind(this)} filter = {this.state.filter}/>

                </div>

                <Paper elevation={3} >
                    <GroupColumnChart options = {chartOptions} />
                </Paper>
            </div>
        )
    }
}