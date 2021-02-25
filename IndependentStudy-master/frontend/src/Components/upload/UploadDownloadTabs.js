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
    Download, Upload
} from '../index';
import GetAppIcon from '@material-ui/icons/GetApp';
import {Category, Person, LockOpen, Apps, SystemUpdateAlt} from '@material-ui/icons';
import PublishIcon from '@material-ui/icons/Publish';

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

export default function UploadDownloadTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);
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

    const data={

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
                        <Tab label=" Upload" icon={<PublishIcon color={"primary"}/>} {...a11yProps(0)} />
                       <Tab label="Download" icon={<GetAppIcon color={"primary"}/>} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>



                <TabPanel value={value} index={0}  style={{ minWidth: "80em"}}>
                    {<Upload options = {data}/>}
                </TabPanel>
                <TabPanel value={value} index={1} style={{ minWidth: "80em"}}>
                    {value == 1 && <Download options = {data}/>}
                </TabPanel>
            </div>
        </HashRouter>
    );
}
