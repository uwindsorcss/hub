import React, { useState } from 'react';
import { TextField, Grid, FormHelperText } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import { Clues } from '../../../data/staticData/clues';
import { check } from '../utility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './QuestionSix.scss';

const QuestionSix = ({progress, setActiveStep, completed, setCompleted })  => {

  const [answerOne, setAnswerOne] = useState('');
  const [answerTwo, setAnswerTwo] = useState('');
  const [toggle, setToggle] = useState(false);
  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const ans = Clues[5].answers;

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

  return(
    <Card> 
      <Card.Header>
        <h1>Puzzle #6</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >

          <div className="letter-box">
            At an arbitrary university, there are 458 staff, 20,135 undergraduate students, and 1,864 graduate students in the Faculty of Science. Assuming that at any given time, 1.2% of the staff are inactive on campus due to extended leave and 10.33% of the remaining staff do not engage in research, while 78.9% of undergraduate students are eager to begin in a lab and 100% of the graduate students already have lab positions, what is the best faculty to student ratio offered by a university in Ontario for science?
          </div>

          <FormHelperText id="my-helper-text">
            Hint: It’s our Dean of Science’s favourite ratio!
          </FormHelperText>

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
              <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
          }
          {
            submitted && !toggleOne &&
              <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
          }
          </Grid>
 
          {
          !toggle && !completed[progress].isCompleted &&
          <div className="center-text">
            <Button 
              variant="primary" 
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
            <>        
              <div className="letter-box">
                Follow-up question: Which university in Ontario has achieved this outstanding ratio? The University of _________!
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
              </>
            }
          
        </form>
      </Card.Body>
    </Card>

  )
}

export { QuestionSix };
