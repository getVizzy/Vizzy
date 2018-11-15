import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as d3 from 'd3'

class BarChart extends Component {
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
    data.forEach(function(d) {
      d.Revenue = +d.Revenue
    })

    const svgWidth = 500
    const svgHeight = 800
    const barPadding = 5
    const barWidth = svgWidth / data.length

    let svg = d3
      .select('.viz')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)

    const allrevenueArray = data.map(input => {
      return input.Revenue
    })

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(allrevenueArray)])
      .range([0, svgHeight])

    var barChart = svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', function(d) {
        return svgHeight - yScale(d.Revenue)
      })
      .attr('height', function(d) {
        return yScale(d.Revenue)
      })
      .attr('fill', '#E4B7E5')
      .attr('width', barWidth - barPadding)
      .attr('transform', function(d, i) {
        var translate = [barWidth * i, 0]
        return 'translate(' + translate + ')'
      })
  }

  render() {
    return <div className="viz" />
  }
}

const mapStateToProps = state => ({
  data: state.user.data
})

export default connect(mapStateToProps)(BarChart)
