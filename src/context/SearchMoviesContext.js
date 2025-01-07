import {createContext} from 'react'

const SearchMoviesContext = createContext({
  searchInput: '',
  searchResponse: {},
  apiStatus: 'INITIAL',
  onTriggerSearchingQuery: () => {},
  onChangeSearchInput: () => {},
  resetSearch: () => {},
})

export default SearchMoviesContext
