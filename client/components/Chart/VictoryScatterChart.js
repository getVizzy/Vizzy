import React, {Component} from 'react'
import {download} from '../../utils'

import * as d3 from 'd3'
import {
  VictoryChart,
  VictoryScatter,
  VictoryLine,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryVoronoiContainer
} from 'victory'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },

  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

class VictoryScatterChart extends Component {
  render() {
    let data = this.props.data
    const changeStyle = this.props.changeStyle
    let y = this.props.y
    let x = this.props.x
    let downloadPNG = download.bind(this)
    const {classes} = this.props

    return (
      <div id="container">
        <div id="chart">
          <VictoryChart
            theme={VictoryTheme.material}
            style={{parent: {maxWidth: '100%'}}}
            width={600}
            height={470}
            padding={{left: 100, right: 25, top: 35, bottom: 75}}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labels={d => `${y}:${d[y]}`}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={+this.props.tooltip}
                    flyoutStyle={{fill: 'white', stroke: 'lightgrey'}}
                  />
                }
              />
            }
          >
            <VictoryLabel
              text={this.props.title}
              style={{
                fontSize: 16,
                textAnchor: 'start',
                verticalAnchor: 'end',
                fill: '#000000',
                fontFamily: 'inherit',
                fontWeight: 'bold'
              }}
              x={100}
              y={24}
            />
            <VictoryScatter
              style={{data: {fill: this.props.color}}}
              size={7}
              data={data}
              x={x}
              y={y}
              animate={{
                duration: 2000,
                onLoad: {duration: 1000}
              }}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'labels',
                          mutation: () => ({active: true})
                        }
                      ]
                    },

                    onMouseOut: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => {}
                        },
                        {
                          target: 'labels',
                          mutation: () => ({active: false})
                        }
                      ]
                    }
                  }
                }
              ]}
            />
            <VictoryLine data={this.props.regressionLine} x={x} y={y} />
            <VictoryLabel
              text={this.props.title}
              style={{
                fontSize: 16,
                textAnchor: 'start',
                verticalAnchor: 'end',
                fill: '#000000',
                fontFamily: 'inherit',
                fontWeight: 'bold'
              }}
              x={100}
              y={24}
            />

            <VictoryAxis
              label={x}
              style={{
                axis: {stroke: '#756f6a'},
                axisLabel: {fontSize: 12, padding: 30}
              }}
            />
            <VictoryAxis
              dependentAxis
              label={y}
              style={{
                axis: {stroke: '#756f6a'},
                axisLabel: {fontSize: 12, padding: 60}
              }}
            />
          </VictoryChart>
          <div id="controls">
            {/* <p>Left Axis:</p>
            <select
              onChange={e => {
                //save old y value

                let newX = this.state.y
                if (this.state.y === null) {
                  newX = keys[1]
                }

                changeStyle(e, 'y')
                changeStyle(newX, 'x')
              }}
            >
              <option
                key={1}
                name="y"
                value={keys[1]}
                defaultValue
              >{`${keys[1][0].toUpperCase()}${keys[1].slice(1)}`}</option>
              <option
                key={0}
                name="y"
                value={keys[0]}
              >{`${keys[0][0].toUpperCase()}${keys[0].slice(1)}`}</option>
            </select> */}

            <main className={classes.main}>
              <CssBaseline />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() =>
                  downloadPNG(this.props.title, this.props.graphId)
                }
              >
                Download
              </Button>
            </main>
          </div>
        </div>

        <canvas
          id={this.props.graphId}
          width="600"
          height="470"
          display="none"
          style={{visibility: 'hidden', zIndex: -950, position: 'absolute'}}
        />
      </div>
    )
  }
}

export default withStyles(styles)(VictoryScatterChart)

/**
 * PROP TYPES
 */
VictoryScatterChart.propTypes = {
  classes: PropTypes.object.isRequired
}
