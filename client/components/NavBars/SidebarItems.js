import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home'
import CreateIcon from '@material-ui/icons/Create';
import HelpIcon from '@material-ui/icons/Help';
import HappyIcon from '@material-ui/icons/TagFaces'
import Tooltip from '@material-ui/core/Tooltip';

import { Link } from 'react-router-dom'


export const sideBarItems = (
  <div >
    <Link to="/home">
      <Tooltip title='Go Home' placement="right">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Tooltip>
    </Link>

    <Link to="/dashboard">
      <Tooltip title='Go to Dashboard' placement="right">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Tooltip>
    </Link>

    <Link to="/room">
      <Tooltip title='Start Graphing' placement="right">
        <ListItem button>
          <ListItemIcon>
            <CreateIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Create Graphs" />
        </ListItem>
      </Tooltip>
    </Link>

    <Link to="/fun">
      <Tooltip title='Graph of the Day' placement="right">

        <ListItem button>
          <ListItemIcon>
            <HappyIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="For Fun" />
        </ListItem>
      </Tooltip>
    </Link>

    {/* <Link to="/room"> */}
    {/* <ListItem button>
      <ListItemIcon>
        <HelpIcon fontSize="large" />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItem>
    </Link> */}
  </div>
);




