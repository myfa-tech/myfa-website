import React from 'react'

const Orders = ({ basket }) => {
  return basket ? (
    <h1>Commande {basket.orderRef}</h1>
  ) : null
}

export default Orders
