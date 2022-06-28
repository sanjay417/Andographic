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
import {CircularProgress} from "@material-ui/core";


export default class PredictCardApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: "All"
        }
    }
    onChangeRadio = (event)=>{
        this.setState({filter: event.target.value})
    };

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
                                Application
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.rotate ? <CircularProgress color="secondary"  style={{marginLeft : "25px"}} /> : null}
                            </Typography>



                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{marginLeft: "40%"}}>
                        <Button variant="contained" color="primary"  onClick={this.handlePredict.bind(this)} style={{marginLeft : "0"}}>
                            Predict
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
