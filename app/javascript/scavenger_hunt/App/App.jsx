import React from 'react'
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { UserData } from "../context";
import { Providers } from '../components/Providers'
import { NavBar } from '../components/NavBar'

import { HomePage } from '../scenes/HomePage';
import { PlayArena } from '../scenes/PlayArena';


const App = ({ userData }) => {
  // console.log('user data', userData);

  return (
    <Providers userData={userData} >
      <Router>
        <NavBar />
        <Switch>
          <Route 
            path="/hunt/homepage"
            render={ (props) => <HomePage {...props}  /> } 
            exact
          />
          <Route 
            path="/hunt/auth/microsoft_graph"
            render={ () => <Redirect to={'/hunt/homepage'} /> } 
            exact
          />
          <Route
            path="/hunt/play"
            render={ (props) => <PlayArena {...props} />}
          /> 
          <Route
            path="/hunt"
            render={ () => <Redirect to={'/hunt/homepage'} />}
          />
        </Switch>
      </Router>
    </Providers>
  );
}

App.propTypes = {
  userData: PropTypes.shape(UserData)
};

export { App }
