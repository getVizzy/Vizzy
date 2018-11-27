import React, {Component} from 'react'
import {gotGraphs} from '../store/graph'
import {connect} from 'react-redux'
import {download, addComma, reinstateNumbers} from '../utils'
import ChartContainer from './Chart/ChartContainer'
import Snackbar from './Notifications/Snackbar'

class TempDashboard extends Component {
  constructor() {
    super()
    this.state = {
      notification: false
    }
    this.deleteNotification = this.deleteNotification.bind(this)
  }

  componentDidMount() {
    this.props.getGraphs()
  }

  deleteNotification() {
    this.setState({
      notification: true
    })
    setTimeout(() => {
      this.setState({
        notification: false
      })
    }, 3000)
  }

  render() {
    return (
      <div>
        {this.props.graphs.map((graph, i) => {
          let data = reinstateNumbers(graph.datum.dataJSON.data)
          let propPackage = {
            data: data,
            createdAt: graph.createdAt,
            addComma: addComma,
            downloadPNG: download,
            changeStyle: this.changeStyle,
            graphId: graph.id,
            ...graph.properties,
            delete: this.deleteNotification
          }

          return (
            <div id="dashboard-container" key={graph.id}>
              <ChartContainer {...propPackage} />{' '}
            </div>
          )
        })}
        {/* <div>
      {this.state.notification ?
        <Snackbar
          message="Graph deleted!"
          saveNotification={this.state.notification}
          source="delete"
          />
      : ''
      }
      </div> */}
      </div>
    )
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
