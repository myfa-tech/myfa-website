import React from 'react';

import Orders from './Orders';
import { getOrdersByRef } from '../../services/orders';

class OrdersContainer extends React.Component {
  async componentDidMount () {
    const ref = window.location.search.substr(5);
    await getOrdersByRef(ref);
  }

  render() {
    return (
      <Orders />
    )
  }
}

export default OrdersContainer
