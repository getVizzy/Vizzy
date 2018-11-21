import React, { Component } from 'react';
import { connect } from 'react-redux'


const UserDataSets = props => {
  return (
    <div>
      <h5>Your Datasets</h5>
    </div>
  )
}

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  gotData: function () {
    dispatch(gotData())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDataSets)



