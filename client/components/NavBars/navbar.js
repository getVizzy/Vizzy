import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../store'
import Sidebar from './Sidebar'

const Navbar = ({ handleSwitch, handleClick, isLoggedIn }) => (
  <div style={{ backgroundColor: 'white', marginTop: '20px' }}>
    {isLoggedIn ? (
      <div>
        {/* navbar will show these links after you log in */}
        <Sidebar handleSwitch={handleSwitch} />
      </div>
    ) : // <nav style={{backgroundColor: 'white'}}>
      //   <div>
      //     {/* The navbar will show these links before you log in */}
      //     <Link to="/login">Login</Link>
      //     <Link to="/signup">Sign Up</Link>
      //   </div>
      //   <hr />
      // </nav>
      null}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
* PROP TYPES
*/
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
