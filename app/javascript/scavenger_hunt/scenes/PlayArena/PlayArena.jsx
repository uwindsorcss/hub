import React, { useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import { Progress } from '../../components/Progress'
import { Navigation } from './Navigation';
import { MainContent } from './MainContent';
import { useUserData } from '../../hooks/useUserData';
import { Clues } from '../../data/staticData/clues';

import { UserDataContext, UserData } from '../../context';
import { useUpdateUserMutation } from '../../data/mutations';

import './PlayArena.scss'

const PlayArena = (props) => {
  const [{ userName, progress }, setUserData ] = useUserData();
  console.log(progress);
  console.log(userName);
  
  const getClueId = () => {
    let clueId = 1
    let destructured_url = (window.location.pathname).split("/");
    let last_element = destructured_url[destructured_url.length - 1]
    if (parseInt(last_element)) {
      clueId = parseInt(last_element)
    }

    return clueId
  }

  if (userName === "Default User") {
    return (
    <Redirect to={{
     pathname: "/hunt/homepage",
     state: { loggedIn: false}
    }} />
   )
  }

  const checkAnswer = ({userAnswer, clueID, answerIndex=0, updateGQL=false}) => {
    const clueAnswer = Clues[clueID-1].answers[answerIndex];
    console.log("thing " + progress);

    if (userAnswer.toLowerCase() === clueAnswer.toLowerCase()){
      if((clueID === (progress+1)) && updateGQL){
        console.log("updated")
        setUserData({progress:progress});
      }
      return true;
    }
    
    return false;
  }

  return (
    <>
      <Navigation />
      <Container className="play-arena-container" fluid>
        <Row className="play-arena-row1">
          <Progress currentProgress={progress} />
        </Row>
        <Row className="play-arena-row2">
          <MainContent checkAnswer={checkAnswer} progress={progress} clueId={getClueId()}/>
        </Row>
      </Container>
    </>
  );
}

export { PlayArena };
