import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const userKey = '29555599-b6225d531790a6eb880d69b1e';

export const getPhoto = async (query, page) => {
  const response = await axios.get(
    `?key=${userKey}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
  return response.data;
};
