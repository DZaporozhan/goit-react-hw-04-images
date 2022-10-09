import { Button } from './Button.styled';

export const LoadMore = ({ children, onClick }) => {
  return <Button onClick={e => onClick(e)}>{children}</Button>;
};
