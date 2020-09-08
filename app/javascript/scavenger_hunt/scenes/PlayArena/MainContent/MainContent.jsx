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
    QuestionNine,
    QuestionTen
  } from '../../Questions';

const MainContent = ({ progress, checkAnswer }) => {

  return (
    <Grid container spacing={0} justify="center" alignItems="stretch">
      <Grid item xs={8}>
        <QuestionOne checkAnswer={checkAnswer} />
        <QuestionTwo />
        <QuestionThree />
        <QuestionFour />
        <QuestionFive />
        <QuestionSix />
        <QuestionSeven />
        <QuestionNine />
        <QuestionTen />
        <QuestionEleven />
      </Grid>
    </Grid>
  )
};

MainContent.propTypes = {
  progress: PropTypes.number.isRequired,
  checkAnswer: PropTypes.func.isRequired,
};

export { MainContent };
