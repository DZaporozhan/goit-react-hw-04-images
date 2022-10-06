import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, onClick, modalImg }) => {
  return (
    <GalleryItem>
      <Image src={url} alt="" onClick={() => onClick(modalImg)} />
    </GalleryItem>
  );
};
