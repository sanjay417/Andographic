import React, {Component} from 'react';
import Card from '@material-ui/core/Card/index';
import CardActionArea from '@material-ui/core/CardActionArea/index';
import CardActions from '@material-ui/core/CardActions/index';
import CardContent from '@material-ui/core/CardContent/index';
import CardMedia from '@material-ui/core/CardMedia/index';
import Button from '@material-ui/core/Button/index';
import Typography from '@material-ui/core/Typography/index';
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import {CategoryTabs, CategoryTabsOthers, DeveloperConsole, Playground, ApplicationGenre} from "../index";
import Paper from "@material-ui/core/Paper/Paper";
import axios from 'axios'
import {CircularProgress} from "@material-ui/core";


export default class TrainCardApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: "All"
        }
    }
    onChangeRadio = (event)=>{
        this.setState({filter: event.target.value})
    };

    handleTrain = (data) =>{
        this.setState({rotateTrain : true})
        axios.get('/ML/train').then((result)=>{
            this.setState({rotateTrain : false})
            this.setState({"accuracy" : result.data.toFixed(2) + " %"})
        }).catch((err)=>{
            console.log(err)
        })


    }


    render() {
        let root = {
            maxWidth: 345,
            marginLeft: "10px",
            width: "30%"

        };

        const data = {
            vtdetections: this.state.vtdetections
        };


        return (
            <HashRouter>
                <Card className={root} style={{marginLeft : "10px" , width: "32%"}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="300"
                            image="apps.png"
                            title="Contemplative Reptile"
                            marginLeft="10%"
                            marginTop="20%"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Click to Train Model
                            </Typography>
                            {this.state.
                                rotateTrain ? <CircularProgress color="secondary"  style={{marginLeft : "25px"}} /> : null}

                            <Typography gutterBottom variant="h6" component="h5" style={{marginTop : "2%", marginLeft: "30%", display: "flex"}}>
                                Accuracy :  <Typography gutterBottom variant="h6" component="h5" style={{marginLeft : "2%", color: "red"}}>
                                {this.state.accuracy}
                            </Typography>
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{marginLeft: "40%"}}>
                        <Button variant="contained" color="primary"  onClick={this.handleTrain.bind(this)} style={{marginLeft : "0"}}>
                            Train
                        </Button>
                    </CardActions>
                </Card>
                <Switch>
                  {/*  <Route exact path={'/ApplicationGenre'}  component = {() => <ApplicationGenre options={data} />}/>*/}
                   {/* <Route exact path={'/ApplicationGenre'} component = {() => <ApplicationGenre options={data} />}/>*/}

                </Switch>

            </HashRouter>
        );
    }
}
