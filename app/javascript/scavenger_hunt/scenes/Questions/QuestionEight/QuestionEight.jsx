import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import { SubQuestion } from "./SubQuestion";
import "./QuestionEight.scss";

const  QuestionEight = () => {
  const [answer, setAnswer] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Answer Submitted is:", answer);
  }

  const handleChange = (event) => {
    setAnswer(event.target.value);
  }

  return (
    <Card>
      <Card.Header>
        <h1>Puzzle #8</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <div className="question-text">
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
              value={answer}
              onChange={handleChange}
            />
          </div>
          <div className="center-text">
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </form>
        <SubQuestion />
      </Card.Body>
    </Card>
  );
};

export { QuestionEight };
