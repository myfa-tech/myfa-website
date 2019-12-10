/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./Header"
import Footer from "./Footer"

import './layout.scss'

const Layout = ({ children, className, hideHeader, noBackgroundColor, showLoginSignupModal, toggleShowLoginSignupModal }) => {
  return (
    <div className={`layout ${className}`}>
      {hideHeader ?
        null :
        <Header
          showLoginSignupModal={showLoginSignupModal}
          toggleShowLoginSignupModal={toggleShowLoginSignupModal}
        />
      }
      <div>
        <main>{children}</main>
      </div>
      <Footer noBackgroundColor={noBackgroundColor} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
