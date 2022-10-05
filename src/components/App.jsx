import { Component } from 'react';
import { LoadMore } from './Button/Button';
import { Box } from './common/Box';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    isLoad: true,
  };

  getQuery = newQuery => {
    this.setState(prevState => ({
      query: newQuery.query,
      page: 1,
    }));
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { query, page } = this.state;

    return (
      <Box>
        <Searchbar onSubmit={this.getQuery} />

        <ImageGallery query={query} page={page} />
        <Box display="flex" justifyContent="center">
          <LoadMore onClick={this.loadMore}>Load More</LoadMore>
        </Box>
      </Box>
    );
  }
}
