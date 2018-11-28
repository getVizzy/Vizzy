import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { logout } from '../../store'
import { sideBarItems } from './SidebarItems';

//Material UI Styling
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import Tooltip from '@material-ui/core/Tooltip';

let colors = [
  '#8bc34a',
  '#cddc39',
  '#009688',
  '#BDE4A7',
  '#D4AFCD',
  '#5C80BC',
  '#A7ACD9',
  '#82AEB1',
  '#E7E08B',
  '#7E78D2'
]

let randomColor = colors[Math.floor(Math.random() * colors.length)]

// const logoOne = 'https://i.ibb.co/mS7jzXv/logo-1.png'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    // position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  avatar: {
    margin: 5,
    color: '#fff',
    backgroundColor: randomColor
  },
  user: {
    marginRight: 20,
    color: '#fff'
  }
});




class PermanentDrawerLeft extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>

        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >

          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Vizzy
            </Typography>

            <Avatar className={classes.avatar}>{user.user.email.slice(0, 1).toUpperCase()}</Avatar>

            <Typography
              onClick={this.props.handleClick}
              component="h1"
              variant="body1"
              color="inherit"
              noWrap
              className={classes.user}
            >
              {user.user.email[0].toUpperCase() + user.user.email.substring(1, user.user.email.indexOf("@"))}
            </Typography>

            <Tooltip title='Switch between light/dark mode'>
              <IconButton color="inherit">
                <InvertColorsIcon onClick={this.props.handleSwitch} fontSize='small' />
              </IconButton>
            </Tooltip>

            <Tooltip title={`See you again soon!`}>
              <IconButton color="inherit">
                <Typography
                  onClick={this.props.handleClick}
                  component="h1"
                  variant="body1"
                  color="inherit"
                  noWrap
                >
                  Logout
              </Typography>
                <LogoutIcon onClick={this.props.handleClick} fontSize='small' />

              </IconButton>
            </Tooltip>

          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{sideBarItems}</List>
          <Divider />
        </Drawer>
      </div>
    );
  }
}


PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

const ConnectSideBar = connect(mapState, mapDispatch)(PermanentDrawerLeft)
export default withStyles(styles)(ConnectSideBar)

//export and incorporate the style
// export default withStyles(styles)(PermanentDrawerLeft);
