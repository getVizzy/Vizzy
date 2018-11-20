import React, { Component } from 'react'
import { gotGraphs } from '../store/graph'
import { connect } from 'react-redux'
import Bar from './VictoryBarChart'
import { download, addComma, reinstateNumbers } from '../utils'

class TempDashboard extends Component {
  constructor () {
    super()

  }

  componentDidMount() {
    console.log("HITTING HERE")
    this.props.getGraphs()
  }

  render() {
    console.log("GRAPHS IN RENDER", this.props.graphs)
    if(!this.props.graphs) {
      return (
        "Getting your graphs!"
      )
    } else {
      return (
        this.props.graphs.map((graph, i) => {
          let savedProps = graph.properties;
          let data = reinstateNumbers(graph.datum.dataJSON);
          console.log("DATA IN DASHBOARD", data, "Y", savedProps.y, "X", savedProps.x)
          return  <Bar color={savedProps.color}
                      title={savedProps.title}
                      highlight={savedProps.highlight}
                      tooltip={savedProps.tooltip}
                      x={savedProps.x}
                      y={savedProps.y}
                      download={download}
                      addComma={addComma}
                      data={data}
                      key={i}
                  />
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

