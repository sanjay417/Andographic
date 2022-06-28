import React, { Component } from 'react';
import {ImageMediaCardPermission, ImageMediaCardAction, ImageMediaCardApp} from './index';
import BarChart from "./Chart";
import {Button, Icon, Paper} from "@material-ui/core";
import {GroupedBarChart} from './index'
import axios from 'axios';
import jsPDF from 'jspdf';
import canvg from 'canvg';
import d3_save_pdf from 'd3-save-pdf';
import * as d3 from "d3";
import GetApp from '@material-ui/icons/GetApp';
import ReactDOM from 'react-dom';
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
export default class Playground extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index : "All",
            vtdetections: []
        }
    }

    componentDidMount(){

    };



    onChangeRadio = (event) =>{
        this.setState({index: event.target.value})
    };


    render() {


        const data = {
            vtdetections: this.props.options.vtdetections
        };

        return (
            <div>

                <div style={{display: "flex", marginTop: "2%"}}>

                  <ImageMediaCardApp options = {data} style={{ width: "30%", marginLeft: "10px"}}/>
                  <ImageMediaCardPermission options = {data}  style={{ width: "30%", marginLeft: "10px"}}/>
                  <ImageMediaCardAction options = {data} style={{ width: "30%"}}/>

                </div>
            </div>
        )
    }
}