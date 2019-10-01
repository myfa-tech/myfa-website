import React from "react"

import { Container, Nav, Navbar } from 'react-bootstrap'

import './Header.scss'
import logoSrc from '../../images/logo-1.png'

const Header = () => (
  <Container>
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <img src={logoSrc} alt='logo' className='logo' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav className='menu'>
          <Nav.Link href="/#home">Accueil</Nav.Link>
          <Nav.Link href="/#features">Fonctionnalités</Nav.Link>
          <Nav.Link href="/#our-essence">Notre Essence</Nav.Link>
          <Nav.Link href="/#news">Actualités</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Container>
)

export default Header
