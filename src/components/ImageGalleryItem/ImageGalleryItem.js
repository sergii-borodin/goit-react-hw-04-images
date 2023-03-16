import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';

import PropTypes from 'prop-types';

import { Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image }) => {
  const { webformatURL, largeImageURL, tags } = image;
  const [modalImage, setModalImage] = useState('');

  const showModal = modalImage => {
    setModalImage(modalImage);
  };

  const closeModal = () => {
    setModalImage('');
  };

  return (
    <>
      <Image
        onClick={() => showModal(largeImageURL)}
        src={webformatURL}
        alt={tags}
      />
      {modalImage !== '' && (
        <Modal closeModal={closeModal} tags={tags}>
          {modalImage}
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
