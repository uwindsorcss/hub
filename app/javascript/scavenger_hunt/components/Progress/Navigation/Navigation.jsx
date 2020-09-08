import React from 'react';
import './Navigation.scss';
import { Nav } from 'react-bootstrap';
import { withStyles } from "@material-ui/core/styles";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
    color: '#6aad5e',
  },
};

const Navigation = withStyles(styles)((props) => {
  const { classes } = props
  return (
    <Nav className="nav-main">
      <a className="nav-button" href="#">
        <ArrowBackIosIcon className={classes.largeIcon} />
      </a>
      <a className="nav-button" href="#">
        <ArrowForwardIosIcon  className={classes.largeIcon}/>
      </a>
    </Nav>
  )
});

export { Navigation };