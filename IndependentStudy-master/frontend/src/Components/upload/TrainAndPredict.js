import React, { Component } from 'react';

import {GroupedBarChart, TrainCardApp, PredictCardApp, Predict} from '../index'
export default class TrainAndPredict extends Component {

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
;

        return (
            <div>

                <div style={{display: "flex", marginTop: "2%"}}>

                  <TrainCardApp  style={{ width: "30%", marginLeft: "10px"}}/>
                  <Predict  style={{ width: "30%", marginLeft: "10px"}}/>
                </div>
            </div>
        )
    }
}