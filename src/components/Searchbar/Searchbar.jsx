import {
  Header,
  SearchForm,
  SearchButton,
  InputText,
} from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  query: '',
};
export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (value, { resetForm }) => {
    if (value.query.trim() === '') {
      toast.error('Введите больше букв');
      return;
    }
    onSubmit(value.query);
    resetForm();
  };

  return (
    <Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchButton type="submit">
            <BiSearchAlt />
          </SearchButton>

          <InputText name="query" type="text" />
        </SearchForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
