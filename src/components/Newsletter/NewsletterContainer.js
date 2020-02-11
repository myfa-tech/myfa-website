import React, { Component } from 'react'

import Newsletter from './Newsletter'
import { saveNewsletterMember } from '../../services/mailjet'

class NewsletterContainer extends Component {
  state = {
    email: '',
    showToast: false,
    toastType: '',
    isLoading: false,
  }

  setShowToast = (showToast) => {
    this.setState({ showToast })
  }

  setToastType = (toastType) => {
    this.setState({ toastType })
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })

    const { email } = this.state

    try {
      await saveNewsletterMember({ email })
      this.setToastType('success')
      this.setShowToast(true)
      this.resetEmail()
    } catch(err) {
      this.setToastType('error')
      this.setShowToast(true)
    } finally {
      this.setState({ isLoading: false })
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
    const { email, isLoading, showToast, toastType } = this.state

    return (
      <Newsletter
        email={email}
        isLoading={isLoading}
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
