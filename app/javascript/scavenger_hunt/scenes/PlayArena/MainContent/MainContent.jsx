import React from 'react';
import PropTypes from 'prop-types';
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
import { Grid } from '@material-ui/core';


const MainContent = ({ progress, clueId }) => {
  const getClue = () => {
    let index = clueId - 1
    if ((clueId - 1) > progress) {
      window.location.href = `/hunt/play/${progress + 1}`
      index = progress
    }

    return Clues[index]
  }

  return (
    <Grid container spacing={0} justify="center" alignItems="stretch">
      <Grid item xs={8}>
        <QuestionOne />
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
  progress: PropTypes.number,
  clueId: PropTypes.number,
};

export { MainContent };
