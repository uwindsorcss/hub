import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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
  active: {},
  completed: {},
})

const Progress = ({ currentProgress, setActiveStep }) => {
  const [completed, setCompleted] = useState({})
  const problemNum = 10;
  const steps = Array(problemNum).fill();
  const styles = useStyles();
  const history = useHistory();
 
  return (
  <>
    <Navigation setActiveStep={setActiveStep} currentProgress={currentProgress} />
    <div className="progressRoot">
      <Stepper alternativeLabel activeStep={currentProgress} connector={<StyleConnector />}>
        {steps.map(( _, index) => (
          <Step key={index+1}>
            <StepButton onClick={()=>{
              history.push(`/hunt/play/${index+1}`)
            }}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    root: styles.root,
                    completed: styles.completed,
                    active: styles.active,
                  }
                }}
              />
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  </>
  );
}

Progress.propTypes = {
  currentProgress: PropTypes.number.isRequired,
};

export {Progress};
