import React, {Component} from 'react'
import {gotGraphs} from '../store/graph'
import {connect} from 'react-redux'
import {download, addComma, reinstateNumbers} from '../utils'
import ChartContainer from './Chart/ChartContainer'

class TempDashboard extends Component {
  constructor() {
    super()
    this.changeStyle = this.changeStyle.bind(this)
  }

  componentDidMount() {
    this.props.getGraphs()
  }

  changeStyle(e, attribute) {
    //The dashboard breaks if it doesn't receive this method as props, even though the  method is only needed when rendering the chart in the Edit View. Feels very hacky. Definitely open to other solutions...
  }

  render() {
    if (!this.props.graphs) {
      return 'Getting your graphs!'
    } else {
      return this.props.graphs.map((graph, i) => {
        let data = reinstateNumbers(graph.datum.dataJSON.data)
        let propPackage = {
          data: data,
          addComma: addComma,
          downloadPNG: download,
          changeStyle: this.changeStyle,
          graphId: graph.id,
          ...graph.properties
        }

        return (
          <div id="dashboard-container">
            <ChartContainer {...propPackage} key={graph.id} />{' '}
          </div>
        )
      })
    }
  }
}

const mapDispatchToProps = dispatch => ({
  getGraphs: () => dispatch(gotGraphs()),
  deletingGraph: id => dispatch(deletingGraph(id))
})

const mapStateToProps = state => ({
  graphs: state.graph
})

export default connect(mapStateToProps, mapDispatchToProps)(TempDashboard)
