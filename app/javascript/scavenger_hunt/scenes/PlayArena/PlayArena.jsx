import React from 'react'
import { useCurrentUserQuery } from '../../data/queries';

import { Progress } from '../../components/Progress'
import { Navigation } from './Navigation';
import { MainContent } from './MainContent';
import './PlayArena.scss'

const PlayArena = (props) => {
  const { loading: queryLoading } = useCurrentUserQuery();

  if (queryLoading) {
    return(
      <h3>Yet Loading...</h3>
    )
  }

  return (
    <div className="main">        
      <Progress />
      <MainContent />
      <Navigation />
    </div>
  );
}

export { PlayArena };
