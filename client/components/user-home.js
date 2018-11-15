import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { FileDrop } from './index'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div id="container-row">
      <div>
        <h3>Welcome, {email}</h3>
      </div>
      <div>
        <FileDrop />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
