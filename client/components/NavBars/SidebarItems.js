import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home'
import CreateIcon from '@material-ui/icons/Create';
import HelpIcon from '@material-ui/icons/Help';


import { Link } from 'react-router-dom'



export const sideBarItems = (
  <div >
    <Link to="/home">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>

    <Link to="/dashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Dashboards" />
      </ListItem>
    </Link>

    <Link to="/room">
      <ListItem button>
        <ListItemIcon>
          <CreateIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Create Graphs" />
      </ListItem>
    </Link>

    {/* <Link to="/room"> */}
    <ListItem button>
      <ListItemIcon>
        <HelpIcon fontSize="large" />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItem>
    {/* </Link> */}
  </div>
);




