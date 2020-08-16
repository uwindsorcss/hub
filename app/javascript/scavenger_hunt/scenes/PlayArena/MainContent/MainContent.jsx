import React from 'react';
import './MainContent.scss';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Clues } from '../../../data/staticData/clues';


const MainContent = ({ progress, clueId }) => {
  const getClue = () => {
    let index = clueId - 1
    if ((clueId - 1)  > progress) {
      window.location.href = `/hunt/play/${progress + 1}`
      index = progress
    }
    
    return Clues[index]
  }

  const renderQuestion = () => {
    const clue = getClue();
    return (<h3 key={clueId} className="question">{clue.question}</h3>);
  }
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={8}>
        <div className="maincontent__container">
          <div className="maincontent__items">
            <form className="maincontent__form">
              {renderQuestion()}
              <div className="maincontent__textfield">
                <TextField id="standard-basic" label="Answer" />
              </div>
            </form>
          </div>
        </div>
      </Grid>
      <Grid item xs={2}>
      </Grid>
    </Grid>
  )
};

export { MainContent };