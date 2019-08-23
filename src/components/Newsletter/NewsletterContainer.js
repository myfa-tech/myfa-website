import React, { Component } from 'react'

import Newsletter from './Newsletter'
import { saveMember } from '../../services/mailchimp'

class NewsletterContainer extends Component {
  state = {
    email: '',
    showToast: false,
    toastType: 'success',
  }

  setShowToast = (showToast, toastType) => {
    this.setState({ showToast, toastType })
  }

  onSubmit = async (event) => {
    event.preventDefault()
    const { email } = this.state

    try {
      await saveMember({ email })
      this.setShowToast(true, 'success')
      this.resetEmail()
    } catch(err) {
      this.setShowToast(true, 'error')
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

    console.log({ toastType })

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
