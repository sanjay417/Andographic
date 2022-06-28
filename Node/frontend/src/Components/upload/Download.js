import React, { Component } from 'react';
import {AppAccordian, GenericDropDown} from '../index';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import axios from 'axios';
import {Button, TextField, CircularProgress} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { CSVLink, CSVDownload } from "react-csv";
import Paper from "@material-ui/core/Paper/Paper";


export default class Download extends Component{
    csvLink = React.createRef()
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            data : [],
            rows: 0,
            vtdetectionSuggestions: [],
            sourceSuggestions: [],
            vtdetections: [],
            appTotal: 0,
            rotate: false,
            action: "download",
            name: "",
            source: "self",
            users: [],
            genreFilter: ""
        }
    }

    componentDidMount(){
        //this.populatePermissions();
        //this.populateSystemActions();
        //this.populateVTDetections();
        this.populateTotalRows();
        this.populateSource();
        this.populateUsers();
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
        }).catch((err)=>{
            console.log(err)
        })
    }

    populateUsers =() =>{
        let users = []
        let rows = []
        axios.get('/api/users').then((result)=>{
            this.setState({users: result.data})

        }).catch((err)=>{
            console.log(err)
        })
    }

    populateTotalRows =() =>{
        axios.get('/api/total').then((result)=>{
            this.setState({appTotal: result.data[0].total})
        }).catch((err)=>{
            console.log(err)
        })
    };

    populateSource =() =>{
        axios.get('/api/resources').then((result)=>{
            const dataSuggestions = result.data.map(entry => ({
                value: entry.name,
                label: entry.name,
            }))

            this.setState({sourceSuggestions: dataSuggestions})
        }).catch((err)=>{
            console.log(err)
        })
    };


    populateVTDetections =() =>{
        axios.get('/api/VTDetection').then((result)=>{
            //this.setState({permissions: result.data});
            const dataSuggestions = result.data.map(entry => ({
                value: entry.vtdetection,
                label: entry.vtdetection,
            }))

            this.setState({vtdetectionSuggestions: dataSuggestions})
        }).catch((err)=>{
            console.log(err)
        })
    };


    fetchData =() =>{

        let self = this;
        let user = this.state.users.filter(function (data) {
            return data.name == self.state.name && data.action == self.state.action;
        })


        if(user && user[0] && user[0].approve == 1){
            this.setState({rotate: true})
            axios.get('/api/download?limit='+this.state.rows + '&vtdetections=' + this.state.vtdetections.join() +'&source='+this.state.source+"&genre="+encodeURIComponent(this.state.genreFilter)).then((result)=>{
                this.setState({rotate: false})
                this.setState({data: result.data})
                this.csvLink.current.link.click()
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            alert("Not Authorized")
        }

    };

    populateSystemActions =(finalResult) =>{
        let dataSuggestions = [];
        axios.get('/api/getSystemActions').then((result)=>{

            let data = result.data;
            for(var i = 0; i< data.length; i++){
                var key = data[i];
                finalResult = finalResult + key.pid + ' as "' + key.permission + '"  , '
            }

            console.log(finalResult);

        }).then(()=>{


        }).catch((err)=>{
            console.log(err)
        })
    };

    populatePermissions =() =>{
        let  dataSuggestions = []
        let finalResult = "";
        axios.get('/api/getPermissions').then((result)=>{


            let data = result.data;
            for(var i = 0; i< data.length; i++){
                var key = data[i];
                finalResult = finalResult + key.pid + ' as "' + key.permission + '"  , '
            }

            //console.log(finalResult);

        }).then(()=>{
            this.populateSystemActions(finalResult);
        }).catch((err)=>{
            console.log(err)
        })
    };

    onVTFilterChange =(result, selectedVals) => {
        let filters = [];
        if (selectedVals) {

            for (let i in selectedVals) {
                filters.push(selectedVals[i].value)
            }
        }

        this.setState({"vtdetections" : filters});

    }

    onSourceChange =(result, selectedVals) => {
        let filters = [];
        if (selectedVals) {

            for (let i in selectedVals) {
                filters.push(selectedVals[i].value)
            }
        }
        this.setState({"source" : filters[0].toLowerCase()});

    }

    changeCatDropDown =(result, selectedVals) =>{
        let i = 0;
        let genres = [];
        if(selectedVals == null){
            this.setState({genres: []});
            return;
        }


        for(i = 0; i < selectedVals.length; i++){
            genres.push(selectedVals[i].value)
        }
        this.setState({genreFilter: genres.join()});

    }


    getPermissionName =(id) =>{
        let permissionObj = this.state.permissions.find(elem => elem.value == id);
        return permissionObj.label;
    }


    changeRows= (e)=>{
        this.setState({rows : e.target.value})
    }

    changeName= (e)=>{
        this.setState({name : e.target.value})
    }

    render(){

        const dropDownOptionsVTDetection ={
            suggestions : this.state.vtdetectionSuggestions,
            title: "Select Malicious Index"
        }

        const dropDownOptionsSource ={
            suggestions : this.state.sourceSuggestions,
            title: "Select Source"
        }

        const dropDownGenre ={
            suggestions : this.state.suggestions,
            title: "Select Genre"
        }

        let title = "Number of Rows (Max:" + this.state.appTotal+ " )";
        return(
            <div>


                <Paper elevation={3} style={{ width: "50%", textAlign: "center", marginLeft: "20%", marginTop: "5%"}}>
                    <Typography gutterBottom variant="h5" component="h2" style={{marginTop: "30px", paddingTop: "30px", color: "#3f51b5"}}>
                        Download
                    </Typography>

                    <div style={{display: "inline-block", height: "400px", width: "500px"}}>
                        <TextField id="standard-basic" value = {this.state.name} required label= "Registered name" style={{marginLeft: "1%", marginTop: "3%", width: "100%"}}
                                   onChange={this.changeName.bind(this)} />

                        <TextField id="standard-basic" value = {this.state.rows} label= {title} style={{marginLeft: "1%", width: "100%", marginTop: "3%"}}
                                   onChange={this.changeRows.bind(this)} />

                        <GenericDropDown id="VTDropDown"  style={{marginLeft: "1%", marginTop: "3%"}}  data = {dropDownOptionsSource} onChange={this.onSourceChange.bind(this)}/>
                 {/*       <GenericDropDown id="categoryDropDown" style={{width: "200px", marginTop: "10px"}} data = {dropDownGenre} onChange={this.changeCatDropDown.bind(this)}/>*/}

                        {this.state.rotate ? <CircularProgress color="secondary"  style={{marginLeft : "45%", textAlign: "center", display: "block", marginTop: "2%"}} /> :  ""}
                        <Typography gutterBottom variant="h5" component="h2" style={{marginTop: "5px", paddingTop: "30px", color: "#3f51b5"}}>

                        </Typography>

                        <Button variant="contained" color="primary" onClick={this.fetchData.bind(this)} style={{}}>
                            Download
                        </Button>
                    </div>
                </Paper>

                <CSVLink
                    data={this.state.data}
                    filename="data.csv"
                    className="hidden"
                    ref={this.csvLink}
                    target="_blank"
                />
            </div>

        )
    }
}

