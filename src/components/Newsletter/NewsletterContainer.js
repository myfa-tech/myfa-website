import React, { Component } from 'react'

import Newsletter from './Newsletter'
import { saveMember } from '../../services/mailchimp'

class NewsletterContainer extends Component {
  state = {
    email: '',
    showToast: false,
    toastType: '',
  }

  setShowToast = (showToast) => {
    this.setState({ showToast })
  }

  setToastType = (toastType) => {
    this.setState({ toastType })
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const { email } = this.state

    try {
      await saveMember({ email })
      this.setToastType('success')
      this.setShowToast(true)
      this.resetEmail()
    } catch(err) {
      this.setToastType('error')
      this.setShowToast(true)
    }
  }

  resetEmail = () => {
    this.setState({ email: '' })
  }

  setEmail = (event) => {
    const email = event.target.value

    this.setState({ email })
  }

  render() {
    const { email, showToast, toastType } = this.state

    return (
      <Newsletter
        email={email}
        onEmailChange={this.setEmail}
        onSubmit={this.onSubmit}
        showToast={showToast}
        setShowToast={this.setShowToast}
        toastType={toastType}
      />
    )
  }
}

export default NewsletterContainer
