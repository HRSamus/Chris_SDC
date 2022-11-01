import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import SearchBar from './/SearchBar.jsx';
import QAList from './/QAList.jsx';
import ProductStore from "../Provider/Zus_Provider.jsx";

const H2 = styled.h2`
// font-family: 'Proxima Nova';
  // font-weight: 200;
  text-align: center;
`

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  padding: 10px;
  bachground: white;
  border: solid;
  border-color: #999999;
`

  const QA = () => {
    const [search, setSearch] = useState('');
    const curProduct = ProductStore((state) => state.curProduct)
    if (!curProduct) {
      return null;
    }

    return (
      <>
        <H2> QUESTIONS & ANSWERS</H2>
        <MainDiv id="QandA">
          <SearchBar setSearch={setSearch}/>
          <QAList search={search} product={curProduct} />
        </MainDiv>
      </>
    );
  }

export default QA;