import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SadIcon from '@material-ui/icons/SentimentDissatisfied';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },

  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

class UserDataSets extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, userData } = this.props;

    return (
      <Card className={classes.card}>
        <CardActions className={classes.actions} disableActionSpacing>
          <Tooltip title='Toggle to view/close data list'>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {
              userData.length ?
                <List className={classes.list} subheader={<li />}>
                  <li>
                    <ul className={classes.ul}>
                      {userData.map(datum => (
                        <ListItem key={datum.id}>
                          <ListItemIcon>
                            <FileIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={datum.name} />
                        </ListItem>
                      ))}
                    </ul>
                  </li>
                </List>
                : <Typography>
                  <SadIcon color="primary" />
                  You currently have no datasets. To start graphing, please import a dataset
                  </Typography>
            }
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

UserDataSets.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserDataSets);
