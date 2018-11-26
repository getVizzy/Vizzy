import React from 'react';
import ReactDOM from 'react-dom';
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
import { connect } from 'react-redux'



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class InputNonUserRoom extends React.Component {
  constructor() {
    super()
    this.state =
      {
        otherRoomKey: '',
      };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    this.forceUpdate();
    await this.props.onFetchAllUsers()
  }

  handleChange = event => {
    this.setState({ otherRoomKey: event.target.value });
    console.log('HERE', this.state.otherRoomKey)
  };

  handleSubmit() {
    event.preventDefault()
    let roomKey = this.state.otherRoomKey
    const users = this.props.user.allUsers
    const match = users.filter(currentUser => {
      return currentUser.roomKey === roomKey
    })
    if (match.length) {
      // socket.emit('joinRoom', this.state.roomKey, this.props.user.user.email)

      this.props.onGotSingleRoom(this.state.otherRoomKey)
      this.props.history.push('room/live')

    } else {
      console.log('No Room FOUND!')
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
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
            Enter This Room
         </Button>
        </FormControl>

      </div>
    );
  }
}

InputNonUserRoom.propTypes = {
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
  withStyles(styles)(InputNonUserRoom)
)


