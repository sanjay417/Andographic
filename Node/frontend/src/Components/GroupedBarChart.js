import React, {Component} from 'react';
import * as d3 from "d3";
import GetApp from '@material-ui/icons/GetApp';
import {Button} from "@material-ui/core";
class GroupedBarChart extends Component {
    constructor(){
        super();
        this.state = {
           graphData :[
               {
                   "group":"f1",
                   "field1":19,
                   "field2":83,
                   "field3":0,
               },
               {
                   "group":"f2",
                   "field1":67,
                   "field2":93,
                   "field3":0,
               },
               {
                   "group":"f3",
                   "field1":10,
                   "field2":56,
                   "field3":0,
               }
           ]

        }

    }

    drawChart() {

        //const data = this.props.data;
        const data = this.state.graphData;
        const  models = this.props.data;

       if(models && models.length > 0){

           const self = this;
           var legendParam = this.props.attributes.legend;
            var container = d3.select('#'+ this.props.attributes.elem),
                width = 1000,
                height = 420,
                margin = {top: 30, right: 30, bottom: 30, left: 50},
                barPadding = .2,
                axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};

            var svg = container
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`)




           svg.append("text")
               .attr("x", (width / 2))
               .attr("y", 0 - (margin.top / 2))
               .attr("text-anchor", "middle")
               .style("font-weight", "bold")
               .style("fill", "#505050")
               .style("margin", "10px")
               .text(this.props.attributes.title);

            var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
            var xScale1 = d3.scaleBand();
            var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

            var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
            var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);


           const keys = Object.keys(models[0]);
            const fields = keys.filter(function (key) {
                return key.includes('field');
            })

            xScale0.domain(models.map(d => d.group));
            xScale1.domain(fields).range([0, xScale0.bandwidth()]);
            var i = 0;
            var numberValues = [];
            for(i in models){
                var j = 0;
                for(j in models[i]){
                    if(j != 'group'){
                        numberValues.push(models[i][j]);
                    }
                }
            }
            yScale.domain([0,Math.max.apply(Math,numberValues)]);


           const color = this.props.attributes.color;

            let model_name = svg.selectAll(".group")
                .data(models)
                .enter().append("g")
                .attr("class", "group")
                .attr("transform", d => `translate(${xScale0(d.group)},0)`);

            /* Add field1 bars */

           for(let i = 1; i <= fields.length ; i++){
               model_name.selectAll(".bar.field"+i)
                   .data(d => [d])
                   .enter()
                   .append("rect")
                   .attr("class", "bar field" + i)
                   .style("fill",color[2 + i])
                   .attr("num", i)
                   .attr("x", d => xScale1('field'+i))
                   .attr("y", d => yScale(d["field" + i]))
                   .attr("width", xScale1.bandwidth())
                   .attr("height", d => {
                       return height - margin.top - margin.bottom - yScale(d["field" + i])
                   })
                   .on("click", function(d) {
                       if(this.getAttribute('num') == "2"){
                           //self.props.onPermissionClick(self, 2, self.props.attributes.selectedDevelopers);
                       }
                   })
                   .on("mouseover", function(d) {
                       d3.select(this).style("fill", color[2]);

                   })
                   .on("mouseout", function(d, e) {
                       this.style.fill = color[2 + parseInt(this.getAttribute('num'))];
                   })
                   .append("svg:title")

                   .text(d => d["field" + i]);

           }

            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
                .call(xAxis);
            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);
           model_name.selectAll("rect").transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");

           //Legend

           if(this.props.attributes.showLegend == true){
               var legend = svg.selectAll(".legend")
                   .data(legendParam.map(function(d) { return d }).reverse())
                   .enter().append("g")
                   .attr("class", "legend")
                   .attr("transform", function(d,i) { return "translate(30," + i * 30 + ")"; })
                   .style("opacity","0");

               legend.append("rect")
                   .attr("x", width - 100)
                   .attr("width", 18)
                   .attr("height", 18)
                   .attr("margin-left", "20px")
                   .style("fill", function(d, i) { return color[3 + i++]; });

               legend.append("text")
                   .attr("x", width - 100)
                   .attr("y", 9)
                   .attr("dy", ".35em")
                   .attr("margin-left", "20px")
                   .style("text-anchor", "end")
                   .text(function(d) {return d; });

               legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
           }

        }else {
           let width = 200, height = 220;
           margin = {top: 0, right: 20, bottom: 30, left: 50};
           let container = d3.select('#'+ this.props.attributes.elem)
           let svg =container
               .append("svg")
               .style("margin-top", "4em")
               .attr('width', width)
               .attr('height', height);


           svg.append('image')
               .attr('xlink:href', 'bars.png')
               .attr('width', width)
               .attr('height', height)
               .style("opacity", 0.1)


           svg.append("text")
               .attr("x", (width / 2))
               .attr("y", 20 )
               .attr("text-anchor", "middle")
               .style("font-weight", "bold")
               .style("fill", "#3f51b5")
               .style("margin", "10px")
               .text("NO CHART AVAILABLE");

       }

    }

    render(){
        this.drawChart();
        return (<div id={"#" + this.props.id}>
        </div>)
    }
}

export default GroupedBarChart;
