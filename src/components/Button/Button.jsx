import { Button } from './Button.styled';
import PropTypes from 'prop-types';

export const LoadMore = ({ children, onClick }) => {
  return <Button onClick={e => onClick(e)}>{children}</Button>;
};

LoadMore.propTypes = {
  onClick: PropTypes.func,
};
