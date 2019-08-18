import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

import './Navbar.scss'

const NavbarView = () => {
  return (
    <Container>
      <Navbar expand="lg">
        <Navbar.Brand href="#">Myfa</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className='menu'>
            <Nav.Link href="#home">Accueil</Nav.Link>
            <Nav.Link href="#features">Fonctionnalités</Nav.Link>
            <Nav.Link href="#partners">Partenaires</Nav.Link>
            <Nav.Link href="#news">Actualités</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}

export default NavbarView