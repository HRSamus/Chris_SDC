import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import ProductStore from "../Provider/Zus_Provider.jsx";

const GalleryDiv = styled.div`
margin: 10px 0;
height: 1000px;
width: 70%;
border-radius: 30px;
background: white;
@media (max-width: 1300px) {
  width: 60%
  height:20%
}
`

//TODO CONTAINER QUERIES
const C2Div = styled.div`
margin: 10px;
height: 780px;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
overflow-y: auto;
scroll-snap-type: y mandatory;
::-webkit-scrollbar {
    width: 0px;
  }
`

//TODO CONTAINER QUERIES
const IDiv = styled.div`
height: 800px;
/* border: solid; */
display: flex;
justify-content: center;
`

//TODO CONTAINER QUERIES
const C2img = styled.img`
height: 780px;
max-width: 95%;
object-fit: contain;
scroll-snap-align: center;
/* box-shadow: 5px 0px 10px -5px; */
`

const Gallery = () => {

  const cStyle = ProductStore((state) => state.curStyle);

  if (!cStyle) {
    return null;
  }

  return (
    <GalleryDiv>
      <C2Div>
        {cStyle.photos.map((img, index) => {
          return(
            <IDiv key={index}>
              <C2img title = {img.name} src={img.url}/>
            </IDiv>
          )
        })}
      </C2Div>
    </GalleryDiv>
  )
}

export default Gallery;