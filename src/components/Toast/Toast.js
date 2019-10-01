import React from 'react'
import { Toast as BootstrapToast } from 'react-bootstrap'

const Toast = (props) => {
  const { show, setShow, type } = props

  const title = type === 'success' ? '✅' : '❌'
  const message = type === 'success' ? 'Yay ! Email enregistré !' : 'Problème rencontré. Contactez-nous directement'

  return (
    <BootstrapToast onClose={() => setShow(false)} show={show} delay={3000} autohide>
      <BootstrapToast.Header>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded mr-2"
          alt=""
        />
        <strong className="mr-auto" style={{ color: 'black' }}>{title}</strong>
        <small style={{ color: 'black' }}>maintenant</small>
      </BootstrapToast.Header>
      <BootstrapToast.Body style={{ color: 'black' }}>{message}</BootstrapToast.Body>
    </BootstrapToast>
  )
}

export default Toast
