import React from 'react'
import { Toast as BootstrapToast } from 'react-bootstrap'

const Toast = (props) => {
  const { show, setShow, type } = props

  const title = type === 'sucess' ? '✅' : '❌'
  const message = type === 'sucess' ? 'Yay ! Email enregistré !' : 'Problème rencontré. Contactez-nous directement'

  return (
    <BootstrapToast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <BootstrapToast.Header>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded mr-2"
          alt=""
        />
        <strong className="mr-auto">{title}</strong>
        <small>maintenant</small>
      </BootstrapToast.Header>
      <BootstrapToast.Body>{message}</BootstrapToast.Body>
    </BootstrapToast>
  )
}

export default Toast
