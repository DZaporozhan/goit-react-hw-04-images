import { Component } from 'react';
import { Box } from './common/Box';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
  };

  getQuery = newQuery => {
    this.setState(prevState => ({
      query: newQuery,
    }));
  };

  render() {
    return (
      <Box>
        <Searchbar onSubmit={this.getQuery} />
      </Box>
    );
  }
}
