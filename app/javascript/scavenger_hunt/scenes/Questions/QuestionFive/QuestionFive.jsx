import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import { Clues } from '../../../data/staticData/clues';
import { check } from '../utility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


import './QuestionFive.scss';

const QuestionFive = ({ progress, setActiveStep, completed, setCompleted }) => {
  const [answerOne, setAnswerOne] = useState('');
  const [answerTwo, setAnswerTwo] = useState('');

  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const ans = Clues[4].answers;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);
    const one = check(answerOne.toString(), ans[0].toString());
    const two = check(answerTwo.toString(), ans[1].toString());
    const newCompleted = completed;
    newCompleted[progress].score = 0;
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
      const payload = {
        progress,
        completed,
        status: 'incompleted',
      }
      // convert payload JSON object to string
      // save it in database
      // query it back and convert JSON object
      // save payload for every correct answer for all questions
    }
    setLoading(false);
   console.log("completed", newCompleted);
  }

  return(
    <Card>
      <Card.Header>
        <h1>Puzzle #5</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <div className="question-text">
          Science students can go on exchange all across the world!
          </div>

          <div className="letter-box">
          Umhverfisskólinn býður upp á nokkur grunnnámskeið þar sem þú getur stundað nám erlendis. Þessi setning er skrifuð á þjóðmálum lands þar sem námsmenn hafa ferðast til áður. Hvaða land er þetta?
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
            submitted && toggleOne &&
              <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
          }
          {
            submitted && !toggleOne &&
              <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
          }
          </Grid>
 
          <div className="letter-box">
            A veces, el decano de ciencias lleva a los estudiantes a un país tropical para estudiar ecología. Esta oración está escrita en el idioma nacional de ese país. ¿De qué país estamos hablando?
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
           (completed[progress].score != 2 && !completed[progress].isCompleted)  &&
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

  )
}

export { QuestionFive };
