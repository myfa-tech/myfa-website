import React from "react"

import { Container, Navbar } from 'react-bootstrap'

import './Header.scss'
import logoSrc from '../../../images/logo-1.png'

const Header = () => (
  <Container>
    <Navbar expand="lg">
      <Navbar.Brand href="/dashboard">
        <img src={logoSrc} alt='logo' className='logo' />
      </Navbar.Brand>
    </Navbar>
  </Container>
)

export default Header
