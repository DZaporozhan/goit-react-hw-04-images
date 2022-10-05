const { Button } = require('./Button.styled');

export const LoadMore = ({ children, onClick }) => {
  return <Button onClick={() => onClick()}>{children}</Button>;
};
