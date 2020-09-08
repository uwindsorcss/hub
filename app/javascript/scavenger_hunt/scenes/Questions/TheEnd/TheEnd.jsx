import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Button } from "react-bootstrap";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const End = ({ isDone, setIsDone, start, completed, setCompleted  }) => {

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let c = 0;
    completed.forEach((e,index) => {
      if (index != completed.length -1 ) {
        if (!e.isCompleted) setError(true);
        else c += 1;
      }
    })
    setCount(c); 
  }, [count, completed])

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
    setIsDone(true);
    setSuccess(true);
    setLoading(false);

  }
  return (
    <Grid container justify="center" direction="column">
      <Grid container justify="center" direction="column">
        <Grid container justify="center">
          <h1>The End</h1>
        </Grid>
        {
          isDone && 
          <Grid container justify="center">
            <h5>
              You have finished the HUNT 🚀🚀🚀
            </h5>
          </Grid>
        }
        <Grid container justify="center">
          <h5>{count} of 12</h5>
        </Grid>
        
          
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
           !success && !isDone ?
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
