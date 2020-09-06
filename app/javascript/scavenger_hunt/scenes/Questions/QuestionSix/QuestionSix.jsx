import React, { useState } from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import './QuestionSix.scss';

const QuestionSix = () => {
  const [answerOne, setAnswerOne] = useState('');
  const [answerTwo, setAnswerTwo] = useState('');
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Answers Submitted are:", answerOne, answerTwo);
    setLoading(false);
  }

  return(
    <Card>
      <Card.Header>
        <h1>Puzzle #6</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >

          <div className="letter-box">
            At an arbitrary university, there are 458 staff, 20,135 undergraduate students, and 1,864 graduate students in the Faculty of Science. Assuming that at any given time, 1.2% of the staff are inactive on campus due to extended leave and 10.33% of the remaining staff do not engage in research, while 78.9% of undergraduate students are eager to begin in a lab and 100% of the graduate students already have lab positions, what is the best faculty to student ratio offered by a university in Ontario for science?
          </div>

          <FormHelperText id="my-helper-text">
            Hint: It’s our Dean of Science’s favourite ratio!
          </FormHelperText>

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
          {
          !toggle &&
          <div className="center-text">
            <Button 
              variant="primary" 
              disabled={loading}
              onClick={() => {
                if(answerOne)
                  setToggle(true)
              }}
            >
              Click
            </Button>
          </div>
          }
          {
            toggle &&
            <>        
              <div className="letter-box">
                Follow-up question: Which university in Ontario has achieved this outstanding ratio? The University of _________!
              </div>
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
                <div className="center-text">
                  <Button 
                    type="submit"
                    variant="primary" 
                    disabled={loading}
                  >
                    Submit
                  </Button>
                </div>
              </>
            }
          
        </form>
      </Card.Body>
    </Card>

  )
}

export { QuestionSix };
