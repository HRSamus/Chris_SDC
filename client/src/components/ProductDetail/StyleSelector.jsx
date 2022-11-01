import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import ProductStore from "../Provider/Zus_Provider.jsx";

const ImgS = styled.img`
height: 3.5vw;
width: 3.5vw;
border-radius: 50%;
border: solid;
object-fit: cover;
@media (max-width: 1300px) {
  height: 7vw;
  width: 7vw;
}
`
const ImgY = styled.img`
position: relative;
height: 3.5vw;
width: 3.5vw;
border-radius: 50%;
object-fit: cover;
@media (max-width: 1300px) {
  height: 7vw;
  width: 7vw;
}
`

const SDiv = styled.div`
width: 3.7vw;
height: 3.7vw;
background: #07182E;
display: flex;
place-content: center;
place-items: center;
overflow: hidden;
border-radius: 50%;
@media (max-width: 1300px) {
  height: 7vw;
  width: 7vw;
}
::before {
  content: '';
  position: absolute;
  border-radius: 50%;
  width: 3.8vw;
  background-image: linear-gradient(180deg, rgb(0, 0, 0), rgb(255, 0, 242));
  height: 3.8vw;
  animation: rotBGimg 3s linear infinite;
  transition: all 0.2s linear;
  @media (max-width: 1300px) {
  height: 7.5vw;
  width: 7.5vw;
}
}
@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
`


const DivS = styled.div`
padding: 1em 1em;
max-width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 10px;
align-content:center;
align-items:center;
justify-content: center;
`

const StyleSelector = () => {

  const Styles = ProductStore((state) => state.curProductStyles);
  const curStyle = ProductStore((state) => state.curStyle);

  const setStyle = ProductStore((state) => state.setStyle);

  if (!Styles) {
    return null;
  }

  const handleClick = (e) => {
    setStyle(e.target.title);
  }

  return (
    <DivS>
      {Styles.map((info) => {
        if (info.style_id === curStyle.style_id) {
          return(
            <SDiv key={info.style_id}>
              <ImgY title = {info.name} value={info.style_id} src={info.photos[0].thumbnail_url} />
            </SDiv>
          )
        }
        return(
          <ImgS title = {info.name} key={info.style_id} value={info.style_id} src={info.photos[0].thumbnail_url} onClick = {(e) => handleClick(e)} />
        )
      })}
    </DivS>
  )
}

const StyleSelector2 = () => {

  const Styles = ProductStore((state) => state.curProductStyles);
  const curStyle = ProductStore((state) => state.curStyle);

  const setStyle = ProductStore((state) => state.setStyle);

  if (!Styles) {
    return null;
  }

  const handleClick = (e) => {
    setStyle(e.target.title);
  }

  return (
    <DivS>
      {Styles.map((info) => {
        if (info.style_id === curStyle.style_id) {
          return(
            <SDiv>
              <ImgY title = {info.name} key={info.style_id} value={info.style_id} src={info.photos[0].thumbnail_url} />
            </SDiv>
          )
        }
        return(
          <ImgS title = {info.name} key={info.style_id} value={info.style_id} src={info.photos[0].thumbnail_url} onClick = {(e) => handleClick(e)} />
        )
      })}
    </DivS>
  )
}


export default StyleSelector;