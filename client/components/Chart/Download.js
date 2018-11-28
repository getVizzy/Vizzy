import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import DownloadIcon from '@material-ui/icons/CloudDownload'

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
    },
    vertical: 'bottom',
    horizontal: 'center'
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  downloads: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

class Download extends Component {
  render() {
    const {classes} = this.props
    const downloadPNG = this.props.downloadPNG

    return (
      <div id="container">
        <main className={classes.main}>
          <CssBaseline />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => downloadPNG(this.props.title, this.props.graphId)}
          >
            Download <DownloadIcon className={classes.downloads} />
          </Button>
        </main>

        <canvas
          id={this.props.graphId}
          width="600"
          height="400"
          display="none"
          style={{visibility: 'hidden', zIndex: -950, position: 'absolute'}}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Download)

/**
 * PROP TYPES
 */
Download.propTypes = {
  classes: PropTypes.object.isRequired
}
