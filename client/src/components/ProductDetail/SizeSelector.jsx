import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import ProductStore from "../Provider/Zus_Provider.jsx";

const H2 = styled.h2`
margin: ${props => props.margin};
font-family: 'Cinzel';
font-weight: 200;
color: ${props => props.color || 'Black'};
text-align: left;
font-size: 32px;
`

const SzButton = styled.button`
padding: 1px 1px;
Color: Black;
background: white;
font-family: 'Cinzel';
font-weight: 900;
border: solid;
width:45px;
height:40px;
:disabled {
  background: Black;
  color: white;
}
`
const DisButton = styled.button`
padding: 1px 1px;
Color: Black;
background: white;
font-family: 'Cinzel';
font-weight: 900;
border: solid;
width:45px;
height:40px;
:disabled {
  background: Gray;
  color: white;
}
`

const Adiv = styled.div`
max-width: 100%;
padding: 10px 20px;
display:flex;
flex-direction:row;
gap: 5px;
align-items: center;
justify-content: space-between;
`
const Bdiv = styled.div`
max-width: 100%;
padding: 10px 20px;
display:flex;
flex-direction:row;
gap: 5px;
align-items: center;
justify-content: start;
`

const Quant = styled.select`
margin: 0px 20px 0;
width:70px;
height:40px;
border: solid;
`

const Option = styled.option`
padding: 1px 1px;
Color: Black;
background: white;
font-family: 'Cinzel';
font-weight: 900;
`

const SizeSelector = ({style}) => {

  const [size, setSize] = useState({Choice: false, XS:false, S: false, M: false, L:false, XL: false, XXL: false})
  const [Setter, setSetter] = useState(0);
  let sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  let skus = Object.keys(style.skus)
  let values = Object.values(style.skus)
  let options = [];
  let i;


  const setsSize = (value) => {
    i = -1;
    for (let elem in size) {
      size[elem] = false;
      if (elem === value) {
        size.Choice = true;
        size[elem] = true;
        setSetter(i);
      }
      i++;
    }
  }

  if (!size.Choice) {
    options = ['-'];
  } else {
    if (values[Setter].quantity) {
      for (let j = 1; j <= 15 && j <= values[Setter].quantity; j++) {
        options.push(j);
      }
    } else {
      options.push('OUT OF STOCK')
    }
  }


  return(
    <div>
      <H2 margin="0px 20px 0">Size:</H2>
      <Adiv>
        {sizes.map((choice, index) => {
          if (values[index] && values[index].quantity >= 0) {
            return(
              <SzButton key={index} value = {choice} onClick={(e) => setsSize(e.target.value)} disabled = {size[choice]}>{choice}</SzButton>
            )
          } else {
            return(
              <DisButton key={index} value = {choice} disabled = {true}>{choice}</DisButton>
            )
          }
        })}

      </Adiv>
      <Bdiv>
      <H2 margin="0">Quantity:</H2>
      <Quant>
        {options.map((info, index) => {
          return(
            <Option key={index}>{info}</Option>
          )
        })}
      </Quant>
      </Bdiv>
    </div>
  )
}

export default SizeSelector;