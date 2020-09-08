import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import { Progress } from '../../components/Progress'
import { Navigation } from './Navigation';
import { MainContent } from './MainContent';
// import { useUserData } from '../../hooks/useUserData';
import { Clues } from '../../data/staticData/clues';

// import { UserDataContext, UserData } from '../../context';
import { useUpdateUserMutation } from '../../data/mutations';

import './PlayArena.scss'

const PlayArena = (props) => {
  // const [{ userName, progress }, setUserData ] = useUserData();
  // console.log(progress);
  // console.log(userName);
  
  const [progress, setProgress] = useState('0');
  // user name should be the logged in user
  const [username, setUsername] = useState('Prakort Lean');
  const [userRole, setUserRole] = useState('Guest');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const checkAnswer = ({userAnswer, clueID, answerIndex=0, updateGQL=false}) => {
    const clueAnswer = Clues[clueID-1].answers[answerIndex];
    console.log("thing " + progress);

    if (userAnswer.toLowerCase() === clueAnswer.toLowerCase()){
      if((clueID === (progress+1)) && updateGQL){
        console.log("updated")
        useUpdateUserMutation({progress:progress});
      }
      return true;
    }
    
    return false;
  }

  const DefaultUserData = {
    progress,
    username,
    userRole,
    start,
    end,
    setProgress,
    setUsername,
    setUserRole,
    setStart,
    setEnd,
    useUpdateUserMutation,
    checkAnswer
  };


  const getClueId = () => {
    let clueId = 1
    let destructured_url = (window.location.pathname).split("/");
    let last_element = destructured_url[destructured_url.length - 1]
    if (parseInt(last_element)) {
      clueId = parseInt(last_element)
    }

    return clueId
  }

  if (username === "Default User") {
    return (
    <Redirect to={{
     pathname: "/hunt/homepage",
     state: { loggedIn: false}
    }} />
   )
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
