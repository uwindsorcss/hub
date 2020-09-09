import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Clues } from '../../../data/staticData/clues';
import { 
    QuestionOne,
    QuestionTwo,
    QuestionThree,
    QuestionFour,
    QuestionFive,
    QuestionSix,
    QuestionSeven,
    QuestionEleven,
    QuestionEight,
    QuestionNine,
    QuestionTen,
    QuestionTwelve,
    End
  } from '../../Questions';

const MainContent = ({ isDone, setIsDone, start, progress, setActiveStep, completed, setCompleted }) => {

  const select = (progress) => {
    switch (progress) {
      case 0 :
        return <QuestionOne progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 1 :
        return <QuestionTwo progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 2 :
        return <QuestionThree progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 3 :
        return <QuestionFour progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 4 :
        return <QuestionFive progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 5 :
        return <QuestionSix progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 6 :
        return <QuestionSeven progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 7 :
        return <QuestionEight progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 8 :
        return <QuestionNine progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 9 :
        return <QuestionTen progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 10 :
        return <QuestionEleven progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 11 :
        return <QuestionTwelve progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      case 12 :
        return <End isDone={isDone} setIsDone={setIsDone} start={start} progress={progress} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        break;
      default:
        return <></>;
        break;
  
  }
}
  return (
    <Grid container spacing={0} justify="center" alignItems="stretch">
      <Grid item xs={8}>
        {
          select(progress)
        }
      </Grid>
    </Grid>
  )
};

MainContent.propTypes = {
  progress: PropTypes.number.isRequired,
};

export { MainContent };
