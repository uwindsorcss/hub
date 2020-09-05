import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import './QuestionTen.scss';

import One from '../_images/1.png';
import Two from '../_images/2.png';
import Three from '../_images/3.png';
import Four from '../_images/4.png';

function QuestionTen () {
  const [answerOne, setAnswerOne] = useState('');
  const [answerTwo, setAnswerTwo] = useState('');
  const [answerThree, setAnswerThree] = useState('');
  const [answerFour, setAnswerFour] = useState('');

  
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
        <h1>Puzzle #10</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <Grid container direction="column">
            <Grid container item xs={12}>
              <div className="letter-box">
                  UWindsor and the UWSA offer a lot of events and services to support students! Can you name these ones? (Hint: Each _______ is a word in the name!)
          
            <Grid container direction="row" className="pictionary">
              <Grid container item xs={8} justify="flex-start">
                <img src={One} className="emo" />
              </Grid>
              <Grid container item xs={4} justify="flex-start">
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
              </Grid>
            </Grid>
            <Grid container direction="row" className="pictionary">
              <Grid container item xs={8} justify="flex-start">
                <img src={Two} className="emo" />
              </Grid>
              <Grid container item xs={4} justify="flex-start">
                <div className="center-text">
                  <TextField required 
                    id="question" 
                    label="Answer" 
                    variant="outlined"
                    aria-describedby="Write your answer here" 
                    value={answerTwo} 
                    onChange={(e) => setAnswerTwo(e.target.value)}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container direction="row" className="pictionary">
              <Grid container item xs={8} justify="flex-start">
                <img src={Three} className="emo" />
              </Grid>
              <Grid container item xs={4} justify="flex-start" alignContent="center">
                <div className="center-text">
                  <TextField required 
                    id="question" 
                    label="Answer" 
                    variant="outlined"
                    aria-describedby="Write your answer here" 
                    value={answerThree} 
                    onChange={(e) => setAnswerThree(e.target.value)}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container direction="row" className="pictionary">
              <Grid container item xs={8} justify="flex-start">
                <img src={Four} className="emo" />
              </Grid>
              <Grid container item xs={4} justify="flex-start" alignItems="center">
                <div className="center-text">
                  <TextField required 
                    id="question" 
                    label="Answer" 
                    variant="outlined"
                    aria-describedby="Write your answer here" 
                    value={answerFour} 
                    onChange={(e) => setAnswerFour(e.target.value)}
                  />
                </div>
              </Grid>
            </Grid>
          </div>

        </Grid>
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

export { QuestionTen };
