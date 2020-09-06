import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './QuestionTen.scss';

import One from '../images/1.png';
import Two from '../images/2.png';
import Three from '../images/3.png';
import Four from '../images/4.png';

import { Clues } from '../../../data/staticData/clues';

const QuestionTen = () => {
  const [answerOne, setAnswerOne] = useState('');
  const [answerTwo, setAnswerTwo] = useState('');
  const [answerThree, setAnswerThree] = useState('');
  const [answerFour, setAnswerFour] = useState('');

  const [validation, setValidation] = useState({
    'one' : false,
    'two' : false,
    'three' : false,
    'four' : false,
  });

  
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Answer Submitted is:", answerOne);
    setLoading(false);
  };

  const check = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

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
                  answerOne && check(answerOne, answers[0]) &&
                    <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
                }
                {
                  answerOne && !check(answerOne, answers[0]) &&
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
                  answerTwo && check(answerTwo, answers[1]) &&
                    <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
                }
                {
                  answerTwo && !check(answerTwo, answers[1])  &&
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
                  answerThree && check(answerThree, answers[2])  &&
                    <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
                }
                {
                  answerThree && !check(answerThree, answers[2]) &&
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
                  answerFour && check(answerFour, answers[3]) &&
                    <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
                }
                {
                  answerFour && !check(answerFour, answers[3]) &&
                    <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
                }
                 
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
