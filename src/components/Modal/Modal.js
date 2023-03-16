import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { ModalBackdrop, ModalContent } from './Modal.styled';

export const Modal = ({ closeModal, tags, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  });

  const onEscPress = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalBackdrop onClick={onBackdropClick}>
      <ModalContent>
        <img src={children} alt={tags} />
      </ModalContent>
    </ModalBackdrop>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
