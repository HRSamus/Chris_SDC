import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';

import {URL, TOKEN} from '/MyConfig.js';
import ProductInformation from "./ProductInformation.jsx";
import StyleCart from "./StyleCart.jsx";
// import Gallery from "./Gallery.jsx";
import Gallery2 from "./Gallery2.jsx";
import ProductStore from "../Provider/Zus_Provider.jsx";

const S2div = styled.div`
display: flex;
width: 70%;
flex-direction: row;
/* flex-wrap: wrap; */
gap: 30px;
justify-content: center;
align-items: center;
@media (max-width: 1300px) {
  width: 100%;
}
@media (max-width: 800px) {
  flex-direction: column;
}
`

const Overview = () => {

  const setup = ProductStore((state) => state.getProducts);

  useEffect(() => {
    console.log('Running!');
    setup();
  }, [])

  return (
    <>
      <S2div id="ProductInfo2">
        <Gallery2/>
        <StyleCart/>
      </S2div>
      <ProductInformation />
    </>
  )
}

export default Overview;