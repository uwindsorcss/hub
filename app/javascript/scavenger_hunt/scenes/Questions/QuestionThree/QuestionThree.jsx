import React, { useState } from 'react';
import { FormHelperText } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import './QuestionThree.scss';
import "react-datepicker/dist/react-datepicker.css";

const  QuestionThree = () => {
  const [DateOne, setDateOne] = useState(new Date());
  const [DateTwo, setDateTwo] = useState(new Date());


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Answer Submitted is: ", DateOne, DateTwo);
  }

  return (
    <Card>
      <Card.Header>
        <h1>Puzzle #3</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <div className="question-text">
            SciSoc organizes many annual events. In particular, we celebrate two science-related dates every year. What are those days? 
          </div>
          <div className="center-text">
            <div className="date-picker">
              <DatePicker selected={DateOne} onChange={date => setDateOne(date)} />
            </div>
            <div className="date-picker">
              <DatePicker selected={DateTwo} onChange={date => setDateTwo(date)} />
            </div>
          </div>
          <FormHelperText id="my-helper-text">
            Hint: On one day, we give out free guacaMOLE and on the other, it’s free PIe!
          </FormHelperText>
          <div className="center-text">
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export { QuestionThree };
