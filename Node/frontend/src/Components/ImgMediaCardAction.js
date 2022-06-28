import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import {Link} from "react-router-dom";


export default class ImageMediaCardAction extends Component {


    constructor(props) {
        super(props);
        this.state = {
            filter: "All"
        }
    };

    onChangeRadio = (event)=>{
        this.setState({filter: event.target.value})
    };


    render() {
        let root = {
            maxWidth: 345,
            marginLeft: "10px"
        };

        return (
            <Card className={root} style={{marginLeft : "10px", width: "32%"}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="gear3.png"
                        title="Contemplative Reptile"
                        marginLeft="10%"
                        marginTop="20%"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                           System Action
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            System Action usage views
                        </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions style={{marginLeft: "25%"}}>
                    <Button size="small" color="primary" variant="contained"  component = {Link} to={"/ActionAll"}>
                        All
                    </Button>
                    <Button size="small" color="primary" style={{marginLeft: "5px"}} variant="contained" component = {Link} to={"/SystemActionGenre"}>
                       Genre
                    </Button>
                    <Button size="small" color="primary" style={{marginLeft: "5px"}} variant="contained" component = {Link} to={"/ActionDeveloper"}>
                        Developer
                    </Button>
                </CardActions>
            </Card>
        );
    }
}
