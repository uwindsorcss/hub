import React from 'react'
import { Redirect } from 'react-router-dom';

import { Progress } from '../../components/Progress'
import { Navigation } from './Navigation';
import { MainContent } from './MainContent';
import { useUserData } from '../../hooks/useUserData';
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
    <div className="main">       
      <Progress currentProgress={progress} />
      <MainContent progress={progress} clueId={getClueId()}/>
      <Navigation />
    </div>
  );
}

export { PlayArena };
