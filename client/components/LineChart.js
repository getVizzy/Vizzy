import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as d3 from 'd3'

class LineChart extends Component {
  constructor(props) {
    super()
    this.state = {
      data: props.data
    }
  }
  componentDidMount() {
    this.setState([])
  }

  componentDidUpdate() {
    let data = JSON.parse(this.props.data)

    let margin = {top: 40, right: 40, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    let y = d3.scaleLinear().range([height, 0]);

    let x = d3.scaleTime()
    .domain([new Date(2012, 0, 1), new Date(2012, 11, 31)])
    .range([0, width]);

    let svg = d3.select(".viz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
      console.log("MONTH", d.Month)
      d.Month = new Date(d.Month + ' 01, 2018');
      d.Apples = +d.Apples;
    });
    console.log("DATA HERE", data)

    let valueline = d3.line()
    .x(function(d) { return x(d.Month); })
    .y(function(d) { return y(+d.Apples); });

    x.domain(d3.extent(data, function(d) { return d.Month; }));
    y.domain([0, d3.max(data, function(d) { return +d.Apples; })]);

    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    svg.append("g")
    .attr("class", "axis axis--y")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
    .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .append('text')
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Apples");

    let focus = d3.select('g')
      .append('g')
      .attr("class", "focus")
      .style("display", "none");
    let bisectDate = d3.bisector(function(d) { return d.Month; }).left;

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", width)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 7.5);

    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");

          svg.append("rect")
        .attr("transform", "translate(" + 10 + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.Month > d1.Month - x0 ? d1 : d0;
      focus.attr("transform", "translate(" + x(d.Month) + "," + y(d.Apples) + ")");
      focus.select("text").text(function() { return +d.Apples });
      focus.select(".x-hover-line").attr("y2", height - y(d.Apples));
      focus.select(".y-hover-line").attr("x2", width);
    }
  }

  render() {
    return <div className="viz" />
  }
}

const mapStateToProps = state => ({
  data: state.user.data
})

export default connect(mapStateToProps)(LineChart)
