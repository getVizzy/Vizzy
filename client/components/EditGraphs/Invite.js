import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import People from '@material-ui/icons/People'
import withStyles from '@material-ui/core/styles/withStyles'
import InviteForm from '../InviteForm'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  header: {
    marginRight: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
})

/**
 * COMPONENT
 */

class Invite extends React.Component {

  render() {
    const {classes} = this.props
    return (
      <Fragment>
        <Button className={classes.header} onClick={this.toggleInvite}>
          <People className={classes.people} color="000000" />
          Invite Others
        </Button>

      </Fragment>
    )
  }
}

export default withStyles(styles)(Invite)

/**
 * PROP TYPES
 */
Invite.propTypes = {
  classes: PropTypes.object.isRequired
}
