import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import './QuestionSeven.scss';

import Map from '../images/map.png';

const QuestionSeven = () => {
  const [answerOne, setAnswerOne] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Answer Submitted is:", answerOne);
    setLoading(false);
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
                value={answerOne} 
                onChange={(e) => setAnswerOne(e.target.value)}
              />
            </div>
          
            <div className="center-text">
              <Button 
                type="submit"
                variant="primary" 
                disabled={loading}
              >
                Submit
              </Button>
            </div>
      
          </Grid>
          
        </form>
      </Card.Body>
    </Card>

  )
}

export { QuestionSeven };
