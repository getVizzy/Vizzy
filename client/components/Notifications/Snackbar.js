import React from 'react';
import Button from '@material-ui/core/Button';
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
    this.props.leaveNotification()
  };

  render() {
    console.log('SNACKBAR PROPS', this.props)
    console.log('SNACKBAR STATE', this.state)
    const { vertical, horizontal, open } = this.state;
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
            this.props.message
          }</span>}
        />
      </div>
    );
  }
}

export default PositionedSnackbar;
