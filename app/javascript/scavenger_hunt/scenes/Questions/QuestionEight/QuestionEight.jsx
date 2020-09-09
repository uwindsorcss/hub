import React, { useState } from 'react';
import { FormHelperText, TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import { Alert } from "../../../components/Alert";
import { Clues } from '../../../data/staticData/clues';
import { check } from '../utility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import "./QuestionEight.scss";

const  QuestionEight = ({progress, setActiveStep, completed, setCompleted }) => {
  const [answerOne, setAnswerOne] = useState('');
  const [answerTwo, setAnswerTwo] = useState('');
  const [toggle, setToggle] = useState(false);
  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const ans = Clues[7].answers;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);
    const one = check(answerOne.toString(), ans[0].toString());
    const two = check(answerTwo.toString(), ans[1].toString());
    const newCompleted = completed;
    newCompleted[progress].score = 0;
    setToggle(true);
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
   console.log("completed", newCompleted);
  }

  return (
    <Card>
      <Card.Header>
        <h1>Puzzle #8</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <div className="letter-box">
            Someone’s sending you a distress signal on radio waves! Type the correct frequency to receive the message. Don’t forget the units!
          </div>
          <div className="center-text">
            <Card.Img className="card-image" variant="bottom" src="https://i.imgur.com/BcMwUzV.png" />
          </div>
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

          <Grid container justify="center" alignItems="center">
          {
            (completed[progress].isCompleted || (submitted && toggleOne)) &&
              <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}} />
          }
          {
            submitted && !toggleOne &&
              <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}} />
          }
          </Grid>

          {
          !toggle && !completed[progress].isCompleted &&
          <div className="center-text">
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
              onClick={() => {
                if(answerOne)
                  setToggle(true)
              }}
            >
              Submit
            </Button>
          </div>
          }
          {
            toggle &&
            <div>
              <Alert message="Good Job! you unlocked the second part of this puzzle" variant="success" isdismissible={true} />
                <div className="letter-box">
                  UWindsor has a club with the same name as the encoded acronym. The organization offers tutoring sessions before midterms and final exams, and all proceeds go to charity. What’s the complete name of this organization?
                  <div className="center-text">
                    ••• --- •••
                  </div>
                </div>
                
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
                <FormHelperText id="my-helper-text">
                    Hint: Don't just write the abbreviation
                </FormHelperText>
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
            </div>
          }
        </form>
      </Card.Body>
    </Card>
  );
};

export { QuestionEight };
