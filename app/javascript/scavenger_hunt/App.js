import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from './components/Provider'
import { NavBar } from './components/NavBar'

import { HomePage } from './scenes/HomePage';

const App = () => {
    return (
    	<ApolloProvider>
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
          </Switch>
        </Router>
      </ApolloProvider>
    );
}

export { App }
