import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SoftButton = styled.button`
  border: none;
  background: none;
`
const Input = styled.input`
  border: none;
  width:95%;
  outline: none;
`
const Form = styled.form`
  display: flex;
  border: solid;
  padding-right: 10px;
  // margin-right: 10px;
  border-color: #4d4d4d;
  height: 50px;
  justify-content: space-between;
`

const SearchBar = ({setSearch}) => {
  const [value, setValue] = useState('');

  return (
    <div>
    <Form onSubmit={(e) => {
      e.preventDefault();
      setSearch(value);
      setValue('');}}>

        <Input onChange={(e)=> setValue(e.target.value)}
          placeholder="   HAVE A QUESTION? SEARCH FOR ANSWERS..."
          value={value}/>

        <SoftButton type="submit">Search</SoftButton>
      </Form>
      </div>
  );
}

export default SearchBar;