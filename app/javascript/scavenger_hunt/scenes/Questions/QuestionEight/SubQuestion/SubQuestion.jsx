import React, { useState } from 'react';
import { FormHelperText, TextField } from '@material-ui/core';
import { Button } from "react-bootstrap";
import { Alert } from "../../../../components/Alert";

const  SubQuestion = () => {
  const [answer, setAnswer] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Answer Submitted is:", answer);
  }

  const handleChange = (event) => {
    setAnswer(event.target.value);
  }

  return (
    <div>
      <Alert message="Good Job! you unlocked the second part of this puzzle" variant="success" isdismissible={true} />
      <form onSubmit={handleSubmit} >
        <div className="question-text">
          UWindsor has a club with the same name as the encoded acronym. The organization offers tutoring sessions before midterms and final exams, and all proceeds go to charity. What’s the complete name of this organization?
          <div className="center-text">
            ••• --- •••
          </div>
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
        <FormHelperText id="my-helper-text">
            Hint: Don't just write the abbreviation
        </FormHelperText>
        <div className="center-text">
          <Button variant="primary" type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export { SubQuestion };
