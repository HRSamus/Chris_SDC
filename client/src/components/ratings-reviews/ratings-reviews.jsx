import {useState, useEffect, Fragment, useRef} from 'react';
import axios from 'axios';

import {TOKEN} from '/MyConfig.js';
import {Breakdown} from './breakdown.jsx';
import {ReviewsList} from './reviewsList.jsx'
import styled from "styled-components";
import {NewReviewForm} from './newReviewForm.jsx';
import ProductStore from "../Provider/Zus_Provider.jsx";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
  align-items: top;

`
const StylizedOuterContainer = styled.div`
  padding: 10px;
  width: 70%;
`
const StyledCinzel = styled.h2`
  font-family: 'Cinzel';
  font-weight: 200;
  text-align: center;
`
const RatingsReviews = () => {

  const {curProduct} = ProductStore();
  const isMounted = useRef(false);

  let defaultStarBarFilters = {1:true, 2:true, 3:true, 4:true, 5:true, filtered:false}
  const [starBarFilters, setstarBarFilters]  = useState(defaultStarBarFilters);
  const [metaData, setmetaData]  = useState(null);

  useEffect(()=> {
    if(isMounted.current) {
      axios({
        url: `http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/reviews/meta/?product_id=${curProduct.id}`,
        method: 'get',
        headers: {authorization: TOKEN}
        })
        .then((val)=> {
          val.data.recommended.false = val.data.recommended.false || 0;
          val.data.recommended.true = val.data.recommended.true || 0;
          setstarBarFilters(defaultStarBarFilters)
          setmetaData(val.data)
        })
        .catch((err)=> {
          alert(err);
        })
      } else {
        isMounted.current = true;
      }
  }, [curProduct]);

  if (!metaData) {
    return null;
  }
  return (
    <StylizedOuterContainer id="RatingsReviews">
      <StyledCinzel> RATINGS & REVIEWS </StyledCinzel>
      <StyledContainer>
        <Breakdown key={curProduct.id + '-' + curProduct.id} metaData={metaData} starBarFilters={starBarFilters} setstarBarFilters={setstarBarFilters}/>

        <ReviewsList key={curProduct.id} product_id={curProduct.id} starBarFilters={starBarFilters}/>
      </StyledContainer>
      <NewReviewForm key={new Date().toJSON()} setmetaData={setmetaData} characteristics={metaData.characteristics} product_id={curProduct.id} product_name={curProduct.name}/>
    </StylizedOuterContainer>
  )
}

export default RatingsReviews;