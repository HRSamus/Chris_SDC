import {useState, useEffect} from 'react';
import styled from "styled-components";
import axios from 'axios';
import {TOKEN} from '/MyConfig.js';
import {ReviewTile} from './reviewTile.jsx'

const ReviewsListDiv = styled.div`

  max-height: 100vh;
  overflow: auto;
  margin: 5px;
`
const ReviewsListOuterDiv = styled.div`
  margin: 10px 0;
  padding: 10px;
  width: 70%;
  border: solid;
  border-radius: 10px;
  height: fit-content;
  box-shadow:6px 6px 10px #bebebe

`
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-around;
`
const StyledCinzelLabel = styled.label`
  font-family: 'Cinzel';
  font-weight: 200;
`
const StyledCinzelSelect= styled.select`
  font-family: 'Cinzel';
  font-weight: 200;
`
const StyledOldInput= styled.input`
  font-family: 'OldStandard';
  font-size: 15px;
`
const StyledOldButton= styled.button`
  font-family: 'OldStandard';
  font-size: 15px;
`
export const ReviewsList = function ({product_id, starBarFilters}) {

  const [reviews, setReviews] = useState(null)
  const [countToRender, setcountToRender] = useState(2);
  const [moreAvailable, setmoreAvailable] = useState(false);
  const [selectedSort, setSelectedSort] = useState('relevant');
  const [searchBarTerm, setsearchBarTerm] = useState('');

  useEffect(()=> {

    axios({
      url: `http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews/?page=${1}&count=${100000}&sort=${selectedSort}&product_id=${product_id}`,
      method: 'get',
      headers: {authorization: TOKEN}
      })
      .then((val)=> {
        let filteredReviews = val.data.results.filter((review)=> {
          return review.body.indexOf(searchBarTerm) > -1 && starBarFilters[review.rating];
        });
        setmoreAvailable(filteredReviews.length > countToRender ? true : false);
        setReviews(filteredReviews.slice(0, countToRender))

      })
      .catch((err)=> {
        alert(err);
      })
  }, [starBarFilters, countToRender, selectedSort, searchBarTerm]);

  const handleSearchBar = (e)=> {
    if (e.target.value.length >=3) {
      setsearchBarTerm(e.target.value);
    } else {
      setsearchBarTerm('')
    }
  }

  if (!reviews) {
    return null;
  }
  //console.log(reviews)
  return (
    <ReviewsListOuterDiv>
      <FlexDiv>
        <StyledCinzelLabel>Sort on:
          <StyledCinzelSelect value={selectedSort} onChange={(e)=>{setSelectedSort(e.target.value)}}>
            {['relevant', 'helpful', 'newest'].map((item,index)=>{
              return <option value={item} key={index}>{item}</option>
            })}
          </StyledCinzelSelect>
        </StyledCinzelLabel>
        <StyledOldInput type="text" placeholder="Search..." onChange={handleSearchBar} ></StyledOldInput>
      </FlexDiv>
      <ReviewsListDiv>
        <div>
          {reviews.map((review, index)=> {
            return <ReviewTile key={review.review_id} review={review}/>
          })}
        </div>

        {moreAvailable && <StyledOldButton onClick={()=>{setcountToRender(countToRender + 2)}}>More Reviews</StyledOldButton>}
      </ReviewsListDiv>
    </ReviewsListOuterDiv>
  )
}