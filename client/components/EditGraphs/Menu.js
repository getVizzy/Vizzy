import React from 'react'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import GraphMenu from './GraphMenu'
import SimpleSelect from './SimpleSelect'
import Axes from './Axes'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import PieColorOptions from '../Chart/PieColorOptions'
import ColorSelect from './ColorSelect'
import Build from '@material-ui/icons/Build'
import ColorLens from '@material-ui/icons/colorLens'

const styles = theme => ({})

function TabContainer(props) {
  const {children, dir} = props

  return (
    <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

class Menu extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0
    }
  }

  filterColumn(data, dataType) {
    return Object.keys(data[0]).filter(key => typeof data[0][key] === dataType)
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  handleChangeIndex = index => {
    this.setState({value: index})
  }

  render() {
    const {classes, theme} = this.props

    return (
      <Paper id="editPaper">
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label={<Build />} />
            <Tab label={<ColorLens />} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <SimpleSelect
                    name="Dataset"
                    items={this.props.dataMatch}
                    {...this.props}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <GraphMenu {...this.props} />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Axes
                    {...this.props}
                    filterColumn={this.filterColumn}
                    column="y"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Axes
                    {...this.props}
                    filterColumn={this.filterColumn}
                    column="x"
                  />
                </FormControl>
            </Grid>
          </Grid>
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Grid container spacing={16} className={classes.root}>

          {this.props.graphSelected === 'pie' ?
            <Grid item xs={12}>
            <FormControl component="fieldset">
              <PieColorOptions {...this.props} />
              </FormControl>
            </Grid>
            :
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <ColorSelect
                  name="Color"
                  {...this.props}
                />
              </FormControl>
            </Grid>
          }

          {this.props.graphSelected === 'line' ? (
            ''
          ) : (
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <ColorSelect
                  name="Highlight"
                  {...this.props}
                />
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12}>
            <FormControl component="fieldset">
                <SimpleSelect
                  name="Pointer"
                  items={[5, 0, 25]}
                  {...this.props}
                />
            </FormControl>
          </Grid>
      {
        this.props.graphSelected === 'pie' ? (
          <div>
            <p>Transformation:</p>
            <select name="pieTransformation" onChange={e => this.props.changeStyle(e, 'pieTransformation')}>
              <option value='normal'>Normal</option>
              <option value='donut'>Donut</option>
              <option value='flower'>Flower</option>
              <option value='windmill'>Windmill</option>
            </select>
          </div>
        ) : ('')
      }
      <p>Graph Title:</p>
      <input value={this.props.title} onChange={e => this.props.titleChange(e)} />
      <button onClick={this.props.titleSubmit}>Add</button>
      {this.props.graphSelected === 'scatter' ? (
        <p>
          Regression Line:{' '}
          <input
            type="checkbox"
            onChange={e => {
              this.props.changeStyle(!this.props.regression, 'regression')
              // console.log('x and y on state', props.x, props.y)
              if (!this.props.regression) {
                this.props.buildRegressionModel(
                  this.props.graphData,
                  this.props.props.x,
                  this.props.props.y,
                  this.props.props.changeStyle
                )
              } else {
                this.props.changeStyle([], 'regressionLine')
              }
            }}
          />
        </p>
      ) : (
          ''
        )}
          </Grid>
        </TabContainer>
        </SwipeableViews>
      </Paper>
    )
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true})(Menu)
