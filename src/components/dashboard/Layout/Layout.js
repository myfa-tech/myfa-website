import React from "react"
import PropTypes from "prop-types"

import Header from "../Header"

import './layout.scss'

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Header />
      <div>
        <main>{children}</main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
