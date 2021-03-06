import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class PositionedSnackbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    }
    this.handleClose = this.handleClose.bind(this)
  };

  componentDidMount() {
    let notification = this.props.notification || this.props.styleNotification || this.props.saveNotification
    this.setState({
      open: notification
    })
  }

  reset() {
    if(!this.props.source) {
      this.props.resetSnackbar()
    }
  }

  handleClose = () => {
    this.setState({ open: false });
    !this.props.styleNotification && !this.props.saveNotification ?
    (this.props.userThatJoined ? this.props.joinNotification()
      : this.props.leaveNotification())
    : this.reset();
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    const { userThatJoined, userThatLeft } = this.props;
    let message;
    this.props.styleNotification || this.props.saveNotification ?
    message = this.props.message
    : message = <span id="message-id">{
      userThatJoined ? `${userThatJoined} has joined this room` : `${userThatLeft} has left this room`
    }</span>
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={message}
        />
      </div>
    );
  }
}

export default PositionedSnackbar;
