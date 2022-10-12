import { Gallery, ModalImage } from './ImageGallery.styled';
import { useState, useEffect } from 'react';
import { getPhoto } from 'services/Api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Box } from '../common/Box';
import { Modal } from 'components/Modal/Modal';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

export const ImageGallery = ({ query, page, onLoad, offLoad }) => {
  const [gallery, setGallery] = useState([]);
  const [modalImg, setModalImg] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState(null);

  const handelClick = img => {
    setIsModal(state => !state);
    setModalImg(state => (state = img));
  };

  const resetGallery = () => {
    setGallery([]);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoader(true);
    getPhoto(query, page)
      .then(data => {
        setGallery(collect => [...collect, ...data.hits]);
        if (data.hits.length) {
          onLoad();
        } else {
          resetGallery();
          offLoad();
          toast.error(`По запросу "${query}" ничего не найдено`);
        }
        return data;
      })
      .then(data => {
        if (!data.hits.length || data.hits.length < 12) {
          offLoad();
          toast('Коллекция закончилась');
        } else {
          onLoad();
        }
      })
      .catch(error => setError(error.massage))
      .finally(() => setIsLoader(false));
  }, [query, page]);

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
      {isLoader && (
        <Box display="flex" justifyContent="center">
          <Loader />
        </Box>
      )}
      {isModal && (
        <Modal onClose={handelClick}>
          <ModalImage src={modalImg} alt="" />
        </Modal>
      )}
    </>
  );
};

ImageGallery.protoTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onLoad: PropTypes.func,
  offLoad: PropTypes.func,
};
