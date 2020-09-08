import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import { Clues } from '../../../data/staticData/clues';
import { check } from '../utility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './QuestionTwelve.scss';

const  QuestionTwelve = ({ progress, setActiveStep, completed, setCompleted  }) => {
  
  const [answer, setAnswer] = useState("");
  const [loading, setLoading ] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ans = Clues[11].answers[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);
    console.log("answer",  answer, ans )
    if (check(answer, ans)) {
      setToggle(true);
   
      const newCompleted = completed;
      newCompleted[progress].score = 1;
      newCompleted[progress].isCompleted = true;
      console.log("Answer Submitted is:", newCompleted);
      setCompleted(newCompleted);
       
    } else {
      setToggle(false);
    }
    setLoading(false);
  }
  // console.log("Answer Submitted is:", toggle);
  const handleChange = (event) => {
    setAnswer(event.target.value);
  }

  const Red = ({l}) => (<span style={{color : 'red'}}>{l}</span>)

  return (
    <Card>
      <Card.Header>
        <h1>Puzzle #12</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <div className="letter-box">
            IODINE TENNESSINE 1000! CARBON HELIUM <Red l={'C'}/> POTASSIUM BORON LANTHANIUM CARBON POTASSIUM BORON OXYGEN ARGON <Red l={'D'}/>! <Red l={'M'}/> ARGON POTASSIUM SULFUR <Red l={'A'}/> RHENIUM URANIUM PHOSPHORUS FLUORINE OXYGEN <Red l={'R M'}/> ASTATINE HYDROGEN 11010111000!

            <br/>
            <br/>
            Huh, what course was that again? 
            <br/>
            <br/>
            (Please provide the answer in a 4-letter 4-number code, such as: AAAA 0000)

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
          <Grid container justify="center" alignItems="center">
          {
            submitted && toggle &&
              <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
          }
          {
            submitted && !toggle &&
              <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
          }
                 
          </Grid>
          {
           !toggle &&
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


export { QuestionTwelve };
