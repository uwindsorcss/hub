import React from 'react'
import { useCurrentUserQuery } from '../../data/queries';

import { Progress } from '../../components/Progress'
import { Navigation } from './Navigation';
import { MainContent } from './MainContent';
import './PlayArena.scss'
import { Redirect } from 'react-router-dom';

const PlayArena = (props) => {
  const { data: userData, loading: queryLoading } = useCurrentUserQuery();
  
  const getClueId = () => {
    let clueId = 1
    let destructured_url = (window.location.pathname).split("/");
    let last_element = destructured_url[destructured_url.length - 1]
    if (parseInt(last_element)) {
      clueId = parseInt(last_element)
    }

    return clueId
  }

  if (queryLoading) {
    return(
      <h3>Loading your data</h3>
    )
  }

  if (!queryLoading && !userData.currentUser) {
    return (
    <Redirect to={{
     pathname: "/hunt/homepage",
     state: { loggedIn: false}
    }} />
   )
  }

  return (
    <div className="main">       
      <Progress currentUser={userData.currentUser} />
      <MainContent progress={parseInt(userData.currentUser.progress)} clueId={getClueId()}/>
      <Navigation />
    </div>
  );
}

export { PlayArena };
