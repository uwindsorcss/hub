import React, { useState } from 'react';
import { TextField,  Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import './QuestionFour.scss';

const QuestionFour = () => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Answer Submitted is:", answer);
  }

  const handleChange = (event) => {
    setAnswer(event.target.value);
  }
  return(
    <Card>
      <Card.Header>
        <h1>Puzzle #4</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <div className="question-text">
              Here are three clues to letters of the alphabet:
          </div>
          <Grid container justify="flex-start" direction="row" className="letter-box">
            <div className="letter">
              Letter #1: I am part of the language that is now used to write Minecraft -- no, it’s not English, nor is it related to coffee!
            </div>
            <div className="letter">
              Letter #2: Stella and Sam saw seven sharks swimming. I am the letter that is used once in the sentence but nine times before.
            </div>
            <div className="letter">
              Letter #3: I am Sulfur, just shorter!
            </div>
         
          </Grid>
          <div className="question-text">
            In the order of Letter #1, 2, and 3, what do these three letters stand for at UWindsor?
          </div>
          <div className="center-text">
            <TextField required 
              id="question" 
              label="Answer" 
              variant="outlined"
              aria-describedby="Write your answer here" 
              value={answer} 
              onChange={handleChange}
            />
          </div>
          <div className="center-text">
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </form>
      </Card.Body>
    </Card>

  )
}

export { QuestionFour };
