import { GalleryItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ url, onClick, modalImg }) => {
  return (
    <GalleryItem>
      <Image src={url} alt="" onClick={() => onClick(modalImg)} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  url: PropTypes.string,
  modalImg: PropTypes.string,
};
