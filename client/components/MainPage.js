import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

class MainPage extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="main-page-container">
        <div className="layer">
          <div className="logo-container">
            <img id="logo" src={'https://image.ibb.co/djSCuq/vizzylogo.png'} />
          </div>
          <div className="description">
            Collaborate with your team in real-time to build custom graphs and
            charts
          </div>
          <div className="container">
            <Link to="/login">
              <button className="myButton">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps)(MainPage)
