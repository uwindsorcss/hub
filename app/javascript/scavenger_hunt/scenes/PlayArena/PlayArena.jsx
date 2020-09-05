import React from 'react'
import { Redirect } from 'react-router-dom';

import { Progress } from '../../components/Progress'
import { Navigation } from './Navigation';
import { MainContent } from './MainContent';
import { useUserData } from '../../hooks/useUserData';
import { Container, Row } from 'react-bootstrap';
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

  return (
    <>
      <Navigation />
      <Container className="play-arena-container" fluid>
        <Row className="play-arena-row1">
          <Progress currentProgress={progress} />
        </Row>
        <Row className="play-arena-row2">
          <MainContent progress={progress} clueId={getClueId()}/>
        </Row>
      </Container>
    </>
  );
}

export { PlayArena };
