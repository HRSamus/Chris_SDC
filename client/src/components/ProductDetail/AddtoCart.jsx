import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import {InlineShareButtons} from 'sharethis-reactjs';

import ProductStore from "../Provider/Zus_Provider.jsx";


const Fdiv = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`

const Sdiv = styled.div`
width: 200px;
`
const Text = styled.span`
font-size: 1.125em;
line-height: 1.33333em;
padding-left: 2em;
display: block;
text-align: left;
transition: all 0.3s ease-in-out;
text-transform: uppercase;
text-decoration: none;
color: black;
`

const TopKey = styled.span`
height: 2px;
width: 1.5625rem;
top: -2px;
left: 0.625rem;
position: absolute;
background: #e8e8e8;
transition: width 0.5s ease-out, left 0.3s ease-out;
`

const BottomKey1 = styled.span`
height: 2px;
width: 1.5625rem;
right: 1.875rem;
bottom: -2px;
position: absolute;
background: #e8e8e8;
transition: width 0.5s ease-out, right 0.3s ease-out;
:hover{
  right: 0;
  width: 0;
}
`

const BottomKey2 = styled.span`
height: 2px;
width: 0.625rem;
right: 0.625rem;
bottom: -2px;
position: absolute;
background: #e8e8e8;
transition: width 0.5s ease-out, right 0.3s ease-out;
:hover{
  right: 0;
  width: 0;
}
`

const Fancy = styled.a`
width: 200px;
margin: 20px 20px;
background-color: transparent;
border: 2px solid #000;
border-radius: 0;
box-sizing: border-box;
color: #fff;
cursor: pointer;
display: inline-block;
float: right;
font-weight: 700;
letter-spacing: 0.05em;
/* margin: 0; */
outline: none;
overflow: visible;
padding: 1.25em 2em;
position: relative;
text-align: center;
text-decoration: none;
text-transform: none;
transition: all 0.3s ease-in-out;
user-select: none;
font-size: 13px;
:before {
  content: " ";
  width: 1.5625rem;
  height: 2px;
  background: black;
  top: 50%;
  left: 1.5em;
  position: absolute;
  transform: translateY(-50%);
  transform-origin: center;
  transition: background 0.3s linear, width 0.3s linear;
}
:hover {
  color: white;
  background: black;
}
:hover::before {
  width: 0.9375rem;
  background: white;
}
:hover > ${Text}{
  color: white;
  padding-left: 1.5em;
}
:hover ${TopKey}{
  left: -2px;
  width: 0px;
}
:hover ${BottomKey1},
:hover ${BottomKey2}{
  right: 0;
  width: 0;
}
`

const AddToCart = () => {
  return(
    <Fdiv>
      <Sdiv>
        <InlineShareButtons config={{
            alignment: 'center',  // alignment of buttons (left, center, right)
            color: 'social',      // set the color of buttons (social, white)
            enabled: true,        // show/hide buttons (true, false)
            font_size: 16,        // font size for the buttons
            labels: 'null',        // button labels (cta, counts, null)
            language: 'en',       // which language to use (see LANGUAGES)
            networks: [           // which networks to include (see SHARING NETWORKS)
              'facebook',
              'twitter',
              'pinterest'
            ],
            padding: 12,          // padding within buttons (INTEGER)
            radius: 4,            // the corner radius on each button (INTEGER)
            size: 40             // the size of each button (INTEGER)
        }}/>
      </Sdiv>
      <Fancy href="#">
        <TopKey/>
        <Text>Add to Cart</Text>
        <BottomKey1/>
        <BottomKey2/>
      </Fancy>
    </Fdiv>
  )
}

export default AddToCart;