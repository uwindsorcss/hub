import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import './QuestionNine.scss';

import Table from '../images/table.png';
import Gene from '../images/gene.png';

const QuestionNine = () => {
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
        <h1>Puzzle #9</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <Grid container direction="column">
            <Grid  container justify="center" item>
              <img src={Table} className="table" />
            </Grid>
            <Grid container item xs={12}>
              <div className="letter-box">
                <img src={Gene} className="gene" />
      
                <br/>
                <br/>
                  The Faculty of Science has a program with the same name as the acronym concealed within this DNA sequence. Use the given table to decode the DNA! Treat the top strand as the template, transcribe from 3’ to 5’, and translate.
                <br/>
                <br/>
                  What does each letter stand for in the program we’re referring to?
              </div>

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

export { QuestionNine };
