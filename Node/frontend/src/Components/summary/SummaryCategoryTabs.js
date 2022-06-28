import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Box, Paper} from '@material-ui/core';
import {Link, HashRouter, Route, Switch} from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import {

    SummaryGenre,
    SummarySystemActions,
     SummaryPermission,
} from '../index';
import {Category, Person, LockOpen, Apps, SystemUpdateAlt} from '@material-ui/icons';
import {ListItem} from "@material-ui/core";
import axios from "axios";
import {useEffect } from 'react';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SummaryCategoryTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [multi, setMulti] = React.useState();
    const [flow, setFlow] = React.useState("");
    const [vtdetections, setVtdetections] = React.useState([]);
    const [index, setIndex] = React.useState("Malicious");
    const [permissions, setPermissions] = React.useState([]);
    const [systemActions, setSystemActions] = React.useState([]);

    const handleChange = (event, newValue, developers) => {
       if(developers){
            setMulti(developers)
            setFlow("drill");
       }
       setValue(newValue);
    };

    const onChangeFlow = (flowName) =>{
        setFlow(flowName);
    };

    const onChangeRadio = (event) =>{
        setIndex(event.target.value);
    };

    const populateVTDetections =() =>{
        axios.get('/api/VTDetection').then((result)=>{
            //this.setState({permissions: result.data});
            const dataSuggestions = result.data.map(entry => ({
                value: entry.vtdetection,
                label: entry.vtdetection,
            }))
            setVtdetections(dataSuggestions);
        }).catch((err)=>{
            console.log(err)
        })
    };

    const populateSystemActions =() =>{
        axios.get('/api/getSystemActions').then((result)=>{
            const dataSuggestions = result.data.map(entry => ({
                value: entry.pid,
                label: entry.permission.split(".").pop(-1),
            }))
            setSystemActions(dataSuggestions);
        }).catch((err)=>{
            console.log(err)
        })
    };

    const populatePermissions =() =>{
        axios.get('/api/getPermissions').then((result)=>{
            //console.log(result);
            const dataSuggestions = result.data.map(entry => ({
                value: entry.pid,
                label: entry.permission,
            }))
            setPermissions(dataSuggestions);
        }).catch((err)=>{
            console.log(err)
        })
    };

    useEffect(() => {
        if(vtdetections.length == 0)
            populateVTDetections();

        if(permissions.length == 0)
             populatePermissions();

        if(systemActions.length == 0)
            populateSystemActions();
    });

    const data = {
        vtdetections: vtdetections,
        tab: value,
        index: index,
        permissions: permissions,
        systemActions: systemActions
    };


    return (
        <HashRouter>

        <div className={classes.root}>
            <Paper elevation={3}  style={{ backgroundColor: "#F5F5F5", marginBottom: "1%", padding: "5px"}}>
                <RadioGroup aria-label="index" row  style={{marginLeft :"25%"}} name="index" value={index} onChange={onChangeRadio}>
                    <FormControlLabel  style={{width :"20%"}} value="All" control={<Radio />} label="All" />
                    <FormControlLabel  style={{width :"20%"}}value="Malicious" control={<Radio />} label="Malicious" />
                    <FormControlLabel  style={{width :"20%"}}value="Benign" control={<Radio />} label="Benign" />
                </RadioGroup>

            </Paper>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >

                    <Tab label=" Genre" icon={<Category color={"primary"}/>} {...a11yProps(0)} />
                    <Tab label="Permission" icon={<LockOpen color={"primary"}/>} {...a11yProps(1)} />
                    <Tab label="System Actions" icon={<SystemUpdateAlt color={"primary"}/>} {...a11yProps(2)} />

                </Tabs>
            </AppBar>



            <TabPanel value={value} index={0}  style={{ minWidth: "80em"}}>
                {<SummaryGenre options = {data}/>}
            </TabPanel>
            <TabPanel value={value} index={1} style={{ minWidth: "80em"}}>
                {value == 1 && <SummaryPermission options = {data}/>}
            </TabPanel>

            <TabPanel value={value} index={2}>
                {value == 2 && <SummarySystemActions options = {data}/>}
            </TabPanel>
        </div>

        </HashRouter>
    );
}
