import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button} from 'react-bootstrap';
import { useCurrentUserQuery } from '../../data/queries';
import { useSignOutUserMutation } from "../../data/mutations"

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const { data, loading: queryLoading } = useCurrentUserQuery();
  const [signOutUser, { loading: mutationLoading }] = useSignOutUserMutation();


  useEffect(() => {
    if(!queryLoading) {
      setCurrentUser(data.currentUser);
    }
  });

  const handleSignInClick = () => {
    window.location.href = "/auth/microsoft_graph";
  }

  const handleSignOutClick = () => {
    if(!mutationLoading){
      signOutUser({
        variables: {
          input: {
            "id": currentUser.id
          }
        }
      }).then((res) => {
        window.location.href = "/hunt";
      });
    }
  }

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand>
        <Link className="navbar-brand" to="/hunt/homepage">
          <img
                src="https://static.wixstatic.com/media/3bbffc_708ac4df6a9a4b24a0c25ac353c5b377~mv2.jpg/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/3bbffc_708ac4df6a9a4b24a0c25ac353c5b377~mv2.jpg"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
          />{' '}
          Scavenger Hunt | SciSoc
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/hunt/homepage#home">Home</Link>
          <Link className="nav-link" to="/hunt/homepage#how_it_works">How it Works</Link>
          <Link className="nav-link" to="/hunt/homepage#scisoc">SciSoc</Link>
          <Link className="nav-link" to="/hunt/homepage#css">CSS</Link>
        </Nav>
         { !currentUser ?
            <Button 
              variant="outline-success"
              onClick={handleSignInClick}
            > 
              Sign In
            </Button>
          : 
            <>
            Welcome, {currentUser.name}!
            &nbsp;
            <Button 
              variant="outline-success"
              onClick={handleSignOutClick}
            > 
              Sign Out
            </Button>
            </>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export { NavBar };
