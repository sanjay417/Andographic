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
import TableContainer from "@material-ui/core/TableContainer";


export default class RegisterUser extends Component{
    csvLink = React.createRef()
    constructor(props) {
        super(props);
        this.state = {
            data : "",
            rotate: false,
            suggestions: [{value: "download", label: "Download"},
                {value: "upload", label: "Upload"}],
            action : "",
            email: "",
            name: "",
            error: false,
            helperText: "",
            template : false,
            vtdetections: [],
            source: 'self',
            templateData: []
        }
    }

    componentDidMount(){

    };


    downloadTemplate =() =>{
        axios.get('/api/download?limit='+1 + '&vtdetections=' + this.state.vtdetections.join() +'&source='+this.state.source).then((result)=>{
            this.setState({templateData: result.data})
            this.csvLink.current.link.click()
        }).catch((err)=>{
            console.log(err)
        })

    };



    registerUser =() =>{
        let splits = this.state.email.split(".");
        let split = splits[splits.length - 1];
        if(split == 'edu'){
            this.setState({ helperText: '', error: false });
        }else{
            this.setState({ helperText: 'Must end with .edu', error: true });
            return;
        }

        this.setState({rotate: true})
        const user = {
            name: this.state.name,
            email: this.state.email,
            action: this.state.action
        };

        axios.post('/api/registerUser', {user}).then((result)=>{
            this.setState({rotate: false})
            this.setState({data: result.data})
        }).catch((err)=>{
            console.log(err)
        })
    };



    getPermissionName =(id) =>{
        let permissionObj = this.state.permissions.find(elem => elem.value == id);
        return permissionObj.label;
    }


    changeEmail= (e)=>{
        //let value = e.target.value;
        this.setState({email : e.target.value})
    }

    changeName= (e)=>{
        this.setState({name : e.target.value})

    }

    changeAction= (result, selectedVals)=>{
        let filters = [];
        let action = "";
        if (selectedVals && selectedVals.length > 0) {
            for (let i in selectedVals) {
                filters.push(selectedVals[i].value)
            }
            action = filters[0];
        }

        this.setState({action :action})
        if(action == "upload"){
            this.setState({template : true})
        }else{
            this.setState({template : false})
        }
    }
    render(){

        const dropDownOptionsVTDetection ={
            suggestions : this.state.suggestions,
            title: "Select Action"
        }

        const dropDownOptions ={
            suggestions : this.state.suggestions,
            title: "Action"
        }

        return(
            <div>

                <Paper elevation={3} style={{ width: "30%", textAlign: "center", marginLeft: "30%", marginTop: "10%"}}>
                    <Typography gutterBottom variant="h5" component="h2" style={{marginTop: "30px", paddingTop: "30px", color: "#3f51b5"}}>
                        Register User
                    </Typography>

                    <div style={{display: "block", height: "420px"}}>
                        <TextField id="standard-basic" value = {this.state.name} required label= "Name" style={{marginLeft: "2%", marginTop: "2%", width: "80%"}}
                                   onChange={this.changeName.bind(this)} />
                        <TextField id="standard-basic" value = {this.state.email} required type = "email" label= "Email (.edu)"
                                   helperText={this.state.helperText} error= {this.state.errorText} style={{marginLeft: "2%", marginTop: "2%",width: "80%"}}
                                   onChange={this.changeEmail.bind(this)} />
                    {/*    <TextField id="standard-basic" value = {this.state.action} required label= "Action (Download/Upload)" style={{marginLeft: "2%", marginTop: "2%",width: "80%"}}
                                   onChange={this.changeAction.bind(this)} />*/}
                       <div  style={{marginLeft: "10%", marginTop: "4%", width: "81%"}}>
                            <GenericDropDown id="filterDropDown"   data = {dropDownOptions} onChange={this.changeAction.bind(this)}/>
                       </div>


                        {this.state.rotate ? <CircularProgress color="secondary"  style={{marginLeft : "45%", textAlign: "center", display: "block", marginTop: "2%"}} /> :  ""}
                        <Typography gutterBottom variant="h5" component="h2" style={{marginTop: "5px", paddingTop: "30px", color: "#3f51b5"}}>
                            {this.state.data}
                        </Typography>


                        <Button variant="contained" color="primary" onClick={this.registerUser.bind(this)} style={{marginLeft: "2%", marginTop: "0%",width: "80%"}}>
                            Register
                        </Button>

                        {this.state.template ? <Button variant="contained" color="primary" onClick={this.downloadTemplate.bind(this)} style={{marginLeft: "2%", marginTop: "4%",width: "80%"}}>
                            Download Template
                        </Button> : ""}
                    </div>

                </Paper>

                <CSVLink
                    data={this.state.templateData}
                    filename="template.csv"
                    className="hidden"
                    ref={this.csvLink}
                    target="_blank"
                />
            </div>

        )
    }
}

