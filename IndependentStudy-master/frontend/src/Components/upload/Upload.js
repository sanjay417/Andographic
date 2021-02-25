import React, { Component } from 'react';
import {AppAccordian, GenericDropDown} from '../index';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import axios from 'axios';
import {Button, TextField, CircularProgress} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import ReactFileReader from 'react-file-reader';
import csv from 'csv';
import Paper from "@material-ui/core/Paper/Paper";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import Radio from "@material-ui/core/Radio/Radio";


export default class Upload extends Component{
    constructor(props) {
        super(props);
        this.state = {
            appData : [],
            systemActions: [],
            permissions: [],
            predictMsg: "",
            accuracy: "",
            rowsAccuracy: 1000,
            rowsPrediction: 1000,
            rotate: false,
            rotateTrain: false,
            source: "",
            sourceName: "",
            users: [],
            action: "upload",
            name: "",
            downloadable: 1,
            permArray: ["ID1","ID2","ID3","ID4","ID5","ID6","ID7","ID8","ID9","ID10","ID11","ID12","ID13","ID14","ID15","ID16","ID17","ID18","ID19","ID20","ID21","ID22","ID23","ID24","ID25","ID26","ID27","ID28","ID29","ID30","ID31","ID32","ID33","ID34","ID35","ID36","ID37","ID38","ID39","ID40","ID41","ID42","ID43","ID44","ID45","ID46","ID47","ID48","ID49","ID50","ID51","ID52","ID53","ID54","ID55","ID56","ID57","ID58","ID59","ID60","ID61","ID62","ID63","ID64","ID65","ID66","ID67","ID68","ID69","ID70","ID71","ID72","ID73","ID74","ID75","ID76","ID77","ID78","ID79","ID80","ID81","ID82","ID83","ID84","ID85","ID86","ID87","ID88","ID89","ID90","ID91","ID92","ID93","ID94","ID95","ID96","ID97","ID98","ID99","ID100","ID101","ID102","ID103","ID104","ID105","ID106","ID107","ID108","ID109","ID110","ID111","ID112","ID113","ID114","ID115","ID116","ID117","ID118","ID119","ID120","ID121","ID122","ID123","ID124","ID125","ID126","ID127","ID128","ID129","ID130","ID131","ID132","ID133","ID134","ID135","ID136","ID137","ID138"],
            actionArray: ["ID139","ID140","ID141","ID142","ID143","ID144","ID145","ID146","ID147","ID148","ID149","ID150","ID151","ID152","ID153","ID154","ID155","ID156","ID157","ID158","ID159","ID160","ID161","ID162","ID163","ID164","ID165","ID166","ID167","ID168","ID169","ID170","ID171","ID172","ID173","ID174","ID175","ID176","ID177","ID178","ID179","ID180","ID181","ID182","ID183","ID184","ID185","ID186","ID18","ID188","ID189","ID190","ID191","ID192","ID193","ID194","ID195","ID19","ID197","ID198","ID199","ID200","ID201","ID202","ID203","ID204","ID205","ID206","ID207","ID208","ID209","ID210","ID211","ID212","ID213","ID214","ID215","ID216","ID21","ID218","ID219","ID220","ID221","ID222","ID223","ID224","ID225","ID226","ID227","ID228","ID229","ID230","ID231","ID232","ID233","ID235","ID238","ID239","ID240","ID241","ID242","ID243","ID24","ID245","ID246","ID247","ID248","ID249","ID250","ID251","ID252","ID253","ID254","ID255","ID256","ID257","ID258","ID259","ID260","ID261","ID262","ID263","ID264","ID265","ID266","ID267","ID268","ID269","ID270","ID271","ID272","ID273","ID274","ID275","ID276","ID277","ID278","ID279","ID280","ID281","ID282","ID283","ID284","ID285","ID286","ID287","ID288","ID289","ID290","ID291","ID292","ID293","ID294","ID295","ID296","ID297","ID298","ID299","ID300","ID301","ID302","ID303","ID304","ID305","ID306","ID30","ID308","ID309","ID310","ID311","ID312"]
        }
    }

    componentDidMount(){
        this.populateSystemActions();
        this.populatePermissions();
        this.populateUsers();
    };


    populateUsers =() =>{
        let users = []
        let rows = []
        axios.get('/api/users').then((result)=>{
            this.setState({users: result.data})

        }).catch((err)=>{
            console.log(err)
        })
    }


