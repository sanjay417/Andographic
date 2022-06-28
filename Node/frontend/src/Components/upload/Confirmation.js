import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button, TextField, CircularProgress} from '@material-ui/core';
import {useEffect} from "react";
import axios from 'axios';
import Typography from "@material-ui/core/Typography";


const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'action', headerName: 'Action', width: 200 },
    { field: 'approve', headerName: 'Approval', width: 200 },
];


function createData(name, email, action, approve) {
    return { id : name +"_"+action, name: name, email: email, action: action, approve: approve == 1 ? "Approved" : "Pending" };
}

export default function Confirmation() {

    const [users, setUsers] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [selection, setSelection] = React.useState([]);
    const [rotate, setRotate] = React.useState([]);
    const [msg, setMsg] = React.useState([]);


    useEffect(() => {
        if(users.length == 0)
            populateUsers();

    });

    const approveUser =() =>{

        setRotate(true);
        axios.get('/api/approve?items='+selection.join()).then((result)=>{
            setRotate(false);
            setMsg(result.data)
            populateUsers();
        }).catch((err)=>{
            console.log(err)
        })
    }

    const revokeUser =() =>{
        setRotate(true);
        axios.get('/api/disapprove?items='+selection.join()).then((result)=>{
            setRotate(false);
            setMsg(result.data)
            populateUsers();
        }).catch((err)=>{
            console.log(err)
        })
    }

    const populateUsers =() =>{
        let users = []
        let rows = []
        axios.get('/api/users').then((result)=>{
            users = result.data;
            for(let i in users){
                let row =  createData(users[i].name, users[i].email, users[i].action, users[i].approve)
                rows.push(row);
            }
            setRows(rows);
            setUsers(result.data);
        }).catch((err)=>{
            console.log(err)
        })
    }


    return (
        <div style={{ height: 400, width: '100%', display:"block" }}>
            <Typography gutterBottom variant="h4" component="h2" style={{marginTop: "0%", paddingTop: "30px", color: "#3f51b5"}}>
                User Access Requests
            </Typography>

            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection  onSelectionChange={(newSelection) => {
                setSelection(newSelection.rowIds);
            }}/>
            <Typography gutterBottom variant="h6" component="h2" style={{marginTop: "25%", paddingTop: "30px", color: "#3f51b5"}}>
                {msg}
            </Typography>

            <Button variant="contained" color="primary" onClick={approveUser} style={{marginLeft: "0%", marginTop: "2%",width: "20%"}}>
                Approve
            </Button>

            <Button variant="contained" color="primary" onClick={revokeUser} style={{marginLeft: "1%", marginTop: "2%",width: "20%"}}>
                Revoke
            </Button>
        </div>
    );
}
