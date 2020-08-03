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
            <Route 
							path="/" 
							render={ (props) => <HomePage {...props}  /> } 
						/>
        </Router>
      </ApolloProvider>
    );
}

export { App }
