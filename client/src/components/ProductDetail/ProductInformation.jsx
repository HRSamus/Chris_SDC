import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import ProductStore from "../Provider/Zus_Provider.jsx";

const DivS = styled.div`
margin: 0 20px;
display: flex;
flex-direction: column;
text-align: left;
width: 75%;
`
const DivS2 = styled.div`
margin: 10px 0;
display: flex;
width: 30%;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
@media (max-width: 1300px) {
  width: 40%
}
`

const InfoDiv = styled.div`
margin: 20px 0;
display: flex;
flex-direction: row;
width: 70%;
border-top: double;
border-bottom: double;
background: white;
text-align: center;
/* box-shadow: 15px 15px 30px #5f5f5f,
            -10px -5px 30px #ffffff; */
@media (max-width: 1300px) {
  width: 100%;
}
`

const H2 = styled.h2`
margin: ${props => props.margin};
font-family: 'Cinzel';
font-weight: 200;
color: ${props => props.color || 'Black'};
text-align: left;
font-size: 32px;

`

const H4 = styled.h4`
margin: ${props => props.margin || "0"};
font-family: 'OldStandard';
letter-spacing: 1px;
color: ${props => props.color || 'Black'};
font-size: ${props => props.size || "14px"};
`

//Completion of props and state
//TODO CSS alignment and styling

const ProductInformation = () => {
  const curProduct = ProductStore((state) => state.curProduct)


  if (!curProduct) {
    return null;
  }

  return (
    <InfoDiv id="ProductInfo3">
      <DivS>
        <H2><em>{curProduct.slogan}</em></H2>
        <H4 size = "30px">{curProduct.description}</H4>
      </DivS>
      <DivS2>
        <H2>Features</H2>
        {curProduct.features.map((item, index) => {
          return (
              <H2 key={index}>
                {item.feature}: {item.value}
              </H2>
          )
        })}
      </DivS2>
    </InfoDiv>
  )
}

export default ProductInformation;