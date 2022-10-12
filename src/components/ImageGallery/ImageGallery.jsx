import { Gallery, ModalImage } from './ImageGallery.styled';
import { useState } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

export const ImageGallery = ({ gallery }) => {
  const [modalImg, setModalImg] = useState('');
  const [isModal, setIsModal] = useState(false);

  const handelClick = img => {
    setIsModal(state => !state);
    setModalImg(state => (state = img));
  };

  return (
    <>
      <Gallery id="gallery">
        {gallery.map(({ id, webformatURL, largeImageURL }, index) => (
          <ImageGalleryItem
            key={index}
            url={webformatURL}
            onClick={handelClick}
            modalImg={largeImageURL}
          />
        ))}
      </Gallery>

      {isModal && (
        <Modal onClose={handelClick}>
          <ModalImage src={modalImg} alt="" />
        </Modal>
      )}
    </>
  );
};

ImageGallery.protoTypes = {
  gallery: PropTypes.array.isRequired,
};