    populateSystemActions =() =>{
        axios.get('/api/getSystemActions').then((result)=>{
            const dataSuggestions = result.data.map(entry => ({
                value: entry.pid,
                label: entry.permission
            }))
            this.setState({systemActions: dataSuggestions})
        }).catch((err)=>{
            console.log(err)
        })
    };


    populatePermissions =() =>{
        axios.get('/api/getPermissions').then((result)=>{
            //console.log(result);
            const dataSuggestions = result.data.map(entry => ({
                value: entry.pid,
                label: entry.permission,
            }))
            this.setState({permissions: dataSuggestions})
        }).catch((err)=>{
            console.log(err)
        })
    };

    getPermissionName =(permission) =>{
        let permissionObj = this.state.permissions.find(elem => elem.label == permission);
        return permissionObj.value;
    }

    getActionName =(action) =>{
        let permissionObj = this.state.systemActions.find(elem => elem.label == action);
        return permissionObj.value;
    }

   /* convert = (data) =>{

        let result = {};
        let self = this;

        let permCOunt = 0;
        let actionCOunt = 0;
        Object.keys(data).forEach(function(key) {
            let print = "";
            if(key != 'permissions' && key != 'systemActions'){
                result[key] = data[key];
                console.log(key)
            }else if(key == 'permissions'){
                let list  = data[key]
                for(let i in list){
                    let id = self.getPermissionId(i)
                    result[id] = data.permissions[i];
                    console.log(id)
                    permCOunt++;
                }

            }else if(key == 'systemActions'){
                let list  = data[key]
                for(let i in list){
                    //let pieces = i.split('.')
                    //let action = pieces[pieces.length-1]
                    let id = self.getSystemActionId(i)
                    result[id] = data.systemActions[i];
                    console.log(id)
                    actionCOunt++;
                }
            }

        });

        console.log("Perm", permCOunt);
        console.log("Action", actionCOunt);
       return result;
    }*/

    getSystemActionId =(name) =>{
        let permissionObj = this.state.systemActions.find(elem =>
            elem.label == name
        );
        return permissionObj != undefined ? permissionObj.value : undefined;
    }
    getPermissionId =(name) =>{
        let permissionObj = this.state.permissions.find(elem =>
            elem.label == name
        );
        return permissionObj != undefined ? permissionObj.value : undefined;
    }

    handleChange = (data) =>{
        this.setState({appData: data});
    }

/*
    handlePredict = (data) =>{
        let finalData = this.convert(this.state.appData);
        finalData = JSON.stringify(finalData);
        this.setState({rotate : true})
        axios.post('/ML/predict?rows='+this.state.rowsPrediction, finalData, {headers: {'Content-Type': 'application/json'}}).then((result)=>{
            let prediction = result.data == "Yes" ? "Malicious" :"Benign"
            this.setState({"predictMsg" : prediction})
            this.setState({rotate : false})
        }).catch((err)=>{
            console.log(err)
        })

    }
*/

    handleUpload =(data) =>{

    }

    changeAccuracyRows= (e)=>{
        this.setState({"rowsAccuracy" : e.target.value})
    }

    changePredictionRows= (e)=>{
        this.setState({"rowsPrediction" : e.target.value})
    }

