import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";

import './QuestionOne.scss';

const  QuestionOne = () => {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading ] = useState(false);

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
        <h1>Puzzle #1</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <div className="letter-box">
            There’s a student government at UWindsor that represents all undergraduate students in the Faculty of Science. What’s the name of this organization?
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

export { QuestionOne };
