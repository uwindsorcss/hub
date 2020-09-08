import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Button } from "react-bootstrap";
const End = (props) => {

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // connect to backend

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
          <div className="center-text">
            <Button variant="primary" type="submit">Submit</Button>
          </div>
        </form>
    </Grid>
  )
}

export { End };
