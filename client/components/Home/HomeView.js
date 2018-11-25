import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import HomeContent from './HomeContent'
import { gotData } from '../../store/data'


const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

class HomeView extends React.Component {
  componentDidMount() {
    this.props.gotData()
  }

  render() {
    const { classes } = this.props
    return (
      <div id='homeContainer'>
        {/* <HeaderGrid /> */}
        <HomeContent userData={this.props.data} />
      </div>
    )
  }
}

HomeView.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data,
  user: state.user.user,
  rooms: state.room.rooms,
  singleRoom: state.room.singleRoom,
  allUsers: state.user.allUsers
})

const mapDispatchToProps = dispatch => ({
  gotData: () => dispatch(gotData())
})


export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(HomeView)
)
