import React from 'react'
import { Progress } from '../../components/Progress'
import { Navigation } from './Navigation';
import { MainContent } from './MainContent';
import './PlayArena.scss'

const PlayArena = () => {
  return (
    <div className="main">        
      <Progress />
      <MainContent />
      <Navigation />
    </div>
  );
}

export { PlayArena };
