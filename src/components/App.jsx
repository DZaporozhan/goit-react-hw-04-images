import { useState } from 'react';
import { LoadMore } from './Button/Button';
import { Box } from './common/Box';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const getQuery = newQuery => {
    setQuery(state => newQuery);
    setPage(1);
  };

  const loadMore = () => {
    setPage(state => state + 1);
  };

  const onLoadMore = () => {
    setIsLoadMore(true);
  };
  const offLoadMore = () => {
    setIsLoadMore(false);
  };

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
      <Searchbar onSubmit={getQuery} />

      <ImageGallery
        query={query}
        page={page}
        onLoad={onLoadMore}
        offLoad={offLoadMore}
      />
      {isLoadMore && (
        <Box display="flex" justifyContent="center">
          <LoadMore onClick={loadMore}>Load More</LoadMore>
        </Box>
      )}
    </Box>
  );
};
