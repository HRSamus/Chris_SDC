import {useState, useEffect} from 'react';
import styled from "styled-components";
import {Starbar} from './starbar.jsx';
import axios from 'axios';
import {TOKEN} from '/MyConfig.js';
import brokenIMG from '../../assets/brokenImage.png';

const StyledContainerSpread = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledContainerStart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex: 1 1 1 1 1
`

const StyledBold = styled.header`
  font-weight: bold;
  font-family: 'OldStandard';
  font-size: 15px;
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
  background-color: rgba(0,0,0,0.8); /* Fallback color */
`
const StyledOuterContainer = styled.div`
  padding: 10px 0px;
  margin-right: 5px;
  border-top: 2px solid grey;
`
const StyledImage = styled.img`
  margin: 2px 3px;
`
const StyledOldBold= styled.b`
  font-family: 'OldStandard';
  font-size: 14px;
`
const StyledOldStandardTime= styled.time`
  font-family: 'OldStandard';
  font-size: 15px;
`
const StyledOldDiv= styled.div`
  font-family: 'OldStandard';
  font-size: 14px;
`
const StyledOldA = styled.a`
font-family: 'OldStandard';
font-size: 14px;
`

export const convertDate = (inp)=> {
  let formattedDate = new Date(inp)
  formattedDate=formattedDate.toDateString().split(' ');
  return `${formattedDate[1]} ${formattedDate[2]}, ${formattedDate[3]}`
}

//padding: 10px 5px 10px 0;
export const ReviewTile = ({review}) => {

  const [showMore, setShowMore] = useState(review.body.length > 250 ? true : false)
  const [helpful, setHelpful] = useState({voted:false, helpfulCount: review.helpfulness})

  const uploadHelpfulVote = ()=> {
    if (!helpful.voted) {
      axios({
        url: `http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews/${review.review_id}/helpful`,
        method: 'put',
        headers: {authorization: TOKEN}
        })
        .then(()=> {
          setHelpful({voted:true, helpfulCount: review.helpfulness + 1})
        })
        .catch((err)=> {
          alert(err);
        })
    }
  }

  return (
    <StyledOuterContainer>
      <StyledContainerSpread>
        <Starbar rating={review.rating}/>
        <StyledOldStandardTime>{review.reviewer_name + ', ' + convertDate(review.date)}</StyledOldStandardTime>
      </StyledContainerSpread>
      <StyledBold>{review.summary}</StyledBold>

      {showMore ?
      <StyledOldDiv>
        <p>{review.body.slice(0, 250) + '...'}</p>
        <a href="#/" onClick={()=>{setShowMore(false)}}>{'Show more'}</a>
      </StyledOldDiv>
      :
      <StyledOldDiv>{review.body}</StyledOldDiv>
      }

      <StyledContainerStart>
        {review.photos.map((photo, index)=> {
          return <SizeAdjustableImage key={index} url={photo.url}/>
        })}
      </StyledContainerStart>
      {review.recommend && <StyledOldDiv>✓ I recommend this product</StyledOldDiv>}
      {review.response && <StyledOldDiv>RESPONSE FROM SELLER: {review.response}</StyledOldDiv>}
      <StyledOldBold>Was this review helpful? </StyledOldBold>
      <StyledOldA href="#/" onClick={uploadHelpfulVote}>Yes ({helpful.helpfulCount})</StyledOldA>
    </StyledOuterContainer>

  )
}

const SizeAdjustableImage = ({url}) => {
  const [modalView, setModalView] = useState(false)

  if (modalView) {
    return (
      <StyledModal>
        <img src={url} onClick={()=>{setModalView(false)}}></img>
      </StyledModal>
    )
  } else {
    return <StyledImage src={url} width="50px" height="50px" onClick={(e)=>{if (e.target.src != brokenIMG) {setModalView(true)}}} onError={(e)=>{
      e.currentTarget.src = brokenIMG;
    }}></StyledImage>
  }
}