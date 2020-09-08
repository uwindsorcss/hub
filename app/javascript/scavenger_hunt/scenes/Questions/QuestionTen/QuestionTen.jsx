import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import { Clues } from '../../../data/staticData/clues';
import { check } from '../utility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './QuestionTen.scss';

import One from '../images/1.png';
import Two from '../images/2.png';
import Three from '../images/3.png';
import Four from '../images/4.png';

const QuestionTen = ({progress, setActiveStep, completed, setCompleted }) => {
  const [answerOne, setAnswerOne] = useState('');
  const [answerTwo, setAnswerTwo] = useState('');
  const [answerThree, setAnswerThree] = useState('');
  const [answerFour, setAnswerFour] = useState('');

  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const [toggleThree, setToggleThree] = useState(false);
  const [toggleFour, setToggleFour] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const ans = Clues[9].answers;

  const [validation, setValidation] = useState({
    'one' : false,
    'two' : false,
    'three' : false,
    'four' : false,
  });

  
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);
    const one = check(answerOne.toString(), ans[0].toString());
    const two = check(answerTwo.toString(), ans[1].toString());
    const three = check(answerThree.toString(), ans[2].toString());
    const four = check(answerFour.toString(), ans[3].toString());

    const newCompleted = completed;
    newCompleted[progress].score = 0;
    console.log("ansers",ans)
    console.log(one, two, three, four);
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

    if (three) {
  
      setToggleThree(true);
      newCompleted[progress].score += 1;
    } else {
      setToggleThree(false);
    }

    if (four) {
      setToggleFour(true);
      newCompleted[progress].score += 1;
    } else {
       setToggleFour(false);
    }
    
    if ( newCompleted[progress].score == 4) {
      newCompleted[progress].isCompleted = true;
      setCompleted(newCompleted);
      // graphql query if needed
    }
    setLoading(false);
 
  }
  console.log('completed', completed);
  const data = Clues.find(e => e.puzzleNo === '10');
  const answers = data.answers;

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
              <Grid container item xs={6} justify="flex-start">
                <img src={One} className="emo" />
              </Grid>
              <Grid container item xs={4} justify="center" >
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
              <Grid container item xs={2} justify="center" alignItems="center">
                {
                  submitted && toggleOne &&
                    <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
                }
                {
                  submitted && !toggleOne &&
                    <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
                }
                 
              </Grid>
            </Grid>
            <Grid container direction="row" className="pictionary">
              <Grid container item xs={6} justify="flex-start">
                <img src={Two} className="emo" />
              </Grid>
              <Grid container item xs={4} justify="center">
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
              <Grid container item xs={2} justify="center" alignItems="center">
                {
                  submitted && toggleTwo &&
                    <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
                }
                {
                  submitted && !toggleTwo  &&
                    <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
                }
                 
              </Grid>
            </Grid>
            <Grid container direction="row" className="pictionary">
              <Grid container item xs={6} justify="flex-start">
                <img src={Three} className="emo" />
              </Grid>
              <Grid container item xs={4} justify="center" alignContent="center">
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
              <Grid container item xs={2} justify="center" alignItems="center">
                {
                  submitted && toggleThree  &&
                    <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
                }
                {
                  submitted && !toggleThree  &&
                    <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
                }
                 
              </Grid>
            </Grid>
            <Grid container direction="row" className="pictionary">
              <Grid container item xs={6} justify="flex-start">
                <img src={Four} className="emo" />
              </Grid>
              <Grid container item xs={4} justify="center" alignItems="center">
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
              <Grid container item xs={2} justify="center" alignItems="center">
                {
                  submitted && toggleFour &&
                    <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
                }
                {
                  submitted && !toggleFour &&
                    <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
                }
                 
              </Grid>
            </Grid>
          </div>

        </Grid>
    
            {
            (!completed[progress].score !== 4 && !completed[progress].isCompleted)  &&
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

export { QuestionTen };
