import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Button } from "react-bootstrap";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const End = ({ start, progress, setActiveStep, completed, setCompleted  }) => {

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // connect to backend
    const calculateScore = completed.reduce((a,b) => a.score + b.score);
    const payload = {
      score: calculateScore,
      status: 'completed',
      name,
      studentId,
      time: new Date().getTime() - start
    }
    // if query if sucess
    setSuccess(true);
    setLoading(false);

  }
  return (
    <Grid container justify="center" direction="column">
      <Grid container justify="center">
        <h1>The End</h1>
      </Grid>

      <form onSubmit={handleSubmit} >
          <div className="center-text">
            <TextField required 
              id="question" 
              label="Name" 
              variant="outlined"
              aria-describedby="Write your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="center-text">
            <TextField required 
              id="question" 
              label="Student ID" 
              variant="outlined"
              aria-describedby="Write your answer here" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
          {
           !success ?
            <div className="center-text">
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading}
              >
                Submit
              </Button>
            </div>
            :
            <Grid container justify="center" alignItems="center">
              <CheckCircleOutlineIcon style={{ color: 'green', width: 50, height: 50}}/>
            </Grid>
          }
        </form>
    </Grid>
  )
}

export { End };
