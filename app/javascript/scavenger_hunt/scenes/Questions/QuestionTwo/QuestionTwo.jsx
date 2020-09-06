import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";

import './QuestionTwo.scss';

const  QuestionTwo = () => {
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
        <h1>Puzzle #2</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <div className="letter-box">
            What’s Science Society’s website? www.________.com
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
      </Card.Body>
    </Card>
  );
};

export { QuestionTwo };
