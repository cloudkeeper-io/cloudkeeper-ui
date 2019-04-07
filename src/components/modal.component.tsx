import React from 'react'
import ReactModal from 'react-modal'
import merge from 'lodash/merge'

interface ModalProps extends ReactModal.Props {
  style?: object
  isOpen: boolean
  onRequestClose: (e?: any) => void
  children: JSX.Element | JSX.Element[]
}

const style = {
  overlay: {
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  content: {
    border: '0',
    borderRadius: '4px',
    bottom: 'auto',
    minHeight: '10rem',
    left: '50%',
    padding: '20px',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: '400px',
    maxWidth: '80vw',
    boxShadow: '0 2px 4px rgba(188, 188, 188, 0.24), 0 0 10px rgba(0, 0, 0, 0.12)',
  },
}

export default (props: ModalProps) => (
  <ReactModal
    closeTimeoutMS={250}
    ariaHideApp={false}
    {...props}
    style={merge(style, props.style)}
  />
)
