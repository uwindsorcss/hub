import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import './Progress.scss';

import { Navigation } from './Navigation';

const StyleConnector = withStyles({
  alternativeLabel: {
    top: 15,
  },
  active: {
    '& $line': {
      backgroundColor: '#6aad5e',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#6aad5e',
    },
  },
  line: {
    height: 4,
    backgroundColor: '#b6b6ba',
  }
})(StepConnector);

const useStyles = makeStyles({
  root: {
    width: 35,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&$completed': {
      color: '#6aad5e',
    },
    '&$active': {
      color: '#6aad5e',
    },
  },
  active: {

  },
  completed: {

  },
  word_incomplete: {
    marginTop: 20,
    borderRadius: 50,
    width: 35,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    background: '#A8A8A8',
    alignItems: 'center'
  },
  word_complete: {
    borderRadius: 50,
    marginTop: 20,
    width: 35,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#6aad5e'
  },
  number: {
    color: 'white',
    fontSize: 20
  }
});



const Progress = ({ currentProgress, setActiveStep, completed, setCompleted }) => {

  const styles = useStyles();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {

    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      // show the number only
      if (width <= 700 ) setToggle(true);
      else setToggle(false);  
    })
   

  }, [])
 
  return (
  <Grid container justify="center">
    <Navigation setActiveStep={setActiveStep} currentProgress={currentProgress} />
    { toggle ? 
      
      <Grid container justify="center" className={completed[currentProgress].isCompleted ? styles.word_complete : styles.word_incomplete}>
        <Typography className={styles.number}> {currentProgress + 1} </Typography>
      </Grid>   
      
      :
      <div className="progressRoot">   
        <Stepper alternativeLabel activeStep={currentProgress} connector={<StyleConnector />}>
          {completed.map(( _, index) => (
            <Step key={index}>
              <StepLabel
                completed={completed[index].isCompleted}
                StepIconProps={{
                  classes: {
                    root: styles.root,
                    completed: styles.completed,
                    active: styles.active,
                  }
                }}
              />
            </Step>
          ))}
        </Stepper>
      </div>
      }
    </Grid>
  );
}

Progress.propTypes = {
  currentProgress: PropTypes.number.isRequired,
};

export {Progress};
