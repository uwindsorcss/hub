import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { MicrosoftLoginButton } from '../MicrosoftLoginButton';

const NavBar = () => (
<Navbar bg="light" expand="lg" sticky="top">
  <Navbar.Brand href="#home">
    <img
          src="https://static.wixstatic.com/media/3bbffc_708ac4df6a9a4b24a0c25ac353c5b377~mv2.jpg/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/3bbffc_708ac4df6a9a4b24a0c25ac353c5b377~mv2.jpg"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
    />{' '}
    Scavenger Hunt | SciSoc
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#how_it_works">How it Works</Nav.Link>
      <Nav.Link href="#scisoc">SciSco</Nav.Link>
      <Nav.Link href="#css">CSS</Nav.Link>
      <MicrosoftLoginButton />
    </Nav>
  </Navbar.Collapse>
</Navbar>
)

export { NavBar };