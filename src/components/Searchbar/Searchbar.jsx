import {
  Header,
  SearchForm,
  SearchButton,
  InputText,
} from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';
import { Formik } from 'formik';

const initialValues = {
  query: '',
};
export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (value, { resetForm }) => {
    if (value.query.trim() === '') {
      alert('Введите больше букв');
      return;
    }
    onSubmit(value);
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
