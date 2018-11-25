import React, { Component } from 'react';
import { connect } from 'react-redux'


const UserDataSets = props => {
  return (
    <div>

    </div>
  )
}

const mapStateToProps = state => ({
  data: state.data,
  user: state.user.user,
  rooms: state.room.rooms,
  singleRoom: state.room.singleRoom,
  allUsers: state.user.allUsers
})




export default connect(mapStateToProps)(UserDataSets)



