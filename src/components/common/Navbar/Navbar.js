import React from 'react'
import { Navbar } from 'react-bootstrap'

// DOC: https://react-bootstrap.github.io/getting-started/introduction/

const NavbarView = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Myfa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  )
}

export default NavbarView