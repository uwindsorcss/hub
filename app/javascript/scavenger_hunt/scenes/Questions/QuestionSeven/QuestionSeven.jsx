import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import { Clues } from '../../../data/staticData/clues';
import { check } from '../utility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import Map from '../images/map.png';

const QuestionSeven = ({ progress, setActiveStep, completed, setCompleted  }) => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading ] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ans = Clues[6].answers[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);
    console.log("progress",  progress)
    if (check(answer, ans)) {
      setToggle(true);
   
      const newCompleted = completed;
      newCompleted[progress].score = 1;
      newCompleted[progress].isCompleted = true;
      console.log("Answer Submitted is:", newCompleted);
      setCompleted(newCompleted);
       
    } else {
      setToggle(false);
    }
    setLoading(false);
  }
  // console.log("Answer Submitted is:", toggle);
  const handleChange = (event) => {
    setAnswer(event.target.value);
  }


  return(
    <Card>
      <Card.Header>
        <h1>Puzzle #7</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <Grid container direction="column">
            <Grid container >
              <div className="letter-box">
              Roberta is a student at UWindsor. Here’s a day in her life pre-COVID-19! 
              <br/>
              <br/>
              In the morning, she parks her car in the parking garage on campus, then walks to her first lecture in Erie Hall. Before her next class, Earth Science, in Memorial Hall, she heads to Leddy Library to study for a bit. After Earth Sci, it’s lunch time! Roberta grabs a sub from the CAW Student Centre and goes to her last thing for the day: chem lab in Essex Hall!
              <br/>
              <br/>
              Following her route on the map shown, what does her path spell?
              </div>

            </Grid>
            <Grid  container justify="center" item>
              <img src={Map} className="map" />
            </Grid>

            <div className="center-text">
              <TextField required 
                id="question" 
                label="Answer" 
                variant="outlined"
                aria-describedby="Write your answer here" 
                value={answer} 
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            
          <Grid container justify="center" alignItems="center">
          {
            (completed[progress].isCompleted || (submitted && toggle)) &&
              <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
          }
          {
            submitted && !toggle &&
              <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
          }
                 
          </Grid>
          {
           (!toggle && !completed[progress].isCompleted)  &&
            <div className="center-text">
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading}
              >
                Submit
              </Button>
            </div>
          }
        
          </Grid>
          
        </form>
      </Card.Body>
    </Card>

  )
}

export { QuestionSeven };
