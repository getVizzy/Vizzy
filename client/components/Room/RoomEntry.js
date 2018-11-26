// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Switch from '@material-ui/core/Switch';
// import Paper from '@material-ui/core/Paper';
// import Slide from '@material-ui/core/Slide';

// const styles = theme => ({
//   root: {
//     height: 180,
//   },
//   wrapper: {
//     width: 600 + theme.spacing.unit * 2,
//   },
//   paper: {
//     zIndex: 1,
//     position: 'relative',
//     margin: theme.spacing.unit,
//   },
//   svg: {
//     width: 500,
//     height: 500,
//   },
//   polygon: {
//     fill: theme.palette.common.white,
//     stroke: theme.palette.divider,
//     strokeWidth: 1,
//   },
// });

// class SimpleSlide extends React.Component {
//   state = {
//     checked: false,
//   };

//   handleChange = () => {
//     this.setState(state => ({ checked: !state.checked }));
//   };

//   render() {
//     const { classes } = this.props;
//     const { checked } = this.state;

//     return (
//       <div className={classes.root}>
//         <div className={classes.wrapper}>
//           <Switch checked={checked} onChange={this.handleChange} aria-label="Collapse" />
//           <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
//             <Paper elevation={4} className={classes.paper}>
//               <svg className={classes.svg}>
//                 <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
//               </svg>
//             </Paper>
//           </Slide>
//           <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
//             <Paper elevation={4} className={classes.paper}>
//               <svg className={classes.svg}>
//                 <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
//               </svg>
//             </Paper>
//           </Slide>
//         </div>
//       </div>
//     );
//   }
// }

// SimpleSlide.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleSlide);

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import InputUserRoom from './InputUserRoom'
import InputNonUserRoom from './InputNonUserRoom'


const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%',//'80.25%', // 16:9
    paddingLeft: '100%',


  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const roomOneImg = 'https://images.unsplash.com/photo-1503045666024-95470ad39b81?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6d6079c0f9752efd763f6790428c0a78&auto=format&fit=crop&w=634&q=80'

const roomTwoImg = 'https://images.unsplash.com/photo-1535931642064-4bd025b69b5d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6003067528c0906ec651ac8ca47273bf&auto=format&fit=crop&w=500&q=60'

class RoomEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomKey: ''
    }
  }
  render() {
    const { classes } = this.props;
    console.log('ROOM ENTRY', this.props)
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Room Entry
            </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                To start graphing, enter your room or join another team member's room
            </Typography>
            </div>
          </div>

          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={24} alignItems="center" justify="center">

              {/* DoorOne */}
              <Grid item sm={6} md={4} lg={3} position='center' >
                <Card className={classes.card} >
                  <CardMedia
                    className={classes.cardMedia}
                    image={roomOneImg} // eslint-disable-line max-len
                    title="door"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Open Your Room
                    </Typography>
                    <Typography>
                      Click enter room below to start your graphing session
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <InputUserRoom history={this.props.history} />
                  </CardActions>
                </Card>
              </Grid>


              {/* DoorTwo */}
              <Grid item sm={6} md={4} lg={3} >
                <Card className={classes.card} >
                  <CardMedia
                    className={classes.cardMedia}
                    image={roomTwoImg} // eslint-disable-line max-len
                    title="door"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Join Another Room
                    </Typography>
                    <Typography>
                      To join another graphing room, enter that room's ID
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <InputNonUserRoom history={this.props.history} />
                  </CardActions>
                </Card>
              </Grid>

            </Grid>
          </div>
        </main>

      </React.Fragment >
    );
  }
}

RoomEntry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomEntry);
