import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import './Progress.scss';


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

const Progress = ({ progress }) => {
  const problemNum = 10;
  const steps = Array(problemNum).fill();
  const styles = useStyles();

  return (
    <div className="progressRoot">
      <Stepper alternativeLabel activeStep={progress} connector={<StyleConnector />}>
        {steps.map((_, index) => (
          <Step key={index}>
            <StepButton>
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
  );
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
};

export {Progress};
