import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Header,
  SearchForm,
  Button,
  ButtonIcon,
  Input,
} from './SearchBar.styled';

import { BsSearch } from 'react-icons/bs';

export const SearchBar = ({ onFormSubmit }) => {
  const [searchWord, setSearchWord] = useState('');

  const onInputChange = e => {
    const inputValue = e.target.value;
    setSearchWord(inputValue);
  };

  const onFormSubmitHandler = e => {
    e.preventDefault();
    onFormSubmit(searchWord);
  };

  return (
    <Header className="searchbar">
      <SearchForm onSubmit={onFormSubmitHandler} className="form">
        <Button type="submit" className="button">
          <ButtonIcon className="button-label">
            <BsSearch />
          </ButtonIcon>
        </Button>
        <Input
          onChange={onInputChange}
          value={searchWord}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
