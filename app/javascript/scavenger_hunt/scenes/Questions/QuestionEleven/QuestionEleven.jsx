import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import { Clues } from '../../../data/staticData/clues';
import { check } from '../utility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './QuestionEleven.scss';


const QuestionEleven = ({ progress, setActiveStep, completed, setCompleted  }) => {

  const [answer, setAnswer] = useState("");
  const [loading, setLoading ] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ans = Clues[10].answers[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);
    console.log("progress",  progress)
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

  return(
    <Card>
      <Card.Header>
        <h1>Puzzle #11</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <div className="letter-box">
            <div>
              Perhaps your name will join the ranks of these famous scientists someday after you graduate. That year seems far in the future, but it’ll come before you know it!
            </div>
            <br/>
            <br/>
            <Grid container justify="center" direction="row" >
              <Grid container item justify="flex-start"  xs={12} sm={6}>
                1. Ada Lovelace
              </Grid>
              <Grid container item justify="flex-start"  xs={12} sm={6}>
                2. Rosalind Franklin
              </Grid>
              <Grid container item justify="flex-start"  xs={12} sm={6}>
                3. Mary Anning
              </Grid>
              <Grid container item justify="flex-start"  xs={12} sm={6}>
                4. Jennifer Doudna
              </Grid>
              <Grid container item justify="flex-start"  xs={12} sm={6}>
                5. Marie Curie
              </Grid>
              <Grid container item justify="flex-start"  xs={12} sm={6}>
                6. Jane Goodall
              </Grid>
              <Grid container item justify="flex-start"  xs={12} sm={6}>
                7. Katherine Johnson
              </Grid>
              <Grid container item justify="flex-start"  xs={12} sm={6}>
                8. Mae C. Jemison
              </Grid>
              <Grid container item justify="flex-start"  xs={12} sm={6}>
                9. Shirley Ann Jackson
              </Grid>
              <Grid container item justify="flex-start"  xs={12} sm={6}>
                10. Gladys West
              </Grid>

            </Grid>
    
              <br/>
              <br/>
              Multiply the lifespans of scientists 1-3. This is value X.
              <br/>
              <br/>
              Sum the birth years of scientists 4-6. This is value Y.
              <br/>
              <br/>
              Sum the years that scientists 7-10 died, and divide it by 5. If the scientist is still alive, don’t include them in the calculation. This is value Z.
              <br/>
              <br/>
              (X+Y)*Z / 101 - 271452 = ?
              <br/>
              <br/>
            </div>

            <div className="center-text">
              <TextField required 
                id="question" 
                label="Answer" 
                variant="outlined"
                aria-describedby="Write your answer here" 
                value={answer} 
                onChange={(e) => setAnswer(e.target.value)}
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

  )
}

export { QuestionEleven };
