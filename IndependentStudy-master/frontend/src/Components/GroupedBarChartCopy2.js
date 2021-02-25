import React, {Component} from 'react';
import * as d3 from "d3";
class GroupedBarChart extends Component {
    constructor(){
        super();
        this.state = {
            graphData:[
                {
                    "devName": "John",
                    "values": [
                        {
                            "value": 1,
                            "rate": "App Count"
                        },
                        {
                            "value": 4,
                            "rate": "Permissions"
                        }
                    ]
                },
                {
                    "devName": "Tom",
                    "values": [
                        {
                            "value": 2,
                            "rate": "App Count"
                        },
                        {
                            "value": 3,
                            "rate": "Permissions"
                        }
                    ]
                }
                ]


        }

    }

    componentDidMount() {

        //this.setState({graphData: this.props.data})
        this.drawChart();

    }


    drawChart() {

        //const data = this.props.data;
        const data = this.state.graphData;
        if(data && data.length > 0){
            var margin = {top: 20, right: 20, bottom: 20, left: 10},
                width = 960 - margin.left - margin.right + 5,
                height = 500 - margin.top - margin.bottom;


            //var devNames = data.map(function(d) { return d.devName; });
            const xScale = d3.scaleBand()
                .domain(data.map(d => d.devName))
                .range([0, width]);


            var x0 = d3.scaleBand()
                .rangeRound([0, width], .1);

            var x1 = d3.scaleOrdinal();

            var y = d3.scaleLinear()
                .range([height, 0]);

            /*var xAxis = g => g
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x0).tickSizeOuter(0))
                .call(g => g.select(".domain").remove())*/

            const xAxis = d3.axisBottom()
                .scale(xScale);

            var  yAxis = g => g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y).ticks(null, "s"))
                .call(g => g.select(".domain").remove())
                .call(g => g.select(".tick:last-of-type text").clone()
                    .attr("x", 3)
                    .attr("text-anchor", "start")
                    .attr("font-weight", "bold")
                    .text(data.y))


            var color = d3.scaleOrdinal()
                .range(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0"]);

            var svg = d3.select('#chartCanvas').append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            var devNames = data.map(function(d) { return d.devName; });
            var rateNames = data[0].values.map(function(d) { return d.rate; });

            x0.domain(devNames);
            x1 = d3.scaleBand().domain(rateNames).range([0, 100]);
            y.domain([0, d3.max(data, function(devName) { return d3.max(devName.values, function(d) { return d.value; }); })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        /*    svg.append("g")
                .attr("class", "y axis")
                .style('opacity','0')
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .style("margin-left", "-20px")
                .style('font-weight','bold')
                .text("Value");

            svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');*/

            var slice = svg.selectAll(".slice")
                .data(data)
                .enter().append("g")
                .attr("margin", "100px")
                .attr("class", "g")
                .attr("transform",function(d) { return "translate(" + xScale(d.devName) + ",0)"; });

            slice.selectAll("rect")
                .data(function(d) { return d.values; })
                .enter().append("rect")
                .attr("width", x1.bandwidth())
                .attr("x", function(d) { return x1(d.rate); })
                .style("fill", function(d) { return color(d.rate) })
                .style("color", 'black')
                .attr("y", function(d) { return y(0); })
                .attr("height", function(d) { return height - y(0); })
                .append("div")
                .attr("height", function(d) { return (height - y(0) + 20); })
                .text(function(d) { return x1(d.rate); })
                .on("mouseover", function(d) {
                    d3.select(this).style("fill", d3.rgb(color(d.rate)).darker(2));
                })
                .on("mouseout", function(d) {
                    d3.select(this).style("fill", color(d.rate));
                })


            slice.selectAll("rect")
                .transition()
                .delay(function (d) {return Math.random()*1000;})
                .duration(1000)
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); });

            //Legend
            var legend = svg.selectAll(".legend")
                .data(data[0].values.map(function(d) { return d.rate; }).reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
                .style("opacity","0");

            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", function(d) { return color(d); });

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) {return d; });

            legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
        }

    }

    render(){

        //this.drawChart();
        return <div id={"#" + this.props.id}></div>
    }
}

export default GroupedBarChart;
