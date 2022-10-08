import { Gallery, ModalImage } from './ImageGallery.styled';
import { Component } from 'react';
import { getPhoto } from 'services/Api';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Box } from '../common/Box';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    modalImg: '',
    isLoader: false,
    isModal: false,
  };

  componentDidUpdate(prevProps) {
    const { query: nextQuery, page: nextPage } = this.props;
    const { query: prevQuery, page: prevPage } = prevProps;

    if (prevQuery !== nextQuery) {
      this.setState({ isLoader: true });
      getPhoto(nextQuery, nextPage)
        .then(({ hits }) => {
          this.setState({ gallery: hits });
          return hits;
        })
        .then(collection => {
          if (collection.length) {
            this.props.onLoad();
          } else {
            this.resetGallery();
            this.props.offLoad();
          }
        })
        .finally(this.setState({ isLoader: false }));
    }

    if (prevQuery === nextQuery && prevPage !== nextPage) {
      this.setState({ isLoader: true });
      getPhoto(nextQuery, nextPage)
        .then(({ hits }) => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...hits],
          }));
          return hits;
        })
        .then(collection => {
          if (collection.length) {
            this.props.onLoad();
          }
        })
        .finally(this.setState({ isLoader: false }));
    }
  }
  handelClick = img => {
    this.setState(({ isModal }) => ({ isModal: !isModal }));
    this.setState(prevState => ({
      modalImg: img,
    }));
  };
  resetGallery = () => {
    this.setState({ gallery: [] });
  };
  render() {
    const { gallery, isLoader, isModal } = this.state;
    return (
      <>
        <Gallery>
          {gallery.map(({ id, webformatURL, largeImageURL }, index) => (
            <ImageGalleryItem
              key={index}
              url={webformatURL}
              onClick={this.handelClick}
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
          <Modal onClose={this.handelClick}>
            <ModalImage src={this.state.modalImg} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
