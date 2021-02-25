import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Box, Tooltip} from '@material-ui/core';
import {DevPermissionView, DeveloperAppsView, PermissionCategoryView, DeveloperView} from "./index";
import axios from "axios";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
};


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '50%',
        width: '100%',
        minHeight: '50em',
        minWidth: '50em'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        height: '50em',
        width: '15em'
    },

    panels:{
        width: "100%"
    }
}));

export default function DeveloperTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [multi, setMulti] = React.useState();
    const [flow, setFlow] = React.useState("");
    const [result, setResult] = React.useState({});

    const handleChange = (event, newValue, developers) => {
        if(developers){
            setMulti(developers)
            setFlow("drill");
        }
        setValue(newValue);
    };

    const onChangeFlow = (flowName) =>{
        setFlow(flowName);
    }


    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >

             {/*   <Tab label="Developer" {...a11yProps(0)}/>*/}
                <Tab label="Applications-Permissions-Actions" {...a11yProps(0)} />
                <Tab label="Dangerous-Normal Permissions" {...a11yProps(1)} />
            </Tabs>
         {/*   <TabPanel value={value} index={0} className={classes.panels}>
                <DeveloperAppsView result = {result}/>
            </TabPanel>*/}
            <TabPanel value={value} index={0} className={classes.panels}>
                <DeveloperView onPermissionClick ={handleChange.bind(this)} result = {result}/>
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.panels}>
                <DevPermissionView selectedDevelopers={multi} flow = {flow} result = {result} onChangeFlow={onChangeFlow.bind(this)}/>
            </TabPanel>
        </div>
    );
}
