import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Card, Button } from "react-bootstrap";
import './QuestionFive.scss';

const QuestionFive = () => {
  const [answerOne, setAnswerOne] = useState('');
  const [answerTwo, setAnswerTwo] = useState('');
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
        <h1>Puzzle #5</h1>
      </Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit} >
          <div className="question-text">
          Science students can go on exchange all across the world!
          </div>

          <div className="letter-box">
          Umhverfisskólinn býður upp á nokkur grunnnámskeið þar sem þú getur stundað nám erlendis. Þessi setning er skrifuð á þjóðmálum lands þar sem námsmenn hafa ferðast til áður. Hvaða land er þetta?
          </div>
        
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
 
          <div className="letter-box">
            A veces, el decano de ciencias lleva a los estudiantes a un país tropical para estudiar ecología. Esta oración está escrita en el idioma nacional de ese país. ¿De qué país estamos hablando?
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
              variant="primary" 
              type="submit"
              disabled={loading}
            >
              Submit
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>

  )
}

export { QuestionFive };
