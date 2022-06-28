import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from 'axios';
import {blue, green, pink, red} from "@material-ui/core/colors/index";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, source, lastModified, isdownloadable) {
    return { name, source, lastModified, isdownloadable };
}

export default function Resource() {
    const classes = useStyles();
    const [resources, setResources] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        if(resources.length == 0)
            populateResources();

    });

    const populateResources =() =>{
        let resources = []
        let rows = []
        axios.get('/api/getResources').then((result)=>{
            resources = result.data;
            setResources(result.data);
        }).then(()=>{
            for(let i in resources){
               let row =  createData(resources[i].name, resources[i].source, resources[i].lastmodified, resources[i].isdownloadable)
                rows.push(row);
            }
            setRows(rows);
        }).catch((err)=>{
            console.log(err)
        })
    }



    return (
        <TableContainer component={Paper}>
            <Typography gutterBottom variant="h5" component="h2">
                Resources
            </Typography>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Name</b></TableCell>
                        <TableCell align="right"><b>Source</b></TableCell>
                        <TableCell align="right"><b>Last&nbsp; Modified</b></TableCell>
                        <TableCell align="right"><b>Downloadable</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right"><Link >{row.source} </Link> </TableCell>
                            <TableCell align="right">{row.lastModified}</TableCell>
                            <TableCell align="right">{row.isdownloadable == 0 ? <CancelIcon style={{color: '#ef5350'}}/> : <CheckCircleIcon style={{color: '#009688'}}/> }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
