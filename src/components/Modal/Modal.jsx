import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handelKeyDown);

    return () => {
      window.removeEventListener('keydown', handelKeyDown);
    };
  }, []);

  const handelKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handelClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handelClick}>
      <ModalBox>{children}</ModalBox>
    </Backdrop>,
    modalRoot
  );
};
