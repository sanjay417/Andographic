    import React, { Component } from 'react';
    import {
    CategoryDropDown,
    ColumnChart,
    GenericDropDown,
    HeatMapChart,
    PieChart,
        BubbleChartDrill,
    SummaryHelper,
        GroupColumnChart,
        WordCountChart
    } from '../index';
    import BarChart from "../Chart";
    import {Button, CircularProgress, Icon, Breadcrumbs, Link} from "@material-ui/core";
    import {BubbleChart, HeatMap} from '../index'
    import axios from 'axios';
    import jsPDF from 'jspdf';
    import canvg from 'canvg';
    import d3_save_pdf from 'd3-save-pdf';
    import * as d3 from "d3";
    import GetApp from '@material-ui/icons/GetApp';
    import ReactDOM from 'react-dom';
    import Paper from "@material-ui/core/Paper/Paper";
    import TableChartIcon from '@material-ui/icons/TableChart';
    import Avatar from '@material-ui/core/Avatar';
    import BarChartIcon from '@material-ui/icons/BarChart';
    import { green, pink, blue, red } from '@material-ui/core/colors';
    import Grid from "@material-ui/core/Grid";
    import Typography from "@material-ui/core/Typography";
    import PieChartIcon from '@material-ui/icons/PieChart';
    import BubbleChartIcon from '@material-ui/icons/BubbleChart';
    import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
    import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
    import Radio from "@material-ui/core/Radio/Radio";
    import CardContent from "@material-ui/core/CardContent";
    import CloudIcon from '@material-ui/icons/Cloud';
    import Split from 'react-split';
    import Checkbox from "@material-ui/core/Checkbox/Checkbox";
    import Slider from "@material-ui/core/Slider";

    export default class Overview extends Component {

        constructor(props) {
            super(props);


            this.state = {
                vtdetectionSuggestions: [],
                appType: [{value: "All", label: "All"},
                    {value: "Malicious", label: "Malicious"},
                    {value: "Benign", label: "Benign"}],
                chartType: "bubble",
                genre: [],
                index : "Malicious",
                vtdetections : [10],
                appTotal: 0,
                permBubbleSeries: [],
                actionBubbleSeries: [],
                devBubbleSeries:[],
                pids: [],
                sids: [],
                permissionCount: [],
                permRotate: false,
                permissions: [],
                systemActions: [],
                actionRotate: false,
                devRotate: false,
                called : false,
                devAppCount: [],
                genreFilter: "",
                maliciousCount: 0,
                benignCount: 0,
                devCount: 0,
                cloudSeries: [],
                devcloudSeries: [],
                permCloudSeries: [],
                actionCloudSeries: [],
                maliciousPercent: 0,
                benignPercent: 0,
                rangeValue: [20, 30],
            }


        }

        componentDidMount(){
            this.populateAppCount();


            if(this.state.vtdetectionSuggestions.length == 0){
                this.populateVTDetections();
            }


            if(this.state.permissions.length == 0){
                this.populatePermissions();
            }


            if(this.state.systemActions.length == 0){
                this.populateSystemActions();
            }

            // if(this.state.devAppCount.length == 0){
            //     this.populateDevAppData(this.state.index)
            // }

        };



       populateVTDetections =() =>{
            axios.get('/api/VTDetection').then((result)=>{
                //this.setState({permissions: result.data});
                const dataSuggestions = result.data.map(entry => ({
                    value: entry.vtdetection,
                    label: entry.vtdetection,
                }))
                console.log("RESULT -> ", dataSuggestions)
               this.setState({vtdetectionSuggestions: dataSuggestions})
            }).then(()=>{
                this.populateData(this.state.index);

           }).catch((err)=>{
                console.log(err)
            })
        };


        populateSystemActions =() =>{
            let dataSuggestions = [];
            axios.get('/api/getSystemActions').then((result)=>{
                dataSuggestions = result.data.map(entry => ({
                    value: entry.pid,
                    label: entry.permission.split(".").pop(-1),
                }))
                this.setState({systemActions: dataSuggestions})
            }).then(()=>{
                let sids = this.setSids(dataSuggestions)
                this.setState({sids: sids})
                this.populateActionData(this.state.index, sids);

            }).catch((err)=>{
                console.log(err)
            })
        };

        populatePermissions =() =>{
            let  dataSuggestions = []
            axios.get('/api/getPermissions').then((result)=>{
                //console.log(result);
                    dataSuggestions = result.data.map(entry => ({
                    value: entry.pid,
                    label: entry.permission,
                }))
                this.setState({permissions: dataSuggestions})
            }).then(()=>{
                let pids = this.setPids(dataSuggestions);
                this.setState({pids: pids})
                this.populatePermData(this.state.index, pids);
            }).catch((err)=>{
                console.log(err)
            })
        };

         populateDevAppData = (index, genreFilter) =>{
            this.populateDevAppCount("/api/devAppCountAll", this.state.vtdetections, genreFilter, index);
            // switch (index) {
            //     case "All":

            //         break;
            //     case "Malicious":
            //         this.populateDevAppCount("/api/devAppCountMalicious", this.state.vtdetections, genreFilter);
            //         // this.populateDevAppCount("/api/devAppCountAll", this.state.vtdetections, genreFilter, index);
            //         break;
            //     case "Benign":
            //         this.populateDevAppCount("/api/devAppCountBenign", this.state.vtdetections, genreFilter);
            //         // this.populateDevAppCount("/api/devAppCountAll", this.state.vtdetections, genreFilter, index);
            //         break;
            // }
        }

        populateActionData =(index, pids, genreFilter) =>{
            this.populateSystemActionUsage("/api/permissionUsage", pids, this.state.vtdetections, genreFilter, index);
            /*switch (index) {
                case "All":
                    this.populateSystemActionUsage("/api/permissionUsage", pids, this.state.vtdetections, genreFilter, index);
                    break;
                case "Malicious":
                    //this.populateSystemActionUsage("/api/permissionUsageForMaliciousApps", pids, this.state.vtdetections, genreFilter);
                    this.populateSystemActionUsage("/api/permissionUsage", pids, this.state.vtdetections, genreFilter, index);
                    break;
                case "Benign":
                    //this.populateSystemActionUsage("/api/permissionUsageForBenignApps",  pids, this.state.vtdetections, genreFilter);
                    this.populateSystemActionUsage("/api/permissionUsage",  pids, this.state.vtdetections, genreFilter, index);
                    break;
            }*/
        }

        populatePermData =(index, pids, genreFilter, vtdetections) =>{
            this.populatePermissionUsage("/api/permissionUsage", pids, this.state.vtdetections, genreFilter, index);
            /*switch (index) {
                case "All":
                    this.populatePermissionUsage("/api/permissionUsage", pids, this.state.vtdetections, genreFilter, index);
                    break;
                case "Malicious":
                    //this.populatePermissionUsage("/api/permissionUsageForMaliciousApps", pids, this.state.vtdetections, genreFilter);
                    this.populatePermissionUsage("/api/permissionUsage", pids, this.state.vtdetections, genreFilter, index);
                    break;
                case "Benign":
                    //this.populatePermissionUsage("/api/permissionUsageForBenignApps",  pids, this.state.vtdetections, genreFilter);
                    this.populatePermissionUsage("/api/permissionUsage",  pids, this.state.vtdetections, genreFilter);
                    break;
            }*/
        }

        populateData =(index) =>{
            switch (index) {
                case "All":
                    this.populateApplicationsCountByGenre();
                    break;
                case "Malicious":
                    this.populateMaliciousApplicationsCountByGenre(this.state.vtdetections.join());
                    break;
                case "Benign":
                    this.populateBenignApplicationsCountByGenre();
                    break;
            }
        }

        populateDevAppCount =(path1, vtdetections, genreFilter, index)=>{

            if(index == "Malicious" && vtdetections.length == 0)
                return;

            //     let dataToPlot = []
            //     this.setState({devRotate : true})
            //     let url =  path1 + '?vtdetections='+ vtdetections + "&genre="+genreFilter+"&index="+index;
            //     console.log("DEVAPP -> ", url)
            //     axios.get(url).then((result)=>{
            //         console.log("RESULT -> ", result.data)
            //         this.setState({devRotate : false})
            //         this.setState({devAppCount: result.data});
            //         this.setState({devCount: result.data.length})
            //         dataToPlot =  result.data;
            //         console.log("devCount -> ", this.state.devCount)
            //         console.log("devAppCount -> ", this.state.devAppCount)
            //         //console.log("DATA TO PLOT -> ", dataToPlot)
            //     }).then(()=>{
            //         this.plotDevGraph(dataToPlot);
            //     }). catch((err)=>{
            //         console.log(err)
            //     })
            // }
            let dataToPlot = []
            this.setState({devRotate : true})
            let url =  path1 + '?vtdetections='+ vtdetections + "&genre="+genreFilter+"&index="+index;
            console.log("DEVAPP -> ", url)
            axios.get(url).then((result)=>{
                this.setState({devRotate : false})
                this.setState({devAppCount: result.data.data});
                this.setState({devCount: result.data.data.length})
                dataToPlot =  result.data.data;
                console.log("RESULT -> ", this.state.devAppCount)
                console.log("LENGTH -> ", this.state.devCount)
            }).then(()=>{
                this.plotDevGraph(dataToPlot); 
            }). catch((err)=>{
                console.log(err)
            })
        }


        populateSystemActionUsage =(path1, pids, vtdetections, genreFilter, index)=>{

            if(index == "Malicious" && vtdetections.length == 0)
                return;

            this.setState({actionRotate : true})
            let url =  path1 + '?pids='+ pids.join() + '&vtdetections='+ vtdetections+"&genre="+genreFilter+"&index="+index;
            console.log("URL -> ", url)
            axios.get(url).then((result)=>{
                this.setState({actionRotate : false})
                //this.setState({actionCount: result.data});
                this.buildActionCount(result.data[0])
            }).then(()=>{
                this.plotActionGraph();
            })/*.then(()=>{
                if(this.state.devAppCount.length == 0){
                    this.populateDevAppData(this.state.index)
                }

            })*/.catch((err)=>{
                console.log(err)
            })
        }

            buildActionCount =(result)=>{
                let permCount = [];
                for (const key of Object.keys(result)) {
                    permCount.push({pid: key, total: result[key]})
                }
                this.setState({actionCount: permCount});

       /*     if(this.state.index == "All"){
                let permCount = [];
                for (const key of Object.keys(result)) {
                    permCount.push({pid: key, total: result[key]})
                }
                this.setState({actionCount: permCount});
            }else{
                this.setState({actionCount: result});
            }*/

        }

        buildPermCount =(result)=>{

            let permCount = [];
            for (const key of Object.keys(result)) {
                permCount.push({pid: key, total: result[key]})
            }
            this.setState({permissionCount: permCount});

       /*     if(this.state.index == "All"){
                let permCount = [];
                for (const key of Object.keys(result)) {
                    permCount.push({pid: key, total: result[key]})
                }
                this.setState({permissionCount: permCount});
            }else{
                this.setState({permissionCount: result});
            }*/

        }

        populatePermissionUsage =(path1, pids, vtdetections, genreFilter, index)=>{

            if(index == "Malicious" && vtdetections.length == 0)
                return;

            this.setState({permRotate : true})
            let url =  path1 + '?pids='+ pids.join() + '&vtdetections='+ vtdetections +"&genre="+genreFilter+"&index="+index;
            axios.get(url).then((result)=>{
                //alert(true);
                this.setState({permRotate : false})
                this.buildPermCount(result.data[0])

            }).then(()=>{
                this.plotPermGraph();
            }). catch((err)=>{
                console.log(err)
            })
        }

/*        populatePermissionUsage =(path1, pids, vtdetections, genreFilter)=>{

            if(this.state.index == "Malicious" && vtdetections.length == 0)
                return;

            this.setState({permRotate : true})
            let url =  path1 + '?pids='+ pids.join() + '&vtdetections='+ vtdetections +"&genre="+genreFilter;
            axios.get(url).then((result)=>{
                this.setState({permRotate : false})
                this.setState({permissionCount: result.data});
            }).then(()=>{
                this.plotPermGraph();
            }). catch((err)=>{
                console.log(err)
            })
        }*/

        getPermissionName =(id) =>{
            let permissionObj = this.state.permissions.find(elem => elem.value == id);
            return permissionObj.label;
        }

        getActionName =(id) =>{
            let permissionObj = this.state.systemActions.find(elem => elem.value == id);
            return permissionObj.label;
        }

        plotActionGraph = () =>{
            var dataToPlot = [];
            var i;
            const permissionCount = this.state.actionCount;
            let series = [];
            let xAxis = [];
            let pieSeries = [];
            let bubbleSeries = [{name: "System Actions", data: [], color:this.getRandColor(false,3),}];
            let pieElement = {name: "System Actions", data : []};
            let element = {name: "System Actions", data : []};
            let cloudSeries = [];
            for(i = 0; i < permissionCount.length; i++){
                let name;
                name = this.getActionName(permissionCount[i].pid);
                xAxis.push(name);
                element.data.push(permissionCount[i].total);
                pieElement.data.push({name: name, y: permissionCount[i].total});
                bubbleSeries[0].data.push({name: name, value: permissionCount[i].total});
                cloudSeries.push({name:  name, weight: permissionCount[i].total})
            }
            series.push(element);
            pieSeries.push(pieElement);

            this.setState({actionPieSeries: pieSeries});
            this.setState({actionBubbleSeries: bubbleSeries});
            this.setState({actionSeries: series});
            this.setState({actionXAxis: xAxis});
            this.setState({actionCloudSeries: cloudSeries})

        }


        plotPermGraph = () =>{
            var dataToPlot = [];
            var i;
            const permissionCount = this.state.permissionCount;
            let series = [];
            let xAxis = [];
            let pieSeries = [];
            let bubbleSeries = [{name: "Permissions", data: [], color:this.getRandColor(false,4),}];
            let pieElement = {name: "Permissions", data : []};
            let element = {name: "Permissions", data : []};
            let cloudSeries = [];
            for(i = 0; i < permissionCount.length; i++){
                let name;
                name = this.getPermissionName(permissionCount[i].pid);
                xAxis.push(name);
                element.data.push(permissionCount[i].total);
                pieElement.data.push({name: name, y: permissionCount[i].total});
                bubbleSeries[0].data.push({name: name, value: permissionCount[i].total});
                cloudSeries.push({name:  name, weight: permissionCount[i].total})
            }
            series.push(element);
            pieSeries.push(pieElement);

            this.setState({permPieSeries: pieSeries});
            this.setState({permBubbleSeries: bubbleSeries});
            this.setState({permSeries: series});
            this.setState({permXAxis: xAxis});
            this.setState({permCloudSeries: cloudSeries})


        }

        plotDevGraph = (dataToPlot) =>{

            //const permissionCount = this.state.devAppCount;
            const permissionCount = dataToPlot;
            let series = [];
            let xAxis = [];
            let pieSeries = [];
            let bubbleSeries = [{name: "Developer",  data: [], color:this.getRandColor(false,4)}];

            let element = {name: "Developer", data : []};
            let pieElement = {name: "Developer", data : []};
            let cloudSeries = [];
            for(let i = 0; i < permissionCount.length; i++){
                if(this.state.index == "Malicious" || (permissionCount[i].total > 100 && this.state.index != "Malicious") ){
                    xAxis.push(permissionCount[i].name);
                    element.data.push(permissionCount[i].total);
                    pieElement.data.push({name: permissionCount[i].name, y: permissionCount[i].total});
                    bubbleSeries[0].data.push({name: permissionCount[i].name, value: permissionCount[i].total});
                    cloudSeries.push({name:  permissionCount[i].name, weight: permissionCount[i].total})
                }

            }

            series.push(element);
            pieSeries.push(pieElement);

            this.setState({devPieSeries: pieSeries});
            this.setState({devBubbleSeries: bubbleSeries});
            this.setState({devSeries: series});
            this.setState({devXAxisGenre: xAxis});
            this.setState({devHeatMapSeries: []});
            this.setState({devcloudSeries: cloudSeries})


        }


        plotGraph = () =>{

            const permissionCount = this.state.genre;
            let series = [];
            let xAxis = [];
            let pieSeries = [];
            let bubbleSeries = [{name: "Genre", data: []}];
            let element = {name: "Permissions", data : []};
            let pieElement = {name: "Genre", data : []};
            let cloudSeries = [];
            for(let i = 0; i < permissionCount.length; i++){
                xAxis.push(permissionCount[i].genre);
                element.data.push(permissionCount[i].total);
                pieElement.data.push({name: permissionCount[i].genre, y: permissionCount[i].total});
                bubbleSeries[0].data.push({name: permissionCount[i].genre, value: permissionCount[i].total, drilldown: permissionCount[i].genre});
                cloudSeries.push({name:  permissionCount[i].genre, weight: permissionCount[i].total})
            }

            series.push(element);
            pieSeries.push(pieElement);

            this.setState({pieSeries: pieSeries});
            this.setState({bubbleSeries: bubbleSeries});
            this.setState({series: series});
            this.setState({xAxisGenre: xAxis});
            this.setState({heatMapSeries: []});
            this.setState({cloudSeries: cloudSeries})


        }



        getRandColor(same, darkness) {
            //6 levels of brightness from 0 to 5, 0 being the darkest
            var rgb = [];
            let lastColor = this.state.lastColor;
            if(same && lastColor) {
                rgb = lastColor;
            } else {
                rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
            }
            var mix = [darkness * 51, darkness * 51, darkness * 51]; //51 => 255/5
            var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function (x) {
                return Math.round(x / 2.0)
            })

            this.setState({lastColor: rgb})
            return "rgb(" + mixedrgb.join(",") + ")";
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

        populateAppCountAll=()=>{
            axios.get('/api/populateBenignMaliciousCount').then((result)=>{
                let malicious = result.data.filter(data => data.malicious == "Yes");
                let benign = result.data.filter(data => data.malicious == "No");

                this.setState({benignCount: benign[0].total});
                this.setState({maliciousCount: malicious[0].total});
                this.setState({appTotal: malicious[0].total + benign[0].total});
                this.setState({maliciousPercent: (malicious[0].total / (malicious[0].total + benign[0].total)).toFixed(4) + " %"});
                this.setState({benignPercent: (benign[0].total / (malicious[0].total + benign[0].total)).toFixed(4) + " %"});

            }).
            catch((err)=>{
                console.log(err)
            })
        }



        populateAppCount=()=>{
            axios.get('/api/populateBenignMaliciousCount').then((result)=>{
                let malicious = result.data.filter(data => data.malicious == "Yes");
                let benign = result.data.filter(data => data.malicious == "No");
                this.setState({allBenignCount: benign[0].total});
                this.setState({allMaliciousCount: malicious[0].total});
                this.setState({allAppTotal: malicious[0].total + benign[0].total});

            }).
            catch((err)=>{
                console.log(err)
            })
        }

        populateAppCountByGenre=(genre)=>{
            axios.get('/api/populateBenignMaliciousCountByGenre?genre='+genre).then((result)=>{
                let malicious = result.data.filter(data => data.malicious == "Yes");
                let benign = result.data.filter(data => data.malicious == "No");

                this.setState({benignCount: benign[0].total});
                this.setState({maliciousCount: malicious[0].total});
                this.setState({appTotal: malicious[0].total + benign[0].total});

                this.setState({maliciousPercent: (malicious[0].total / (malicious[0].total + benign[0].total)).toFixed(4) + " %"});
                this.setState({benignPercent: (benign[0].total / (malicious[0].total + benign[0].total)).toFixed(4) + " %"});
            }).
            catch((err)=>{
                console.log(err)
            })
        }

        populateApplicationsCountByGenre =(genres, vtdetections)=>{
            this.setState({rotate : true})
            axios.get('/api/applicationsByGenre').then((result)=>{
                this.setState({rotate : false})
                this.setState({genre: result.data});
            }).then(()=>{
                this.populateAppCountAll();
            }).then(()=>{
                this.plotGraph();
            }).
            catch((err)=>{
                console.log(err)
            })
        }

        populateMaliciousApplicationsCountByGenre =(vtdetections)=>{
            this.setState({rotate : true})
            if(vtdetections.length == 0)
                return

            axios.get('/api/maliciousApplicationsByGenre?vtdetections='+vtdetections).then((result)=>{
                this.setState({rotate : false})
                this.setState({genre: result.data});

                let total = 0;
                for(let i in result.data){
                    total += result.data[i].total;
                }

                this.setState({maliciousCount: total});
                this.setState({appTotal: total});
                this.setState({benignCount: 0});

                this.setState({maliciousPercent: (total / this.state.allMaliciousCount).toFixed(4) + " %"});
                this.setState({benignPercent: 0 + " %"});

            }).then(()=>{
                this.plotGraph();
            }).
            catch((err)=>{
                console.log(err)
            })
        }

        populateBenignApplicationsCountByGenre =(genres, vtdetections)=>{
            this.setState({rotate : true})
            axios.get('/api/benignApplicationsByGenre').then((result)=>{
                this.setState({rotate : false})
                this.setState({genre: result.data});

                let total = 0;
                for(let i in result.data){
                    total += result.data[i].total;
                }

                this.setState({benignCount: total});
                this.setState({appTotal:total});
                this.setState({maliciousCount: 0});


                this.setState({maliciousPercent: 0 + " %"});
                this.setState({benignPercent: (total / this.state.allBenignCount).toFixed(4) + " %"});
            }).then(()=>{
                this.plotGraph();
            }).
            catch((err)=>{
                console.log(err)
            })
        }

        onVTFilterChange =(result, selectedVals) => {
            let filters = [];
            if (selectedVals) {
                for (let i in selectedVals) {
                    filters.push(selectedVals[i].value)
                }
            }


            this.setState({"vtdetections" : filters});
            this.populateMaliciousApplicationsCountByGenre(filters.join())
            this.populatePermData(this.state.index, this.state.pids, this.state.genreFilter);
            this.populateActionData(this.state.index, this.state.sids, this.state.genreFilter);
            this.populateDevAppData(this.state.index, this.state.genreFilter);

        }

        onAppTypeChange =(result, selectedVals) =>{
            let appType = result[0];
            this.setState({index: appType});
            this.populateData(appType, this.state.pids);
            this.populatePermData(appType, this.state.pids, this.state.genreFilter);
            this.populateActionData(appType, this.state.sids, this.state.genreFilter);
            this.populateDevAppData(appType, this.state.genreFilter);

        }

        onBubbleClick=(genre)=> {
            this.setState({genreFilter: genre});

            let data = this.state.genre.filter(data => data.genre == genre)


            this.populatePermData(this.state.index, this.state.pids, genre);
            this.populateActionData(this.state.index, this.state.sids, genre);
            this.populateDevAppData(this.state.index, genre);

            if(this.state.index == "Benign"){
                this.setState({benignCount:  data[0].total});
                this.setState({appTotal:data[0].total});
                this.setState({maliciousCount: 0});
            }else if(this.state.index == "Malicious"){
                this.setState({benignCount:  0});
                this.setState({appTotal:data[0].total});
                this.setState({maliciousCount: data[0].total});
            }else{
               this.populateAppCountByGenre(genre);
            }
        }


        onDevBubbleClick=(developer)=>{
            let path = window.location.href.replace("Overview", "");
            window.location =  path + "Console?developer="+developer;
        }

        handleGenreBreadCrumb=()=>{
            this.setState({genreFilter: ""});

            this.populatePermData(this.state.index, this.state.pids, "");
            this.populateActionData(this.state.index, this.state.sids, "");
            this.populateDevAppData(this.state.index, "")
        }

        endDrag=(e)=>{
            //alert("end")
            this.setState({permWidth: window.innerWidth * e[0] * 0.01  - 50});
            this.setState({actionWidth: window.innerWidth * e[1]  * 0.01 - 50});
            this.setState({devWidth:  window.innerWidth * e[2]  * 0.01 - 50});
         }

        setSids =(actions)=>{

            let sids = [];
            for(let i in actions){
                sids.push(actions[i].value);
            }
            //alert(pids);
            this.setState({sids: sids});
            this.setState({systemActions: actions})
            return sids;
        };

        setPids =(permissions)=>{

            let pids = [];
            for(let i in permissions){
                pids.push(permissions[i].value);
            }
            //alert(pids);
            this.setState({pids: pids});
            this.setState({permissions: permissions})
            return pids;
        };

        renderPermChart =(height)=>{

            const chartOptions = {
                title : "Permission Usage",
                series : this.state.permSeries,
                xAxis : this.state.permXAxis,
                height: height

            }

            const pieChartOptions = {
                title : "Permission Usage",
                series : this.state.permPieSeries,
                height: height
            }

            const bubbleChartOptions = {
                title : "Permission Usage",
                name: "Genre",
                series : this.state.permBubbleSeries,
                height: height,
                labelLimit: 20,
                shrinkLabel: true,
                drag : this.state.dragDev,
                width: this.state.permWidth
            }

            const heatMapOptions = {
                title : "Permission Usage",
                series : this.state.heatMapSeries,
                xAxis : this.state.xAxisGenre,
                yAxis: this.state.yAxis,
                height: height

            }

            const wordChartOptions = {
                title : "Permission Usage",
                series : this.state.permCloudSeries,
                height: height

            }



            switch(this.state.chartType ){
                case "column":  return <GroupColumnChart options = {chartOptions} />;
                case "heat": return <HeatMap options = {heatMapOptions}/>;
                case "pie" : return  <PieChart options = {pieChartOptions} />
                case  "bubble" : return <BubbleChartDrill options = {bubbleChartOptions} />
                case "wordcloud" : return  <WordCountChart options = {wordChartOptions} />
            }


        }

        renderActionChart =(height)=>{

            const chartOptions = {
                title : "System Action Usage",
                series : this.state.actionSeries,
                xAxis : this.state.actionXAxis,
                height: height

            }

            const pieChartOptions = {
                title :  "System Action Usage",
                series : this.state.actionPieSeries,
                height: height
            }

            const bubbleChartOptions = {
                title :  "System Action Usage",
                name: "Genre",
                series : this.state.actionBubbleSeries,
                height: height,
                labelLimit: 20,
                shrinkLabel: true,
                width: this.state.actionWidth
            }

            const heatMapOptions = {
                title :  "System Action Usage",
                series : this.state.heatMapSeries,
                xAxis : this.state.xAxisGenre,
                yAxis: this.state.yAxis,
                height: height

            }

            const wordChartOptions = {
                title : "System Action Usage",
                series : this.state.actionCloudSeries,
                height: height

            }



            switch(this.state.chartType ){
                case "column":  return <GroupColumnChart options = {chartOptions} />;
                case "heat": return <HeatMap options = {heatMapOptions}/>;
                case "pie" : return  <PieChart options = {pieChartOptions} />
                case  "bubble" : return <BubbleChartDrill options = {bubbleChartOptions} />
                case "wordcloud" : return  <WordCountChart options = {wordChartOptions} />
            }


        }

        renderDevChart =(height)=>{

            const chartOptions = {
                title : "Number of Applications by Developer",
                series : this.state.devSeries,
                xAxis : this.state.devXAxisGenre,
                height: height

            }

            const pieChartOptions = {
                title : "Number of Applications by Developer",
                series : this.state.devPieSeries,
                height: height
            }

            const bubbleChartOptions = {
                title :  "Number of Applications by Developer",
                name: "Genre",
                series : this.state.devBubbleSeries,
                height: height,
                labelLimit: 5,
                shrinkLabel: false,
                width: this.state.devWidth
            }

            const heatMapOptions = {
                title :  "Number of Applications by Developer",
                series : this.state.devHeatMapSeries,
                xAxis : this.state.devXAxisGenre,
                yAxis: this.state.yAxis,
                height: height

            }


            const wordChartOptions = {
                title : "Number of Applications by Developer",
                series : this.state.devcloudSeries,
                height: height

            }



            switch(this.state.chartType ){
                case "column":  return <GroupColumnChart options = {chartOptions} />;
                case "heat": return <HeatMap options = {heatMapOptions}/>;
                case "pie" : return  <PieChart options = {pieChartOptions} />
                case  "bubble" : return <BubbleChartDrill options = {bubbleChartOptions} onClick={this.onDevBubbleClick.bind(this)}/>
                case "wordcloud" : return  <WordCountChart options = {wordChartOptions} />
            }

        }



        renderChart =(height)=>{

            const chartOptions = {
                title : "Number of Applications by Genre",
                series : this.state.series,
                xAxis : this.state.xAxisGenre,
                height: height

            }

            const pieChartOptions = {
                title : "Number of Applications by Genre",
                series : this.state.pieSeries,
                height: height
            }

            const bubbleChartOptions = {
                title : "Number of Applications by Genre",
                name: "Genre",
                series : this.state.bubbleSeries,
                height: height,
                labelLimit: 10,
                shrinkLabel: true
            }

            const heatMapOptions = {
                title : "Number of Applications by Genre",
                series : this.state.heatMapSeries,
                xAxis : this.state.xAxisGenre,
                yAxis: this.state.yAxis,
                height: height

            }


            const wordChartOptions = {
                title : "Number of Applications by Genre",
                series : this.state.cloudSeries,
                height: height

            }

            switch(this.state.chartType ){
                case "column":  return <GroupColumnChart options = {chartOptions} />;
                case "heat": return <HeatMap options = {heatMapOptions}/>;
                case "pie" : return  <PieChart options = {pieChartOptions} />
                case  "bubble" : return <BubbleChartDrill options = {bubbleChartOptions} onClick={this.onBubbleClick.bind(this)}/>
                case "wordcloud" : return  <WordCountChart options = {wordChartOptions} />

            }

        }

        changeChart =(type)=>{
            this.setState({chartType: type});
        }

        onChangeRadio = (event) =>{
            let appType = event.target.value;
            this.setState({index: appType});
            this.populateData(appType, this.state.pids);
            this.populatePermData(appType, this.state.pids, this.state.genreFilter);
            this.populateActionData(appType, this.state.sids, this.state.genreFilter);
            this.populateDevAppData(appType, this.state.genreFilter);

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
            this.populateMaliciousApplicationsCountByGenre(filters.join())
            this.populatePermData(this.state.index, this.state.pids, this.state.genreFilter);
            this.populateActionData(this.state.index, this.state.sids, this.state.genreFilter);
            this.populateDevAppData(this.state.index, this.state.genreFilter);
        }

        valuetext = value => {
            return `${value}`;
        }

        render() {

            const classes = {
                green: {
                    color: '#fff',
                    backgroundColor: green[500],
                },
            }

            const appType ={
                suggestions : this.state.appType,
                title: "Select Application Type"
            }

            const dropDownOptionsVTDetection ={
                suggestions : this.state.vtdetectionSuggestions,
                title: "Select Malicious Index",
                default: "10"
            }

            const permBubbleChartOptions = {
                title : "Permission Usage",
                name: "Permission",
                series : this.state.permBubbleSeries,
                height: 300
            }

            const actionBubbleChartOptions = {
                title : "System Action Usage",
                name: "System Action",
                series : this.state.actionBubbleSeries,
                height: 300
            }

            return (
                <div>
                    <div  style={{display: "flex"}}>



                        <div  style={{display: "flex", marginBottom: "1%", width: "90%"}}>
                            <Paper elevation={0} variant="outlined" style={{ backgroundColor: "#FFFFFF", marginBottom: "1%", padding: "5px", height: "90px", width: "20%"}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.appTotal}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Total Applications
                                </Typography>
                            </Paper>

                            <Paper elevation={0} variant="outlined" style={{ backgroundColor: "#fce4e4", marginLeft: "2%", marginBottom: "1%", padding: "5px",  height: "90px", width: "25%"}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.maliciousCount}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.state.maliciousPercent}
                                </Typography>
                                <Typography variant="body3" color="textSecondary" component="p">
                                    Malicious Applications
                                </Typography>
                            </Paper>
                            <Paper elevation={0} variant="outlined" style={{ backgroundColor: "#f6fef6", marginLeft: "2%", marginBottom: "1%", padding: "5px",  height: "90px", width: "25%"}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.benignCount}
                                </Typography>
                                <Typography variant="body3" color="textSecondary" component="p">
                                    {this.state.benignPercent}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Benign Applications
                                </Typography>
                            </Paper>
                            <Paper elevation={0} variant="outlined" style={{ backgroundColor: "#FFFFFF", marginLeft: "2%", marginBottom: "1%",marginRight: "0%", padding: "5px",  height: "90px", width: "20%"}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.devCount}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Developers
                                </Typography>
                            </Paper>

                        </div>
                        <Paper elevation={0} variant="outlined" style={{ backgroundColor: "#FFFFFF", marginBottom: "1%", padding: "5px", height: "70px", width: "90%", display: "flex"}}>
                            <RadioGroup aria-label="index" row  style={{marginLeft :"0%", width :"100%"}} name="index" value={this.state.index} onChange={this.onChangeRadio.bind(this)}>
                                <FormControlLabel  style={{width :"20%", marginLeft: "2%"}} value="All" control={<Radio />} label="All" />
                                <FormControlLabel  style={{width :"25%", marginLeft: "2%"}}value="Malicious" control={<Radio />} label="Malicious" />
                                <FormControlLabel  style={{width :"25%", marginLeft: "20px"}}value="Benign" control={<Radio />} label="Benign" />

                            </RadioGroup>
                            {(this.props.options.index && this.props.options.index == "Malicious") || this.state.index == "Malicious" ? (
                                <div style={{ display: "flex", alignItems: "stretch" }}>
                                    <div><FormControlLabel style={{ marginLeft: "3px", marginRight: "5px" }} value="start" control={<Checkbox color="primary" />} label="Slider" labelPlacement="top" onChange={this.onSliderChecked.bind(this)}/></div>
                                    {!this.state.isChecked
                                        ? (<div> <GenericDropDown  id="VTDropDown" style={{ marginLeft: "1%" }} data={dropDownOptionsVTDetection} onChange={this.onVTFilterChange.bind(this)}/> </div>)
                                        : (<div style={{ marginLeft: "20px", width: "200px" }}> <Typography id="range-slider" gutterBottom></Typography>
                                            <Slider max="54" min={1} value={this.state.rangeValue} onChangeCommitted={this.onVTSliderFilterChange.bind(this)} valueLabelDisplay="auto" aria-labelledby="range-slider" getAriaValueText={this.valuetext.bind(this)}/></div>)
                                    }
                                </div>
                            ) : null}

                        </Paper>
{/*
                        <GenericDropDown id="VTDropDown"  style={{marginLeft: "1%"}}  data = {appType} onChange={this.onAppTypeChange.bind(this)}/>*/}


                    </div>


                    <div style={{display: "block"}}>
                        <div style={{width: "100%"}}>
                            <div style={{display: "flex"}}>
                                <Breadcrumbs aria-label="breadcrumb" style={{marginLeft: "1%",  width: "145%"}}>
                                    <Link color="inherit"  onClick={this.handleGenreBreadCrumb.bind(this)}>
                                        <Typography color="textPrimary" style={{color: pink[500]}}>Genre</Typography>
                                    </Link>
                                    <Typography color="textPrimary">{this.state.genreFilter}</Typography>

                                </Breadcrumbs>

                                <Grid container justify="right" alignItems="right" style={{ marginBottom: "10px", marginRight: "0%", width: "23%"}} >
                                    <Avatar style={{ marginLeft: "10px", backgroundColor: pink[500], color: '#fff'}} onClick={this.changeChart.bind(this, "column")}>
                                        <BarChartIcon />
                                    </Avatar>

                                    <Avatar style={{ marginLeft: "10px", backgroundColor: blue[500], color: '#fff'}} onClick={this.changeChart.bind(this, "pie")}>
                                        <PieChartIcon />
                                    </Avatar>

                                    <Avatar style={{ marginLeft: "10px", backgroundColor: red[500], color: '#fff'}} onClick={this.changeChart.bind(this, "bubble")}>
                                        <BubbleChartIcon />
                                    </Avatar>

                                    <Avatar style={{ marginLeft: "10px", backgroundColor: green[500], color: '#fff'}} onClick={this.changeChart.bind(this, "wordcloud")}>
                                        <CloudIcon />
                                    </Avatar>

                                </Grid>
                            </div>


                            <Paper elevation={1}  variant="outlined" style={{ width: "99%", marginLeft: "1%", height: 310,}}>
                                {this.state.rotate ? <CircularProgress color="secondary"  style={{marginLeft : "25px", marginTop: "5%"}} /> : this.renderChart(300)}
                            </Paper>


                        </div>
                        <div style={{width: "100%",  marginTop: "1%"}}>
                        <Split  sizes={[33, 33, 33]} style={{display: "flex", color: "red"}} onDragEnd = {this.endDrag.bind(this)}>
                            <Paper elevation={1}  variant="outlined" style={{ width: "95%",height: 360, marginLeft: "1%"}}>
                                {this.state.permRotate ? <CircularProgress color="secondary"  style={{marginLeft : "25px", marginTop: "10%"}} /> : this.renderPermChart(350)}
                            </Paper>
                            <Paper elevation={1}  variant="outlined" style={{ width: "95%", height: 360, marginLeft: "1%", }}>
                                {this.state.actionRotate ? <CircularProgress color="secondary"  style={{marginLeft : "25px", marginTop: "10%"}} /> : this.renderActionChart(350)}

                            </Paper>
                            <Paper elevation={1}  variant="outlined" style={{ width: "95%", height: 360, marginLeft: "1%"}}>
                                {this.state.devRotate ? <CircularProgress color="secondary"  style={{marginLeft : "25px", marginTop: "10%"}} /> : this.renderDevChart(350)}

                            </Paper>
                        </Split>
                        </div>

                        {/* <div style={{ display: "flex", width: "100%",  marginTop: "1%"}}>

                                 <Paper elevation={1}  variant="outlined" style={{ width: "95%",height: 360, marginLeft: "1%"}}>
                                     {this.state.permRotate ? <CircularProgress color="secondary"  style={{marginLeft : "25px", marginTop: "10%"}} /> : this.renderPermChart(350)}
                                 </Paper>
                                 <Paper elevation={1}  variant="outlined" style={{ width: "95%", height: 360, marginLeft: "1%"}}>
                                     {this.state.actionRotate ? <CircularProgress color="secondary"  style={{marginLeft : "25px", marginTop: "10%"}} /> : this.renderActionChart(350)}

                                 </Paper>
                                 <Paper elevation={1}  variant="outlined" style={{ width: "95%", height: 360, marginLeft: "1%"}}>
                                     {this.state.devRotate ? <CircularProgress color="secondary"  style={{marginLeft : "25px", marginTop: "10%"}} /> : this.renderDevChart(350)}

                                 </Paper>
                         </div>*/}
                    </div>

                </div>
            )
        }
    }