import React, { Component } from 'react'
import { gotGraphs } from '../store/graph'
import { connect } from 'react-redux'
import Bar from './VictoryBarChart'
import { download, addComma, reinstateNumbers } from '../utils'
import ChartContainer from './ChartContainer'

class TempDashboard extends Component {
  constructor () {
    super()

  }

  componentDidMount() {
    this.props.getGraphs()
  }

  render() {
    if(!this.props.graphs) {
      return (
        "Getting your graphs!"
      )
    } else {
      return (
        this.props.graphs.map((graph, i) => {
          let data = reinstateNumbers(graph.datum.dataJSON.data);
          let propPackage = {
            data: data,
            addComma: addComma,
            downloadPNG: download,
            ...graph.properties,
          }

          return <ChartContainer {...propPackage} key={i}  />
        })
      )
    }
  }
}

const mapDispatchToProps = dispatch => ({
  getGraphs: () => dispatch(gotGraphs())
})

const mapStateToProps = state => ({
  graphs: state.graph
})

export default connect(mapStateToProps, mapDispatchToProps)(TempDashboard)

