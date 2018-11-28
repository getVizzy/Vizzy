import React, {Component} from 'react'
import {gotGraphs} from '../store/graph'
import {connect} from 'react-redux'
import {download, addComma, reinstateNumbers} from '../utils'
import ChartContainer from './Chart/ChartContainer'
import Snackbar from './Notifications/Snackbar'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 15
  }
})

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
    const {classes} = this.props
    return (
      <div className="main-dashboard-container">
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Dashboard
            </Typography>
          </div>
        </div>
        {this.props.graphs.length === 0 ? (
          <div className={classes.heroContent}>
            <Typography variant="h6" align="center" color="textSecondary">
              No graphs right now. Let's get Vizzy!
            </Typography>
          </div>
        ) : (
          this.props.graphs.map((graph, i) => {
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
          })
        )}

        <div>
          {this.state.notification ? (
            <Snackbar
              message="Graph deleted!"
              saveNotification={this.state.notification}
              source="delete"
            />
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getGraphs: () => dispatch(gotGraphs())
})

const mapStateToProps = state => ({
  graphs: state.graph
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(TempDashboard)
)

TempDashboard.propTypes = {
  classes: PropTypes.object.isRequired
}
