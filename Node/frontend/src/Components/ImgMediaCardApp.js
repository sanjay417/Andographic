import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import {CategoryTabs, CategoryTabsOthers, DeveloperConsole, Playground, ApplicationGenre} from "./index";
import Paper from "@material-ui/core/Paper/Paper";


export default class ImageMediaCardApp extends Component {

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
                            height="140"
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
                                Number of applications
                            </Typography>



                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{marginLeft: "30%"}}>
                        <Button size="small" color="primary" variant="contained" component = {Link} to={"/ApplicationGenre"}>
                            Genre
                        </Button>
                        <Button size="small" color="primary" style={{marginLeft: "5px"}} variant="contained" component = {Link} to={"/ApplicationDeveloper"}>
                           Developer
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
