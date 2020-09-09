import React, { useState, useEffect } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import { Clues } from '../../../data/staticData/clues';
import { check } from '../utility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import './QuestionFour.scss';

import { useGetUserAnswerQuery } from '../../../data/queries';
import { useSaveUserAnswerMutation } from '../../../data/mutations';

const QuestionFour = ({ progress, setActiveStep, completed, setCompleted  }) => {

  const [answer, setAnswer] = useState("");
  const [loading, setLoading ] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ans = Clues[3].answers[0];

  const { data: getUserAnswerQueryData, loading: getUserAnswerQueryLoading } = useGetUserAnswerQuery({
    variables: {
      question_number: 4
    }
  });

  const [saveUserAnswer, { loading: mutationLoading }] = useSaveUserAnswerMutation();

  useEffect(() => {
    if(!getUserAnswerQueryLoading) {
      let persisted_user_answer = getUserAnswerQueryData.currentUser.answerTo;
      if(persisted_user_answer){
        updateCompleted();
        setAnswer(persisted_user_answer);
      }
    }
  });

  const updateCompleted = () => {
    const newCompleted = completed;
    newCompleted[progress].score = 1;
    newCompleted[progress].isCompleted = true;
    setCompleted(newCompleted);
  }

 
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);
    if (check(answer, ans)) {
      if(!mutationLoading){
        saveUserAnswer({
          variables: {
            "input": {
              "answerAttributes": {
                "questionNumber": 4,
                "answer": answer
              }
            }
          }
        });
      }
      setToggle(true);
      updateCompleted();
       
    } else {
      setToggle(false);
    }
    setLoading(false);
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
              disabled={completed[progress].isCompleted}
              style={{ width: 250}}
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
            (completed[progress].isCompleted || (submitted && toggle)) &&
              <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
          }
          {
            submitted && !toggle &&
              <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}}/>
          }
                 
          </Grid>
          {
           (!toggle && !completed[progress].isCompleted)  &&
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

export { QuestionFour };
