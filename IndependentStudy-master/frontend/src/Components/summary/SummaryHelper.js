import React, { Component } from 'react';
import {CategoryDropDown, ColumnChart, GenericDropDown, HeatMapChart, PieChart, BubbleChartDrill} from '../index';
import BarChart from "../Chart";
import {Button, CircularProgress, Icon} from "@material-ui/core";
import {GroupColumnChart, BubbleChart, HeatMap} from '../index'
import axios from 'axios';
import jsPDF from 'jspdf';
import canvg from 'canvg';
import d3_save_pdf from 'd3-save-pdf';
import * as d3 from "d3";
import GetApp from '@material-ui/icons/GetApp';
import ReactDOM from 'react-dom';
import Paper from "@material-ui/core/Paper/Paper";
import TableChartIcon from '@material-ui/icons/TableChart';
import Avatar from '@material-ui/core/Avatar';
import BarChartIcon from '@material-ui/icons/BarChart';
import { green, pink, blue, red } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PieChartIcon from '@material-ui/icons/PieChart';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

export default class SummaryHelper extends Component {
    setPids =(permissions)=>{

        let pids = [];
        for(let i in permissions){
            pids.push(permissions[i].value);
        }
        //alert(pids);
        this.setState({pids: pids});
        this.setState({permissions: permissions})
        return pids;
    };
}