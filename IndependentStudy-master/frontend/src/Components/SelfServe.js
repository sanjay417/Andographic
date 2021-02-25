import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { green, pink, blue } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import BubbleChartIcon from '@material-ui/icons/Assignment';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import SelfServeDataList from './SelfServeSourceDataList';
import BarChart from './Chart';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%",
        overflow: "auto"
    },

    dimension:{
        height: "100%",
        width: "100%"
    },
    avatar: {
        margin: 10,
    },
    pinkAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: pink[500],
    },
    greenAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: green[500],
    },

    blueAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: blue[500],
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

    chartDim:{
        height: "100%",
        width: "100%"
    }
}));

export default function FixedContainer() {
    const classes = useStyles();
    const [source, setSource] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [sourceData, setSourceData] = React.useState("");
    const [graphData, setGraphData] = React.useState("");


    const handleChange = event => {
        setSource(event.target.value);
        if(event.target.value == 'Contextual'){
            fetch('/api/getContextualColumns')
                .then(response => response.json())
                .then(state => setSourceData(state));
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const changeDataListHandler =(value) =>{
        axios.get('/api/getContextualColumnData?column='+value).then((result)=>{
            setGraphData(result.data);
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" fixed={false} className={classes.dimension}>
                <Typography component="div" className={classes.dimension} style={{height: '80vh'}}>
                    <Grid container justify="center" alignItems="center">
                        <Avatar className={classes.blueAvatar}>
                            <BarChartIcon />
                        </Avatar>
                        <Avatar className={classes.pinkAvatar}>
                            <PieChartIcon />
                        </Avatar>
                        <Avatar className={classes.greenAvatar}>
                            <BubbleChartIcon />
                        </Avatar>
                    </Grid>
                    <Grid container spacing={3} className={classes.dimension}>
                        <Grid item xs={5} className={classes.dimension}>
                            <Paper className={classes.paper}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="demo-controlled-open-select">Select Source</InputLabel>
                                    <Select
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={source}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'Select Source',
                                            id: 'source',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'Contextual'}>Contextual</MenuItem>
                                        <MenuItem value={'Technical'}>Technical</MenuItem>
                                    </Select>
                                </FormControl>
                                <SelfServeDataList data={sourceData} onClick={changeDataListHandler} ></SelfServeDataList>

                            </Paper>
                        </Grid>
                        <Grid item xs={7}>
                            <Paper className={classes.paper} >
                                <div id = 'chartCanvas' className={classes.chartDim} >
                                    <BarChart data={graphData} />
                                </div>
                            </Paper>

                        </Grid>
                    </Grid>
                </Typography>
            </Container>
        </React.Fragment>
    );
}