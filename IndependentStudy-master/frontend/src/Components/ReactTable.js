import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { ReactTable } from '.';
import axios from 'axios';

export default class DeveloperView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            columns : [],
            data :[]
        }
    };

    componentDidMount(){
        this.populateContextualdata();
    };

    populateContextualdata = () => {
        axios.get('/api/getDeveloperData').then(res => {
            var data = res.data;
            var columnArray = Object.keys(data[0]);
            console.log(data)
            this.setState({
                columns: columnArray
            });

            var dataArray = [];
            data.map((eachRow)=>{
                var tempArray = [];
                columnArray.map((eachKey)=>{
                    tempArray.push(eachRow[eachKey])
                });
                dataArray.push(tempArray)
            });

            this.setState({
                data: dataArray
            })

            // console.log(dataArray);

        })
    }

    render(){
        console.log(this.state.data);
        return(
            <MUIDataTable 
                title={"Android Security Data"} 
                data={this.state.data} 
                columns={this.state.columns}
            />
        )
    }
}
