import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import { Progress } from '../../components/Progress'
import { MainContent } from './MainContent';
import { useUserData } from '../../hooks/useUserData';
import { Clues } from '../../data/staticData/clues';

import './PlayArena.scss'

const PlayArena = (props) => {
  
  const [{ userName, progress }, setUserData] = useUserData();

  const [activeStep, setActiveStep] = useState(progress - 1);

  console.log('props', activeStep);
  console.log(userName);
  
  if (userName === "Default User") {
    return (
      <Redirect to={{
      pathname: "/hunt/homepage",
      state: { loggedIn: false}
    }} />
   )
  }

  const checkAnswer = ({userAnswer,  answerIndex=0, updateGQL=false}) => {
    const answer = '';
    if (userAnswer.toLowerCase() === answer.toLowerCase()){
        setUserData({progress:progress});
      }
  }

  return (
    <>
      <Container className="play-arena-container" fluid>
        <Row className="play-arena-row1">
          <Progress currentProgress={activeStep} />
        </Row>
        <Row className="play-arena-row2">
          <MainContent checkAnswer={checkAnswer} progress={activeStep}/>
        </Row>
      </Container>
    </>
  );
}

export { PlayArena };
