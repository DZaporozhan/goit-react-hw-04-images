import { useState, useEffect } from 'react';
import { LoadMore } from './Button/Button';
import { Box } from './common/Box';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { Loader } from './Loader/Loader';
import { getPhoto } from 'services/Api';
import { toast } from 'react-toastify';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      setIsLoader(true);
      getPhoto(query, page)
        .then(data => {
          setGallery(collect => [...collect, ...data.hits]);
          if (data.hits.length) {
            onLoadMore();
          } else {
            resetGallery();
            offLoadMore();
            toast.error(`По запросу "${query}" ничего не найдено`);
          }
          return data;
        })
        .then(data => {
          if (data.hits.length && data.hits.length < 12) {
            offLoadMore();
            toast('Коллекция закончилась');
          }
        })
        .catch(error => setError(error.massage))
        .finally(() => setIsLoader(false));
    }
  }, [query, page]);

  const resetGallery = () => {
    setGallery([]);
  };
  const getQuery = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setGallery([]);
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
      {isLoader && (
        <Box display="flex" justifyContent="center">
          <Loader />
        </Box>
      )}
      <ImageGallery gallery={gallery} />
      {error && (
        <Box display="flex" justifyContent="center">
          <p>{error}</p>
        </Box>
      )}
      {isLoadMore && (
        <Box display="flex" justifyContent="center">
          <LoadMore onClick={loadMore}>Load More</LoadMore>
        </Box>
      )}
    </Box>
  );
};
