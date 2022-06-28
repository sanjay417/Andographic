import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Link, HashRouter, Route, Switch} from 'react-router-dom';
import {
    DeveloperView,
    DevPermissionView,
    CategoryView,
    PermissionTabs,
    ApplicationView,
    GenreTabs,
    SystemActionView,
    DeveloperTabs, DeveloperConsole,PermissionView,
    GenreView
} from './index';
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

export default function CategoryTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [multi, setMulti] = React.useState();
    const [flow, setFlow] = React.useState("");
    const [vtdetections, setVtdetections] = React.useState([]);

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

    useEffect(() => {
        if(vtdetections.length == 0)
            populateVTDetections();
    });

    const data = {
        vtdetections: vtdetections
    };


    return (
        <HashRouter>
        <div className={classes.root}>
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
                   {/* <Tab label="Application" icon={<Apps color={"primary"}/>} {...a11yProps(5)} />*/}
                    <Tab label="Developer" icon={<Person color={"primary"} fontSize={"10"} />} {...a11yProps(3) } />


                </Tabs>
            </AppBar>



            <TabPanel value={value} index={0}  style={{ minWidth: "80em"}}>
                {<GenreView options = {data}/>}
            </TabPanel>
            <TabPanel value={value} index={1} style={{ minWidth: "80em"}}>
                {value == 1 && <PermissionView options = {data}/>}
            </TabPanel>

            <TabPanel value={value} index={2}>
                {value == 2 && <SystemActionView options = {data}/>}
            </TabPanel>
            <TabPanel value={value} index={5}>
                {value == 4 && <ApplicationView options = {data}/>}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {/* <DeveloperView onPermissionClick ={handleChange.bind(this)}/>*/}
             {/* {value == 3 &&  <DeveloperTabs />}*/}
                {value == 3 &&  <DeveloperView options = {data}/>}
            </TabPanel>
            <TabPanel value={value} index={4}  style={{ minWidth: "80em"}}>
                {value == 4 && <GenreTabs/>}
            </TabPanel>
        </div>

        </HashRouter>
    );
}
