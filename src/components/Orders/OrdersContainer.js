import React from 'react'

import Orders from './Orders'
import { getOrdersByRef } from '../../services/orders'

class OrdersContainer extends React.Component {
  state = {
    basket: null,
  }

  async componentDidMount () {
    const ref = window.location.search.substr(5)
    const { basket } = await getOrdersByRef(ref)

    this.setState({ basket })
  }

  render() {
    const { basket } = this.state

    return (
      <Orders basket={basket} />
    )
  }
}

export default OrdersContainer
