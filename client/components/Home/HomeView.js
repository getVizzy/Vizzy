import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FileDrop from '../FileDrop'
import UserDataSets from './UserDataSets'
import DataIcon from '@material-ui/icons/LibraryBooks'
import UploadIcon from '@material-ui/icons/CloudUpload'
import Tooltip from '@material-ui/core/Tooltip'
import HeaderGrid from './HeaderGrid'
import HeaderContent from './HeaderContent'

import { typography } from 'material-ui/styles'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  demo: {
    height: 240
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary
  },
  icon: {
    color: '#71A9F7',
    fontSize: 75
  }
})

class InteractiveGrid extends React.Component {
  state = {
    direction: 'column',
    justify: 'flex-start',
    alignItems: 'center'
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    })
  }

  render() {
    const { classes } = this.props
    const { alignItems, direction, justify } = this.state

    return (
      <div id='homeContainer'>
        <HeaderGrid />
        <Grid container className={classes.root}>
          <Grid item xs={10}>
            <Grid
              container
              spacing={16}
              className={classes.demo}
              alignItems={alignItems}
              direction={direction}
              justify={justify}
            >
              <Grid item>
                <Paper
                  className={classes.paper}
                  style={{
                    paddingTop: 120,
                    paddingBottom: 120,
                    paddingLeft: 150,
                    paddingRight: 150
                  }}
                >
                  <UploadIcon className={classes.icon} />
                  <Tooltip title="Add" placement="top">
                    <FileDrop />
                  </Tooltip>
                </Paper>
              </Grid>
              <Grid item>
                <Paper
                  className={classes.paper}
                  style={{
                    paddingTop: 120,
                    paddingBottom: 120,
                    paddingLeft: 150,
                    paddingRight: 150
                  }}
                >
                  <DataIcon className={classes.icon} />
                  <UserDataSets />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(InteractiveGrid)
