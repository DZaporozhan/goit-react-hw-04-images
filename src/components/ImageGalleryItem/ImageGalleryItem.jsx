import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url }) => {
  return (
    <GalleryItem>
      <Image src={url} alt="" />
    </GalleryItem>
  );
};
