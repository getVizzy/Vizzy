import React from 'react'
import PropTypes from 'prop-types'
import BarChart from '../VictoryBarChart'
import ScatterChart from '../VictoryScatterChart'
import {gotData} from '../../store/data'
import {postGraph} from '../../store/graph'
import classNames from 'classnames'
import GraphMenu from './GraphMenu'
import {connect} from 'react-redux'
import {
  reinstateNumbers,
  download,
  addComma,
  buildRegressionModel
} from '../../utils'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

class EditView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      graphSelected: 'scatter',
      color: 'tomato',
      title: '',
      highlight: 'orange',
      tooltip: '5',
      x: '',
      y: '',
      regression: false,
      regressionLine: [],
      regressionModel: {},
      dataId: 0,
      zoomDomain: {
        x: [new Date(2018, 1, 1), new Date(2018, 12, 1)]
      }
    }
    this.handleGraphSelected = this.handleGraphSelected.bind(this)
    this.changeStyle = this.changeStyle.bind(this)
    this.downloadPNG = download.bind(this)
  }

  componentDidMount() {
    this.props.gotData()
  }

  changeStyle(e, attribute) {
    if (attribute === 'dataId') {
      this.setState({
        [attribute]: +e.target.value
      })
    } else if (!e.target) {
      this.setState({
        [attribute]: e
      })
    } else {
      this.setState({
        [attribute]: e.target.value
      })
    }
  }

  handleGraphSelected(graph) {
    this.setState({graphSelected: graph})
  }

  render() {
    const {classes} = this.props
    const graphSelected = this.state.graphSelected
    let data

    if (!this.props.data) {
      return 'Loading...'
    } else {
      if (this.state.dataId === 0) {
        data = [
          {quarter: '1', earnings: 13000, items: 4000, state: 'NY'},
          {quarter: '2', earnings: 16000, items: 6000, state: 'NY'},
          {quarter: '3', earnings: 17000, items: 7000, state: 'NY'},
          {quarter: '4', earnings: 18000, items: 8000, state: 'NY'}
        ]
      } else {
        let dataElem = this.props.data.filter(
          elem => elem.id === this.state.dataId
        )
        console.log('DATA ELEM', dataElem, 'DATA PROPS', this.props.data)
        //The data elements used to end with ".data" --- find out what circusmtances this worked.
        console.log('DATA BEFORE REINSTATE', dataElem[0].dataJSON)
        data = reinstateNumbers(dataElem[0].dataJSON.data)
        console.log('data after reinstate', data.data)
      }
      return (
        <div>
          <Paper className={classes.root} elevation={22}>
            <Typography variant="h5" component="h3">
              Edit Graph
            </Typography>
            <Typography component="p">Some text</Typography>
            {this.state.x === '' || this.state.y === '' ? (
              <div>Select columns</div>
            ) : graphSelected === 'bar' ? (
              <BarChart
                color={this.state.color}
                title={this.state.title}
                highlight={this.state.highlight}
                tooltip={this.state.tooltip}
                x={this.state.x}
                y={this.state.y}
                changeStyle={this.changeStyle}
                data={data}
                downloadPNG={this.downloadPNG}
                addComma={addComma}
              />
            ) : graphSelected === 'scatter' ? (
              <ScatterChart
                color={this.state.color}
                title={this.state.title}
                highlight={this.state.highlight}
                tooltip={this.state.tooltip}
                x={this.state.x}
                y={this.state.y}
                changeStyle={this.changeStyle}
                data={data}
                downloadPNG={this.downloadPNG}
                regressionLine={this.state.regressionLine}
              />
            ) : null}
            <GraphMenu handleGraphSelected={this.handleGraphSelected} />
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={() => this.props.addGraph(this.state)}
            >
              <SaveIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Save
            </Button>
          </Paper>

          <div id="controls">
            <p>Choose a Dataset:</p>
            <select onChange={e => this.changeStyle(e, 'dataId')}>
              <option />
              {this.props.data.map((elem, i) => (
                <option key={i} value={elem.id}>
                  {elem.id}
                </option>
              ))}
            </select>
            <p>Left Axis:</p>
            <select onChange={e => this.changeStyle(e, 'y')}>
              <option />
              {Object.keys(data[0]).map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
            </select>

            <p>Bottom Axis:</p>
            <select onChange={e => this.changeStyle(e, 'x')}>
              <option />
              {Object.keys(data[0]).map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
            </select>

            <p>Color:</p>
            <select onChange={e => this.changeStyle(e, 'color')}>
              <option value="tomato">Tomato</option>
              <option value="gold">Gold</option>
              <option value="orange">Orange</option>
              <option value="#f77">Salmon</option>
              <option value="#55e">Purple</option>
              <option value="#8af">Periwinkle</option>
            </select>

            <p>Highlight:</p>
            <select onChange={e => this.changeStyle(e, 'highlight')}>
              <option value="orange">Orange</option>
              <option value="tomato">Tomato</option>
              <option value="gold">Gold</option>
              <option value="#f77">Salmon</option>
              <option value="#55e">Purple</option>
              <option value="#8af">Periwinkle</option>
            </select>

            <p>Pointer:</p>
            <select onChange={e => this.changeStyle(e, 'tooltip')}>
              <option value={5}>Round edge</option>
              <option value={0}>Square</option>
              <option value={25}>Circle</option>
            </select>

            <p>Graph Title:</p>
            <input
              value={this.state.title}
              onChange={e => this.changeStyle(e, 'title')}
            />
            {graphSelected === 'scatter' ? (
              <p>
                Regression Line:{' '}
                <input
                  type={'checkbox'}
                  onChange={async e => {
                    await this.changeStyle(!this.state.regression, 'regression')
                    console.log('x and y on state', this.state.x, this.state.y)
                    if (this.state.regression) {
                      buildRegressionModel(
                        data,
                        this.state.x,
                        this.state.y,
                        this.changeStyle
                      )
                    } else {
                      this.changeStyle([], 'regressionLine')
                    }
                    console.log('regression line', this.state.regressionLine)
                  }}
                />
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
      )
    }
  }
}

EditView.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => ({
  gotData: function() {
    dispatch(gotData())
  },
  addGraph: function(graphData) {
    dispatch(postGraph(graphData))
  }
})

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(EditView)
)
