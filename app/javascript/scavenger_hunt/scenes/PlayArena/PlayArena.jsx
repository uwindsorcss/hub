import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { Progress } from '../../components/Progress'
import { MainContent } from './MainContent';
import { useUserData } from '../../hooks/useUserData';
import { Clues } from '../../data/staticData/clues';

import './PlayArena.scss'

const PlayArena = (props) => {
  // progress : 1
  const [{ userName, progress, data }, setUserData] = useUserData();
  const [start, setStart] = useState(new Date().getTime());
  const [end, setEnd] = useState(new Date().getTime());
  const [isDone, setIsDone] = useState(false);
  // first time => [] 
  // answered => update => save into database 
  
  const [activeStep, setActiveStep] = useState(progress - 1);
  // have to do this, use fill array causes shallow copy
  const [completed, setCompleted] = useState(data ? data : [
    {
      score: 0,
      isCompleted: false
    },
    {
      score: 0,
      isCompleted: false
    },
    {
      score: 0,
      isCompleted: false
    },
    {
      score: 0,
      isCompleted: false
    },
    {
      score: 0,
      isCompleted: false
    },
    {
      score: 0,
      isCompleted: false
    },
    {
      score: 0,
      isCompleted: false
    },
    {
      score: 0,
      isCompleted: false
    },
        {
      score: 0,
      isCompleted: false
    },
    {
      score: 0,
      isCompleted: false
    },
    {
      score: 0,
      isCompleted: false
    },
    {
      score: 0,
      isCompleted: false
    },
    {
      score: 0,
      isCompleted: false
    },

  ]);
  const [score, setScore] = useState(0);
  
  if (!userName || userName === "Default User") {
    return (
      <Redirect to={{
      pathname: "/hunt/homepage",
      state: { loggedIn: false}
    }} />
   )
  }



  return (
    <>
      <Container className="play-arena-container" fluid>
        <Row className="play-arena-row1">
          <Progress currentProgress={activeStep} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted} />
        </Row>
        <Row className="play-arena-row2">
          <MainContent setIsDone={setIsDone} isDone={isDone} progress={activeStep} completed={completed} setCompleted={setCompleted} score={score} setScore={setScore} start={start}/>
        </Row>
      </Container>
    </>
  );
}

export { PlayArena };
