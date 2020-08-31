import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  InputLabel,
  TextField,
  FormHelperText
} from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Clues } from '../../../data/staticData/clues';
import './MainContent.scss';


const MainContent = ({ progress, clueId }) => {
  const [answer, setAnswer] = useState("");
  const history = useHistory();

  const getClue = () => {
    let index = clueId - 1
    if ((clueId - 1) > progress) {
      index = progress
      history.push(`/hunt/play/${index+1}`)
    }
    
    return Clues[index]
  }

  const renderQuestion = () => {
    const clue = getClue();
    return ( 
      <h3>{clue.question}</h3> 
      );
  }
  
  const renderHint = () => {
    const clue = getClue();
    return (
      <strong>{clue.Hint}</strong>
      );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Answer Submitted is:", answer);
  }

  const handleChange = (event) => {
    setAnswer(event.target.value);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <div className="mainform__container">
          <div className="mainform__items">
            <form className="maincontent__form" onSubmit={handleSubmit} >
              <InputLabel>
                {renderQuestion()}
              </InputLabel>
              <div className="mainform__textfield">
                <TextField required 
                  id="question" 
                  label="Answer" 
                  variant="outlined"
                  aria-describedby="Write your answer here" 
                  value={answer} 
                  onChange={handleChange}
                />
                <FormHelperText id="my-helper-text">{renderHint()}</FormHelperText>
              </div>
              <Button variant="primary" type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  )
};

MainContent.propTypes = {
  progress: PropTypes.number,
  clueId: PropTypes.number,
};

export { MainContent };