    csvJSON=(csv)=>{

        let lines=csv.split("\n");

        let result = [];

        let headers=lines[0].split(",");

        for(let i = 0; i < headers.length; i++){

            headers[i] = headers[i].replace(/\"/g, "")
           let action =  this.getSystemActionId(headers[i]);
           let perm = this.getPermissionId(headers[i])

           if(action != undefined){
               headers[i] = action;
           }

            if(perm != undefined){
                headers[i] = perm;
            }
        }

        for(let i=1; i<lines.length;i++){

            let obj = {};
            let currentline=lines[i].split(",");

            for(let j = 0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }
            obj['source'] = this.state.sourceName;
            result.push(obj);

        }

        console.log(result)
        return result
    }

    handleFiles = files => {
        let self = this;
        let user = this.state.users.filter(function (data) {
            return data.name == self.state.name && data.action == self.state.action;
        })


        if(user && user[0] && user[0].approve == 1) {
            let reader = new FileReader();

            reader.onload = function (e) {
                let data = self.csvJSON(reader.result)
                self.insertResource()
                self.insert(data);
            }
            reader.readAsText(files[0])
        }else{
            alert("User not Authorized")
        }
    }


    insertResource =(data) => {
        this.setState({rotate : true})
        let resource = {
            name: this.state.sourceName,
            source: this.state.source,
            isdownloadable: this.state.downloadable
        }
        axios.post('/api/insertResource', {resource: resource}, {headers: {'Content-Type': 'application/json'}}).then((result)=>{
            this.setState({rotate : false})
        }).catch((err)=>{
            console.log(err)
        })
    }

    getPermActionData=(data)=>{
        let cols = ["pkgname", "Genre", "DeveloperName", "Title"]
        let permCount = 0;
        let actionCount = 0;
        for(let i in data){
            if(this.state.permArray.includes(i) && data[i] != 0){
                permCount = permCount + 1;
            }

            if(this.state.actionArray.includes(i) && data[i] != 0){
                actionCount = actionCount + 1;
            }
        }

        let permJson = {};
        let actionJson = {};
        for(let i in cols){
            permJson[cols[i]] = data[cols[i]];
            actionJson[cols[i]] = data[cols[i]];
        }

        permJson["source"] =  this.state.sourceName;
        actionJson["source"] =  this.state.sourceName;
        permJson["count"] = permCount;
        actionJson["count"] = actionCount;

        return {"permission": permJson, "action": actionJson}


    }

    insertPermView =(data, type) =>{
        this.setState({rotate : true})
        axios.post('/api/insertPermActionView?type='+type, {app : data}, {headers: {'Content-Type': 'application/json'}}).then((result)=>{
            this.setState({rotate : false})
        }).catch((err)=>{
            console.log(err)
        })
    }




    insert =(data) =>{

        for(let i = 0; i < data.length; i++){
           // let finalData = this.convert(this.state.appData);
            //finalData = JSON.stringify(finalData);
            let json = this.getPermActionData(data[i]);
            this.setState({rotate : true})
            axios.post('/api/insert', {app : data[i]}, {headers: {'Content-Type': 'application/json'}}).then((result)=>{
                this.setState({rotate : false})
            }).
            then(()=>{
                 this.insertPermView(json["permission"], "permission")

            }).
            then(()=>{
                this.insertPermView(json["action"], "action")
            }).
            catch((err)=>{
                console.log(err)
            })
        }

    };

    changeSourceName= (e)=>{
        this.setState({sourceName : e.target.value})
    }

    changeSource= (e)=>{
        this.setState({source : e.target.value})
    }

    changeName= (e)=>{
        this.setState({name : e.target.value})
    }

    onChangeRadio = (event) =>{
        this.setState({downloadable: event.target.value})
    };

    render(){


        return(
            <div style={{display : "flex", textAlign:"left"}} >

                <Paper elevation={3} style={{ width: "50%", textAlign: "center", marginLeft: "20%", marginTop: "5%"}}>
                    <Typography gutterBottom variant="h5" component="h2" style={{marginTop: "30px", paddingTop: "30px", color: "#3f51b5"}}>
                        Upload
                    </Typography>

                    <div style={{display: "inline-block", height: "400px", width: "500px"}}>

                        <TextField id="standard-basic" value = {this.state.sourceName} required label= "Dataset name" style={{marginLeft: "1%", marginTop: "3%", width: "100%"}}
                                   onChange={this.changeSourceName.bind(this)} />
                        <TextField id="standard-basic" value = {this.state.source} required label= "Source" style={{marginLeft: "1%", marginTop: "3%", width: "100%"}}
                                   onChange={this.changeSource.bind(this)} />
                        <TextField id="standard-basic" value = {this.state.name} required label= "Registered name" style={{marginLeft: "1%", marginTop: "3%", width: "100%"}}
                                   onChange={this.changeName.bind(this)} />

                        <div style={{ marginTop: "3%", textAlign:"left"}}>
                            <FormLabel component="legend">Downloadable</FormLabel>
                            <RadioGroup aria-label="index" row  style={{marginLeft :"0%"}} name="downloadable" value={this.state.downloadable} onChange={this.onChangeRadio.bind(this)}>
                                <FormControlLabel  style={{width :"20%"}} value="1" control={<Radio />} label="Yes" />
                                <FormControlLabel  style={{width :"20%"}}value="0" control={<Radio />} label="No" />
                            </RadioGroup>
                       </div>

                        {this.state.rotate ? <CircularProgress color="secondary"  style={{marginLeft : "45%", textAlign: "center", display: "block", marginTop: "2%"}} /> :  ""}


                        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'} style={{marginTop: "2%"}}>
                            <Button variant="contained" color="primary" onClick={this.handleUpload.bind(this)} style={{marginTop: "2%"}}>
                                Upload
                            </Button>

                        </ReactFileReader>
                    </div>
                </Paper>

            </div>

        )
    }
}

