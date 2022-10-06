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
    isLoad: false,
    isModal: false,
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
    if (prevQuery !== nextQuery || prevPage !== nextPage) {
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
  handelClick = img => {
    this.setState(({ isModal }) => ({ isModal: !isModal }));
    this.setState(prevState => ({
      modalImg: img,
    }));
  };

  render() {
    const { gallery, isLoad, isModal } = this.state;
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
        {isLoad && (
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
