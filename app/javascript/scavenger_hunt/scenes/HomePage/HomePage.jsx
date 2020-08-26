import React from 'react';
import { Button } from 'react-bootstrap';

import { useProgress } from '../../hooks/useProgress'
import { Alert } from "../../components/Alert";
import './HomePage.scss';

const HomePage = (props) => {
  const [progress, _, isProgressLoading] = useProgress((props.location.state && props.location.state.loggedIn));

  const buttonHref = (isProgressLoading) ? `/hunt/play/${progress + 1}` : '/hunt/play/1';

  return ( 
    <div className="main">
      {props.location.state && !props.location.state.loggedIn &&  <Alert message="You need to log in to access that page" variant="info" /> }
      <div className="section" id="how-it-works">
        <h1 className="title">How it works</h1>
        <p> this is a test test test </p>
        <Button href={buttonHref} size="lg">
          Play
        </Button>
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
