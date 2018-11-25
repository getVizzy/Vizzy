import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import UserDataSets from './UserDataSets'
import DataIcon from '@material-ui/icons/LibraryBooks'
import UploadIcon from '@material-ui/icons/CloudUpload'
import Tooltip from '@material-ui/core/Tooltip'
import HeaderGrid from './HeaderGrid'
import HomeContent from './HomeContent'

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

class HomeView extends React.Component {
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

    return (
      <div id='homeContainer'>
        {/* <HeaderGrid /> */}
        <HomeContent />
      </div>
    )
  }
}

HomeView.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(HomeView)
