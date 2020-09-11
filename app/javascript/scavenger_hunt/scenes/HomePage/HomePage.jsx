import React from 'react'
import { Alert } from "../../components/Alert";
import { Button } from 'react-bootstrap';
import './HomePage.scss'
import { useUserData } from "../../hooks/useUserData";

const HomePage = (props) => {
  const [{ userName, progress }, _ ] = useUserData();
  console.log(userName);

  return ( 
    <div className="main">
      {props.location.state && !props.location.state.loggedIn &&  <Alert message="You need to log in to access that page" variant="info" /> }
      <div className="section" id="how-it-works">
        <h1 className="title">How it works</h1>
        <p> Click the Sign In button in the top right, then click Play. Solve the puzzles in any order, but make sure to submit at the end before 8 pm! The first three 1st-year students to complete all the puzzles will get an Amazon gift card ($75 for 1st place; $50 for 2nd; $25 for 3rd). Good luck!
</p>
        <Button href={`/hunt/play/${progress+1}`} size="lg">
          Play
        </Button>
      </div>
      <div className="section" id="scisoc">
        <h1 className="title">Science Society</h1>
        <p>SciSoc hopes you enjoyed this year's Welcome Week! Stay tuned for our future events! </p>
      </div>
      <div className="section" id="cssociety">
        <h1 className="title">Computer Science Society</h1>
        <p> CSS hopes you had fun with our Welcome Week events! Join our <a href="https://css.uwindsor.ca/discord">discord</a> to stay updated with our events throughout the year.</p>
      </div>
    </div>
  );
}

export { HomePage };
