import React from 'react'
import { Progress } from '../../components/Progress'
import './HomePage.scss'

const HomePage = () => {
  return (
    <div className="main">        
      <div className={`probProgress section`}>
        <h1 className="title">Progress</h1>
        <Progress />
      </div>
      <div className="section" id="how-it-works">
        <h1 className="title">How it works</h1>
        <p> this is a test test test </p>
      </div>
      <div className="section" id="scisoc">
        <h1 className="title">Science Society</h1>
        <p> this is a test test test </p>
      </div>
      <div className="section" id="cssociety">
        <h1 className="title">Computer Science Society</h1>
        <p> this is a test test test </p>
      </div>
    </div>
  );
}

export { HomePage };
