import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
  color: 'black',
  fontStyle: 'none'
}

const Progress = (props) => {
  let message;

  if(props.dataId === '') {
    message = "Choose a dataset."
  } else if(props.graphSelected === '') {
    message = "Now choose the type of graph... "
  } else if (props.x === '' || props.y === '') {
    message = "Select data for each axis... "
  }

  return (
    <div style={style}>
      <p>{message}</p>
      <CircularProgress />
    </div>
  )
}

export default Progress
