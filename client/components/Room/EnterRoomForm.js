import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { gotSingleRoom } from '../../store/room'
import { fetchAllUsers } from '../../store/user'
import EnterIconOne from '@material-ui/icons/MeetingRoom'
import ArrowIcon from '@material-ui/icons/CallMerge'
import Alert from './Alert'





const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    alignItems: 'center',
    flexGrow: 1,
    textAlign: 'center',

  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    marginTop: 5
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class EnterRoomForm extends React.Component {
  constructor() {
    super()
    this.state =
      {
        roomKey: '',
        alert: false
      };

    this.userRoomSubmit = this.userRoomSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAlert = this.handleAlert.bind(this)
  }

  async componentDidMount() {
    await this.props.onFetchAllUsers()
  }

  userRoomSubmit(userKey) {
    event.preventDefault()
    let roomKey = userKey
    const users = this.props.user.allUsers
    const match = users.filter(currentUser => {
      return currentUser.roomKey === roomKey
    })
    if (match.length) {
      this.props.onGotSingleRoom(roomKey)
      this.props.history.push('room/live')
    } else {
      console.log('Room does not exist!')
      this.setState({ alert: !this.state.alert });
    }
  }

  handleChange = event => {
    this.setState({ roomKey: event.target.value });

  };

  handleSubmit() {
    event.preventDefault()
    let roomKey = this.state.roomKey
    const users = this.props.user.allUsers
    const match = users.filter(currentUser => {
      return currentUser.roomKey === roomKey
    })
    if (match.length) {
      this.props.onGotSingleRoom(this.state.roomKey)
      this.props.history.push('room/live')
    } else {
      console.log('Room does not exist!')
      this.setState({ alert: !this.state.alert });

    }
  }

  //Updates alert to false once user closes notification
  handleAlert() {
    this.setState({ alert: false });
  }

  render() {
    const { classes } = this.props;
    const userKey = this.props.user.user.roomKey
    const alert = this.state.alert

    return (
      <div className={classes.container} >
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel
            ref={ref => {
              this.labelRef = ReactDOM.findDOMNode(ref);
            }}
            htmlFor="component-outlined"
          >
            Your Room Id
          </InputLabel>
          <OutlinedInput
            id="component-outlined"
            disabled
            value={userKey}
            onChange={this.handleChange}
            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
          />
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={() => this.userRoomSubmit(userKey)} size="small" color="primary">
            Enter Your Room
            <EnterIconOne className={classes.rightIcon} />
          </Button>

        </FormControl>

        <ArrowIcon color='primary' />
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel
            ref={ref => {
              this.labelRef = ReactDOM.findDOMNode(ref);
            }}
            htmlFor="component-outlined"
          >
            Enter Room ID Here
          </InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={this.state.roomKey}
            onChange={this.handleChange}
            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
          />
          <Button
            className={classes.button}
            variant='outlined'
            color='secondary'
            onClick={this.handleSubmit} size="small" color="secondary">

            Join Another Room
             <EnterIconOne className={classes.rightIcon} />
          </Button>
        </FormControl>
        {
          alert ? <Alert alert={this.state.alert} handleAlert={this.handleAlert} /> : ''
        }

      </div>
    );
  }
}

EnterRoomForm.propTypes = {
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
  withStyles(styles)(EnterRoomForm)
)
