import React, { Component } from 'react';
import './App.css';
import BarChart from './Components/Chart';
import Button from "@material-ui/core/Button";
import Layout from "./Components/Layout";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: '',
      barConfig: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render(){
    return (
        <div className='App' style={ { height : "98%"}}>

            <Layout style={ { height : "98%"}}/>
        </div>
    )
  }

  handleChange(event) {

  }

  handleSubmit(event) {
    fetch('/api/greeting')
        .then(response => response.json())
        .then(state => this.setState(state));
    const config = [35,42,67,89,25,34,67,85];
    this.setState({barConfig: config});
    this.setState({name: event.target.value});
  }
}
export default App