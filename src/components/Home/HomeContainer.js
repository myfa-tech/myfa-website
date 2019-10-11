import React, { Component } from 'react'
import Home from './Home'
import { saveMember } from '../../services/mailchimp'

export class HomeContainer extends Component {
  handleEndChatBot = async ({ values }) => {
    const member = {
      email: values[1],
      mergeFields: {
        FNAME: values[0],
      },
    }

    try {
      await saveMember(member)
    } catch(e) {
      console.log('could not save member')
    }
  }

  render() {
    return (
      <Home
        handleEndChatBot={this.handleEndChatBot}
      />
    )
  }
}

export default HomeContainer
