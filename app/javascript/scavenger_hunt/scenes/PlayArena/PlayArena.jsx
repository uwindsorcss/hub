import React from 'react'
import { Redirect } from 'react-router-dom';

import { useProgress } from '../../hooks/useProgress'
import { Progress } from '../../components/Progress'
import { Navigation } from './Navigation';
import { MainContent } from './MainContent';
import './PlayArena.scss'

const PlayArena = (props) => {

  const getClueId = () => {
    let clueId = 1
    let destructured_url = (window.location.pathname).split("/");
    let last_element = destructured_url[destructured_url.length - 1]
    if (parseInt(last_element)) {
      clueId = parseInt(last_element)
    }

    return clueId
  }

  if (!queryLoading && !userData.currentUser) {
    return (
    <Redirect to={{
     pathname: "/hunt/homepage",
     state: { loggedIn: false}
    }} />
   )
  }

  const [progress, setProgress, isProgressLoading] = useProgress(true);

  if (queryLoading || isProgressLoading) {
    return(
      <h3>Loading your data</h3>
    )
  }
  return (
    <div className="main">       
      <Progress progress={progress} />
      <MainContent progress={progress} clueId={getClueId()}/>
      <Navigation />
    </div>
  );
}

export { PlayArena };
