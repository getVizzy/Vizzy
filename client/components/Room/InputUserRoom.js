// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
// import { connect } from 'react-redux'
// import socket from '../../socket'
// import { gotSingleRoom } from '../../store/room'
// import { fetchAllUsers } from '../../store/user'
// import Snackbar from '../Notifications/Snackbar'
// import Dashboard from '../Dashboard'
// import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
// import CardActions from '@material-ui/core/CardActions';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';





// const styles = theme => ({
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   }
// });

// class TextFields extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       roomKey: ''
//     }

//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleChange = name => event => {
//     this.setState({
//       [name]: event.target.value,
//     });

//     console.log('HERE', this.state.name)
//   };

//   handleSubmit() {
//     event.preventDefault()
//     let roomKey = this.state.roomKey
//     const users = this.props.user.allUsers
//     const match = users.filter(currentUser => {
//       return currentUser.roomKey === roomKey
//     })
//     if (match.length) {
//       this.props.onGotSingleRoom(this.state.roomKey)
//       this.props.history.push('room/live')
//     } else {
//       console.log('Room does not exist!')
//     }
//   }

//   render() {
//     const { classes } = this.props;

//     return (
//       // <form className={classes.container} noValidate autoComplete="off">
//       <CardActions>
//         {/* <TextField
//           id="standard-multiline-flexible"
//           label="Room Key"
//           value={this.state.roomKey}
//           onChange={this.handleChange('roomKey')}
//           className={classes.textField}
//           margin="normal"
//         /> */}

//         <FormControl className={classes.formControl}>
//           <InputLabel htmlFor="component-simple">Name</InputLabel>
//           <Input id="component-simple" value={this.state.roomKey} onChange={this.handleChange} />
//         </FormControl>

//         {/* <TextField
//           id="outlined-password-input"
//           label="Name"
//           className={classes.textField}
//           value={this.state.name}
//           onChange={this.handleChange('name')}
//           margin="normal"
//         /> */}
//         <Button size="small" color="primary">
//           Enter Room
//         </Button>
//       </CardActions>
//     );
//   }
// }

// TextFields.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(TextFields);

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { gotSingleRoom } from '../../store/room'
import { fetchAllUsers } from '../../store/user'
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from 'material-ui/styles/typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class InputUserRoom extends React.Component {
  constructor() {
    super()
    this.state =
      {
        userRoomKey: '',
      };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    this.forceUpdate();
    await this.props.onFetchAllUsers()
  }

  handleChange = event => {
    this.setState({ userRoomKey: event.target.value });
    console.log('HERE', this.state.userRoomKey)
  };

  handleSubmit() {
    event.preventDefault()
    let roomKey = this.state.userRoomKey
    const users = this.props.user.allUsers
    const match = users.filter(currentUser => {
      return currentUser.roomKey === roomKey
    })
    if (match.length) {
      // socket.emit('joinRoom', this.state.roomKey, this.props.user.user.email)

      this.props.onGotSingleRoom(this.state.userRoomKey)
      this.props.history.push('room/live')

    } else {
      console.log('No Room FOUND!')
    }
  }

  render() {
    const { classes } = this.props;
    const roomKey = this.props.user.user.roomKey
    console.log("HEREREERE", this.props)

    return (
      <div className={classes.container}>
        <div>Your room id: {roomKey}</div>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel
            ref={ref => {
              this.labelRef = ReactDOM.findDOMNode(ref);
            }}
            htmlFor="component-outlined"
          >
            Room Key
          </InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={this.state.userRoomKey}
            onChange={this.handleChange}
            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
          />
          <Button onClick={this.handleSubmit} size="small" color="primary">
            Enter Your Room
         </Button>
        </FormControl>

      </div>
    );
  }
}

InputUserRoom.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.user.data,
  user: state.user,
  allUsers: state.user.allUsers,
  rooms: state.room.rooms,
  singleRoom: state.room.singleRoom
})

const mapDispatchToProps = dispatch => ({
  onFetchAllUsers: () => dispatch(fetchAllUsers()),
  onGotSingleRoom: roomKey => dispatch(gotSingleRoom(roomKey))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(InputUserRoom)
)
