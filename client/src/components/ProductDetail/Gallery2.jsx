import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";

import ProductStore from "../Provider/Zus_Provider.jsx";

const GalleryDiv = styled.div`
display: flex;
justify-content: center;
`
const Thumbnails = styled.div`
margin: 80px 5px;
display: flex;
flex-direction: column;
gap: 8px;
`
const Timg = styled.img`
width: 45px;
height: 60px;
object-fit: contain;
cursor: pointer;
`

const Button = styled.button`
text-decoration: none;
background: transparent;
border: none;
height: auto;
width: auto;
`

const ButtonN = styled.button`
display:block;
opacity: ${props => props.disp};
margin: 5px auto;
background: transparent;
border: none;
height: 50px;
width: 100px;
border: solid;
:hover {
  opacity: ${props => props.disp2};
  border: 1px solid white;
  box-shadow: 4px 4px 12px #c5c5c5,
              -4px -4px 12px #ffffff;
  border-radius: 20px;
 }
`


const ButtonP = styled.button`
display:block;
opacity:${props => props.disp};
margin: 5px auto;
background: transparent;
border: none;
height: 50px;
width: 100px;
border: solid;
:hover {
  opacity: ${props => props.disp2};
  border: 1px solid white;
  box-shadow: 4px 4px 12px #c5c5c5,
              -4px -4px 12px #ffffff;
  border-radius: 20px;
 }
`

const Scrollbar = styled.div`
width: 2px;
height: 800px;
background: #ccc;
display: block;
margin: 80px 0 0 8px;
`
const Thumb = styled.div`
width: 2px;
position: absolute;
height: ${props => props.height};
background: #000;
transition: height 2s;
`

const Slides = styled.div`
margin: 0 16px;
display: grid;
grid-auto-flow: row;
gap: 1rem;
width: calc(540px + 1rem);
padding: 0 0.25rem;
height: 800px;
overflow-y: auto;
overscroll-behavior-y: contain;
scroll-snap-type: y mandatory;
scrollbar-width: none;
::-webkit-scrollbar {
display: none;
}
`
const IDiv = styled.div`
display: flex;
justify-content: center;
scroll-snap-align: start;
height: 780px;
`

const C2img = styled.img`
height: 780px;
max-width: 95%;
object-fit: contain;
`

const F2Div = styled.div`
display: flex;
flex-direction: column;
`

const StyledModal = styled.header`
  position: fixed;
  z-index: 100;
  padding: 200px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: black;
`

const Gallery2 = () => {

  const cStyle = ProductStore((state) => state.curStyle);
  const [ShowModal, setShowModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(null);
  let dispNext, dispPrev, dispNext2, dispPrev2;

  const show = () => {
    setShowModal(prev => !prev)
  }

  useEffect(() => {
    if (activeSlideRef.current) {
      activeSlideRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [activeSlide]);

  if (!cStyle) {
    return null;
  }



  if (activeSlide === 0) {
    dispPrev = "0"
  } else if (activeSlide === (cStyle.photos.length - 1)) {
    dispNext = "0"
  } else {
    dispPrev = ".3";
    dispNext = ".3";
    dispPrev2 = "1";
    dispNext2 = "1"
  }

  const moveLeft = Math.max(0, activeSlide - 1);
  const moveRight = Math.min(cStyle.photos.length - 1, activeSlide + 1);

  return (
    <GalleryDiv>
      <Thumbnails>
      {cStyle.photos.map((img, index) => {
          return(
              <Timg key={index} src={img.url} onClick={() => setActiveSlide(index)}/>
          )
      })}
      </Thumbnails>
      <Scrollbar>
        <Thumb height={`${((activeSlide + 1) / cStyle.photos.length) * 800}px`}/>
      </Scrollbar>
      <F2Div>
          <ButtonP onClick={() => setActiveSlide(moveLeft)} disp={dispPrev} disp2={dispPrev2}>PREV</ButtonP>
        <Slides>
          {cStyle.photos.map((img, index) => {
            return(
              <IDiv key={index} ref={index === activeSlide ? activeSlideRef : null}>
                <Button onClick={() => show()}>
                  <C2img key={index} src={img.url}/>
                </Button>
              </IDiv>
            )
          })}
        </Slides>
        <ButtonN onClick={() => setActiveSlide(moveRight)} disp={dispNext} disp2={dispNext2}>NEXT</ButtonN>
      </F2Div>
    </GalleryDiv>
  )
}

export default Gallery2;

