import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData';
import { Link } from 'react-router-dom'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',


  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});


const logoOne = 'https://i.ibb.co/mS7jzXv/logo-1.png'
const fleurs = 'https://i.ibb.co/WsVp5xQ/springfleurs.jpg'
const marble = 'https://i.ibb.co/1ztG7mJ/marble.jpg'
const tiles = 'https://i.ibb.co/pLtgcSk/colorfultiles.jpg'
const turqoise = 'https://i.ibb.co/GvkWs1M/turqoise.jpg'


const tileData = [
  {
    img: fleurs,
    title: 'title2',
    author: 'author2',
  },
  {
    img: marble,
    title: 'title2',
    author: 'author2',
  },
  {
    img: tiles,
    title: 'title2',
    author: 'author2',
  },
  {
    img: turqoise,
    title: 'title2',
    author: 'author2',
  },

];


function SingleLineGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} >
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={2} rows={1}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              // title={tile.title}
              cols={1}
              classes={{
                root: classes.titleBar,
                // title: classes.title,
              }}

            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);
