import React from 'react';
import './MainContent.scss';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const MainContent = (props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={8}>
        <div className="maincontent__container">
          <div className="maincontent__items">
            <form className="maincontent__form">
              <h3 className="question">This is placeholder for Questions, and it is a very long question. Yes very very long</h3>
              <TextField id="standard-basic" label="Answer" />
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