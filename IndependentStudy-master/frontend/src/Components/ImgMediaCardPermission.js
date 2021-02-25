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


export default class ImageMediaCardPermission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: "All"
        }
    };

    onChangeRadio = (event)=>{
        this.setState({filter: event.target.value})
    };


    getActionButtons = ()=>{

        if(this.state.filter == "All"){
            return  <div>
                <Button size="small" color="primary"  style={{marginLeft: "5px"}} variant="contained" component = {Link} to={"/PermissionAll"}>
                    All
                </Button>
                <Button size="small" color="primary"  style={{marginLeft: "5px"}} variant="contained" component = {Link} to={"/PermissionProtectionAll"}>
                    Protection Level
                </Button>
                <Button size="small" color="primary" style={{marginLeft: "5px"}} variant="contained" component = {Link} to={"/PermissionDeveloper"}>
                    Developer
                </Button>
                <Button size="small" color="primary"  style={{marginLeft: "5px", marginTop: "5px"}} variant="contained" component = {Link} to={"/PermissionCategoryAll"}>
                    Dangerous Permissions Category
                </Button>
            </div>
        }else{
            return  <div>
                <Button size="small" color="primary"  style={{marginLeft: "5px"}} variant="contained" component = {Link} to={"/PermissionGenre"}>
                    Genre
                </Button>
                <Button size="small" color="primary"  style={{marginLeft: "5px"}} variant="contained" component = {Link} to={"/PermissionProtectionGenre"}>
                    Protection Level
                </Button>
                <Button size="small" color="primary"  style={{marginLeft: "5px", marginTop: "5px"}} variant="contained" component = {Link} to={"/PermissionCategoryGenre"}>
                    Dangerous Permissions Category
                </Button>
            </div>
        }

    }

    render() {
        let root = {
            maxWidth: 345,
            marginLeft: "10px"
        };

        return (
            <Card className={root} style={{marginLeft : "10px" , width: "32%"}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="Perm.jpg"
                        title="Contemplative Reptile"
                        marginLeft="10%"
                        marginTop="20%"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Permission
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Permission usage views
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h5" style={{marginTop :"1%"}} >

                        </Typography>

                        <RadioGroup aria-label="index" row name="index" style={{marginLeft :"20%"}} value={this.state.filter} onChange={this.onChangeRadio.bind(this)}>
                            <FormControlLabel  style={{width :"40%"}} value="All" control={<Radio />} label="All" />
                            <FormControlLabel  style={{width :"40%"}}value="Genre" control={<Radio />} label="Genre" />
                        </RadioGroup>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {this.getActionButtons()}
                </CardActions>
            </Card>
        );
    }
}
