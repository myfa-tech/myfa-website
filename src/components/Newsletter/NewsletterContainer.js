import React, { Component } from 'react'

import Newsletter from './Newsletter'
import { saveMember } from '../../services/mailchimp'

class NewsletterContainer extends Component {
  state = {
    email: '',
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { email } = this.state

    saveMember({ email })
  }

  setEmail = (event) => {
    const email = event.target.value

    this.setState({ email })
  }

  render() {
    const { email } = this.state

    return (
      <Newsletter
        email={email}
        onEmailChange={this.setEmail}
        onSubmit={this.onSubmit}
      />
    )
  }
}

export default NewsletterContainer
