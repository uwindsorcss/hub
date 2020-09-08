import React, { useState } from 'react';
import { FormHelperText, Grid, TextField } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import { Clues } from '../../../data/staticData/clues';
import { check } from '../utility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './QuestionThree.scss';



const  QuestionThree = ({progress, setActiveStep, completed, setCompleted }) => {
  const [DateOne, setDateOne] = useState('');
  const [DateTwo, setDateTwo] = useState('');

  const [loading, setLoading ] = useState(false);
  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ans = Clues[2].answers;
  console.log("asn", ans);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);
    const one = check(DateOne.toString(), ans[0].toString());
    const two = check(DateTwo.toString(), ans[1].toString());
    const newCompleted = completed;
    newCompleted[progress].score = 0;
    console.log('corect',DateOne, ans[0] )
    if (one) {
   
      setToggleOne(true);
      newCompleted[progress].score += 1;
    } else {
      setToggleOne(false);
    }

    if (two) {
      setToggleTwo(true);
      newCompleted[progress].score += 1;
    } else {
       setToggleTwo(false);
    }
    
    if ( newCompleted[progress].score == 2) {
      newCompleted[progress].isCompleted = true;
      setCompleted(newCompleted);
      // graphql query if needed
    }
    setLoading(false);
    console.log("date", !(toggleOne && toggleTwo) )
  }

  return (
    <Card>
      <Card.Header>
        <h1>Puzzle #3</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <div className="letter-box">
            SciSoc organizes many annual events. In particular, we celebrate two science-related dates every year. What are those days? 
          </div>
          <div className="center-text">
            <TextField required 
              id="question" 
              label="DD/MM" 
              variant="outlined"
              aria-describedby="Write your answer here" 
              value={DateOne}
              onChange={(e) => setDateOne(e.target.value)}
            />
          </div>
          <Grid container justify="center" alignItems="center">
          {
             (completed[progress].isCompleted || (submitted && toggleOne)) &&
              <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
          }
          {
            submitted && !toggleOne &&
              <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
          }
          </Grid>

          <div className="center-text">
            <TextField required 
              id="question" 
              label="DD/MM" 
              variant="outlined"
              aria-describedby="Write your answer here" 
              value={DateTwo}
              onChange={(e) => setDateTwo(e.target.value)}
            />
          </div>
          <Grid container justify="center" alignItems="center">
          {
             (completed[progress].isCompleted || (submitted && toggleTwo)) &&
              <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
          }
          {
            submitted && !toggleTwo &&
              <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
          }
          </Grid>
          <FormHelperText id="my-helper-text">
            Hint: On one day, we give out free guacaMOLE and on the other, it’s free PIe!
          </FormHelperText>
          {
           completed[progress].score != 2 && !completed[progress].isCompleted &&
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
        </form>
      </Card.Body>
    </Card>
  );
};

export { QuestionThree };
