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
  const { currentProgress, setActiveStep } = props;

  const forward = (currentProgress) => {
    if ( currentProgress < 12 ) setActiveStep(currentProgress + 1);
  }

  const backward = (currentProgress) => {
    if ( currentProgress > 0 ) setActiveStep(currentProgress - 1);
  }

  return (
    <Nav className="nav-main">
      <a className="nav-button" href="#">
        <ArrowBackIosIcon className={classes.largeIcon} onClick={() => backward(currentProgress)}/>
      </a>
      <a className="nav-button" href="#">
        <ArrowForwardIosIcon  className={classes.largeIcon} onClick={() => forward(currentProgress)}/>
      </a>
    </Nav>
  )
});

export { Navigation };
