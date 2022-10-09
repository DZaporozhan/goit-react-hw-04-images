import { Component } from 'react';
import { LoadMore } from './Button/Button';
import { Box } from './common/Box';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    loadMore: false,
  };

  getQuery = newQuery => {
    this.setState(prevState => ({
      query: newQuery,
      page: 1,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onLoadMore = () => {
    this.setState({ loadMore: true });
  };
  offLoadMore = () => {
    this.setState({ loadMore: false });
  };

  render() {
    const { query, page, loadMore } = this.state;

    return (
      <Box>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <ToastContainer />
        <Searchbar onSubmit={this.getQuery} />

        <ImageGallery
          query={query}
          page={page}
          onLoad={this.onLoadMore}
          offLoad={this.offLoadMore}
        />
        {loadMore && (
          <Box display="flex" justifyContent="center">
            <LoadMore onClick={this.loadMore}>Load More</LoadMore>
          </Box>
        )}
      </Box>
    );
  }
}
