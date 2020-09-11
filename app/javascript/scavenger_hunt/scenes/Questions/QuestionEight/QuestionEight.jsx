import React, { useState, useEffect } from 'react';
import { FormHelperText, TextField, Grid } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import { Alert } from "../../../components/Alert";
import { Clues } from '../../../data/staticData/clues';
import { check } from '../utility';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import "./QuestionEight.scss";
import { useGetUserAnswerQuery } from '../../../data/queries';
import { useSaveUserAnswerMutation } from '../../../data/mutations';

const  QuestionEight = ({progress, setActiveStep, completed, setCompleted }) => {
  const [answerOne, setAnswerOne] = useState('');
  const [answerTwo, setAnswerTwo] = useState('');
  const [toggleOne, setToggleOne] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const [submittedOne, setSubmittedOne] = useState(false);
  const [submittedTwo, setSubmittedTwo] = useState(false);  
  const [loading, setLoading] = useState(false);

  const ans = Clues[7].answers;

  const { data: getUserAnswerQueryData, loading: getUserAnswerQueryLoading } = useGetUserAnswerQuery({
    variables: {
      question_number: 8
    }
  });

  const [saveUserAnswer, { loading: mutationLoading }] = useSaveUserAnswerMutation();

  useEffect(() => {
    if(!getUserAnswerQueryLoading) {
      let persisted_user_answer = getUserAnswerQueryData.currentUser.answerTo;
      if(persisted_user_answer){
        updateCompleted();
        setAnswerOne(persisted_user_answer.split(', ')[0]);
        setAnswerTwo(persisted_user_answer.split(', ')[1]);
      }
    }
  });

  const updateCompleted = () => {
    const newCompleted = completed;
    newCompleted[progress].score = 2;
    newCompleted[progress].isCompleted = true;
    setCompleted(newCompleted);
  };

  const handleSubmitOne = (event) => {
    event.preventDefault();
    setSubmittedOne(true);
    setLoading(true);
    const one = check(answerOne.toString(), ans[0].toString());

    if (one) {
      setToggleOne(true);
    }
    setLoading(false);
  }

  const handleSubmitTwo = (event) => {
    event.preventDefault();
    setSubmittedTwo(true);
    setLoading(true);
    const two = check(answerTwo.toString(), ans[1].toString());

    if (two) {
      setToggleTwo(true);
      if(!mutationLoading){
        saveUserAnswer({
          variables: {
            "input": {
              "answerAttributes": {
                "questionNumber": 8,
                "answer": `${answerOne}, ${answerTwo}`
              }
            }
          }
        });
      }
      updateCompleted();
    }
    setLoading(false);
  }

  return (
    <Card>
      <Card.Header>
        <h1>Puzzle #8</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmitOne} >
          <div className="letter-box">
            Someone’s sending you a distress signal on radio waves! Type the correct frequency to receive the message. Don’t forget the units!
          </div>
          <div className="center-text">
            <Card.Img className="card-image" variant="bottom" src="https://i.imgur.com/BcMwUzV.png" />
          </div>
          <div className="center-text">
            <TextField required 
              id="question" 
              disabled={completed[progress].isCompleted}
              label="Answer" 
              variant="outlined"
              aria-describedby="Write your answer here" 
              value={answerOne}
              onChange={(e) => setAnswerOne(e.target.value)}
            />
          </div>

          <Grid container justify="center" alignItems="center">
          {
            (submittedOne && toggleOne) &&
              <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}} />
          }
          {
            submittedOne && !toggleOne &&
              <HighlightOffIcon style={{ color: 'red', width: 50, height: 50}} />
          }
          </Grid>

          {
          !toggleOne && !completed[progress].isCompleted &&
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
          {
            toggleOne &&
            <form onSubmit={handleSubmitTwo} >        
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
                    disabled={completed[progress].isCompleted}
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
                    (completed[progress].isCompleted || (submittedTwo && toggleTwo)) &&
                      <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
                  }
                  {
                    submittedTwo && !toggleTwo &&
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
            </form>
          }
      </Card.Body>
    </Card>
  );
};

export { QuestionEight };
