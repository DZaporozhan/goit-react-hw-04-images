import { Gallery } from './ImageGallery.styled';
import { Component } from 'react';
import { getPhoto } from 'services/Api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Box } from '../common/Box';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    isLoad: false,
  };

  componentDidUpdate(prevProps) {
    const { query: nextQuery, page: nextPage } = this.props;
    const { query: prevQuery, page: prevPage } = prevProps;

    if (prevQuery !== nextQuery) {
      this.setState({ isLoad: true });
      getPhoto(nextQuery, nextPage)
        .then(({ hits }) => {
          this.setState({ gallery: hits });
        })
        .finally(this.setState({ isLoad: false }));
    }
    if (prevPage !== nextPage || prevQuery !== nextQuery) {
      this.setState({ isLoad: true });
      getPhoto(nextQuery, nextPage)
        .then(data => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...data.hits],
          }));
        })
        .finally(this.setState({ isLoad: false }));
    }
  }

  render() {
    const { gallery, isLoad } = this.state;
    return (
      <Gallery>
        {gallery.map(({ id, webformatURL, largeImageURL }, index) => (
          <ImageGalleryItem key={index} url={webformatURL} />
        ))}
        {isLoad && (
          <Box display="flex" justifyContent="center">
            <Loader />
          </Box>
        )}
      </Gallery>
    );
  }
}
