import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown);
  }

  handelKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handelClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Backdrop onClick={this.handelClick}>
        <ModalBox>{this.props.children}</ModalBox>
      </Backdrop>,
      modalRoot
    );
  }
}
