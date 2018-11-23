import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class PositionedSnackbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.notification,
      vertical: 'bottom',
      horizontal: 'right',
    }
    this.handleClose = this.handleClose.bind(this)
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.userThatJoined ? this.props.joinNotification()
      : this.props.leaveNotification()
  };

  render() {
    console.log('SNACKBAR PROPS', this.props)
    console.log('SNACKBAR STATE', this.state)
    const { vertical, horizontal, open } = this.state;
    const { userThatJoined, userThatLeft } = this.props
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
          message={<span id="message-id">{
            userThatJoined ? `${userThatJoined} has joined this room` : `${userThatLeft} has left this room`
          }</span>}
        />
      </div>
    );
  }
}

export default PositionedSnackbar;
