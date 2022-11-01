import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { CloudinaryContext } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from './CloudinaryHelpers.js';
import {CLOUDINARY_CLOUD_NAME, PRESET } from "/MyConfig.js";

const Button = styled.button`
border-width: thin;
background:none;
font-weight: bold;
color: #404040;
`
const Center = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: center;
  `

const UploadImage = ({setPhotos}) => {
  const [images, setImages] = useState([]);

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: CLOUDINARY_CLOUD_NAME,
      tags: [tag, 'anImage'],
      uploadPreset: PRESET
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if(photos.event === 'success'){
          setImages([...images, photos.info.url])
        }
      } else {
        console.log(error);
      }
    })
  }

  useEffect( () => {
    fetchPhotos("image", setImages);
    setPhotos(images);
  }, [images])

  return (
   <CloudinaryContext cloudName={CLOUDINARY_CLOUD_NAME}>
      <div className="App">
        <Center>
       {images.length < 4 ? <Button onClick={(e) => {e.preventDefault(); beginUpload("image")}}>UPLOAD IMAGE</Button> : null}
       </Center>
      <section>
        {images.map(i =>
        <img key={i} publicId={i} fetch-format="auto" quality="auto" src={i} height="100px"/>)}
      </section>
    </div>
   </CloudinaryContext>
  )
}

export default UploadImage;

