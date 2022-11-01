import {useState, useEffect} from 'react';
import styled from "styled-components";
import {Starbar} from './starbar.jsx'
import {ProductBreakdownFactor} from './productBreakdownFactor.jsx'

const StyledProgressBar = styled.progress`
  accent-color: green;
`;

const StyledHoverable = styled.div`
  display: flex;
  flex-direction: row;
  :hover {
    background: aliceblue;
  };
  font-family: 'OldStandard';
  font-size: 15px;
`

const BreakdownDiv = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: solid;
  border-radius: 10px;
  width: 30%;
  height: fit-content;
  box-shadow:6px 6px 10px #bebebe;
`
const NoShrinkLabel = styled.label`
  flex-shrink: 0;
`
const FixedWidthLabel = styled.div`
  display: block;
  float: left;
  width: 16px;
`
const StyledPaddedDiv = styled.div`
  padding: 10% 0;
  font-family: 'OldStandard';
  font-size: 15px;
`

const StyledStarBarRatingDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: larger;
`
const StyledCinzel = styled.div`
  font-family: 'Cinzel';
  font-weight: 200;
  font-size: .9em;
  padding-top: 2%;
`
const StyledCinzelH2 = styled.h2`
  font-family: 'Cinzel';
  font-weight: 400;
  font-size: 1.125em;
`
const StyledOldStandardDiv = styled.div`
  font-family: 'OldStandard';
  font-size: 15px;
`
const StyledCinzelButton = styled.button`
  font-family: 'Cinzel';
  font-weight: 400;
  font-size: 15px;
`

export const getAvg = function(ratings) {
  let averageRating = [];
  for (var key in ratings) {
    averageRating = averageRating.concat(new Array(Number(ratings[key])).fill(Number(key)));
  }
  averageRating = averageRating.reduce((accumulator, val)=>{return accumulator + val}, 0) / averageRating.length;
  return Number(averageRating.toFixed(1));
}

export const Breakdown = function ({metaData, starBarFilters, setstarBarFilters}) {
  let avg = getAvg(metaData.ratings);
  let totalRatings = Number(metaData.recommended.false) + Number(metaData.recommended.true);

  const onClickBar = (star)=> {
    let newStarBarFilters={};
    if (!starBarFilters.filtered) {
      for (var key in starBarFilters) {
        newStarBarFilters[key] = false;
      }
      newStarBarFilters.filtered = true;
      newStarBarFilters[star] = true;
    } else {
      for (var key in starBarFilters) {
        newStarBarFilters[key] = starBarFilters[key];
      }
      newStarBarFilters[star] = newStarBarFilters[star]? false : true;
      if (newStarBarFilters[1]===false && newStarBarFilters[2]===false && newStarBarFilters[3]===false && newStarBarFilters[4]===false && newStarBarFilters[5]===false) {
        for (var key in starBarFilters) {
          newStarBarFilters[key] = true;
        }
        newStarBarFilters.filtered = false;
      }
    }
    setstarBarFilters(newStarBarFilters);
  }

  const onClickRemoveAllFilters = () => {
    let newStarBarFilters={};
    for (let i = 1; i <= 5; i ++) {
      newStarBarFilters[i] = true;
    }
    newStarBarFilters.filtered = false;
    setstarBarFilters(newStarBarFilters);
  }

  let getfilterMessage = ()=> {
    let filterMessage = [];
    if (starBarFilters.filtered) {
      for (let i = 1; i <= 5; i ++) {
        if (starBarFilters[i]) {
          filterMessage.push(i);
        }
      }
      if (filterMessage.length > 1) {
        filterMessage = filterMessage.slice(0, filterMessage.length - 1).join(', ') + ' and ' + filterMessage.slice(filterMessage.length - 1);
      } else {
        filterMessage = filterMessage[0]
      }
      filterMessage = `Filtered for ${filterMessage} star reviews`
    }
    return filterMessage.length>0? filterMessage : '';
  }

  return (
    <BreakdownDiv>
      <StyledStarBarRatingDiv>
        <Starbar rating={avg}></Starbar>
        <span>{avg}</span>
      </StyledStarBarRatingDiv>

      <StyledCinzel>{totalRatings} total reviews</StyledCinzel>
      <StyledCinzelH2> Rating Breakdown</StyledCinzelH2>
      {starBarFilters.filtered?
        <StyledOldStandardDiv>
          <header>{getfilterMessage()}</header>
          <StyledCinzelButton onClick={onClickRemoveAllFilters}>Remove All Filters</StyledCinzelButton>
        </StyledOldStandardDiv> :
        <label></label>
      }
        {['5', '4', '3', '2', '1'].map((item, index) => {
          return (
            <StyledHoverable key={index} onClick={()=> {onClickBar(item)}}>
              <NoShrinkLabel>{item + ' Stars'}</NoShrinkLabel><StyledProgressBar max={totalRatings} value={metaData.ratings[item] || 0}></StyledProgressBar><FixedWidthLabel>{metaData.ratings[item] || 0}</FixedWidthLabel>
            </StyledHoverable>
            )
        })}
      <StyledCinzel>{`${(Number(metaData.recommended.true) / (Number(metaData.recommended.true) + Number(metaData.recommended.false))).toFixed(2) * 100}% of reviews recommend this product`}</StyledCinzel>
      <StyledPaddedDiv>
        {Object.keys(metaData.characteristics).map((characteristic, index)=> {
          return <ProductBreakdownFactor key={index} characteristic={characteristic} data={metaData.characteristics[characteristic]}/>
        })}
      </StyledPaddedDiv>
    </BreakdownDiv>
  )
}
