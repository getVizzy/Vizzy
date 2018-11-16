import React, {Component} from 'react'
import {connect} from 'react-redux'
import BarChart from './BarChart'
import LineChart from './LineChart'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {}
  render() {
    console.log('DATA', this.props.data)
    return (
      <div id="container-row">
        <div>
          <form>
            <input type="text" placeholder="Type Here" />
          </form>
        </div>

        <div>
          <BarChart data={this.props.data} />
        </div>
        <div>
          <LineChart data={this.props.data} />
        </div>

        <div>
          <select>
            <option value="Blue">Blue</option>
            <option value="Yellow">Yellow</option>
            <option value="Red">Red</option>
            <option value="Orange">Orange</option>
            <option value="Pink">Pink</option>
          </select>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.user.data
})

export default connect(mapStateToProps)(Dashboard)
