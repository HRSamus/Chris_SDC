import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useRelatedItemsStore} from './RelatedItemsStore.jsx';

const CarouselStyled = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  width: 65em;
  position: relative;
  padding: 1em;
  left: -4.5em;
  overflow: hidden;
  margin-left: auto;
`;

const CarouselControl = styled.button`
  z-index: 9;
  position: sticky;
  background-color: rgba(0, 0, 0, 0.5);
  //border-radius: 20%;
  font-size: 1.5rem;
  height: 2em;
  top: 45%;
  color: rgba(255, 255, 255, 0.5);

  &:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(0, 0, 0, 0.5);
  }`;

  const CarouselControlPrev = styled(CarouselControl)`
  width: 2em;
  left: 2.5em;
  `;
  const HiddenControlPrev = styled(CarouselControl)`
  left: 2em;
  opacity: 0;
  display: flex;
  width: 1.9em;
  align-self: start;

  &:hover {
    opacity: 0;
  }
  `;

  const CarouselControlNext = styled(CarouselControl)`
  left: 96.5%;
  `;
  const HiddenControlNext = styled(CarouselControl)`
  left: 96.5%;
  opacity: 0;
  display: flex;
  align-self: end;

  &:hover {
    opacity: 0;
  }
  `;

const MDiv = styled.div`
  height: 100%;
  max-width: 52em;
`;

const Carousel = (props) => {



  const [showPrevious, setShowPrevious] = useState(false); //Change these both
  const [showNext, setShowNext] = useState(false);         //to false


  const { relatedItemsList, outfitList} = useRelatedItemsStore();
  // console.log(outfitList)

  var outfitListKeys;
  if (outfitList != null) {
    outfitListKeys = Object.keys(outfitList);
  } else {
    outfitListKeys=[]
  }

  let componentBeingRendered = props.title;
  let nOfCards = props.title === 'Related Products' ? relatedItemsList.length : outfitListKeys.length;
  const [currentCard, setCurrentCard] = useState(0);


  useEffect(() => {
    //set Number of Cards on list Render
    nOfCards = props.title === 'Related Products' ? relatedItemsList.length : outfitListKeys.length;
    let startingCard = props.title === 'Related Products' ? 4 : 3;
    //set Whether to show next button on itemsRender
    if( nOfCards > startingCard) {
      setShowNext(true);
    } else {
      setShowNext(false);
    }
    //set Number of cards
    if (nOfCards > startingCard) {
      setCurrentCard(startingCard);
    }
  }, [outfitList, relatedItemsList])

  //scroll Component
  const slide = (e, shift) => {
    const parent = e.target.parentNode;
    const cardLength = e.target.parentElement.children[2].children[0].offsetWidth;
    const howCloseToEnd = parent.offsetWidth + parent.scrollLeft - parent.scrollWidth;
    //scroll component
    e.target.parentNode.scrollLeft += (cardLength * shift) + (cardLength * 0.05 * shift);
    //set currentCard
    if (shift > 0) {
      setCurrentCard(currentCard + 1);
    } else if (shift < 0) {
      setCurrentCard(currentCard - 1);
    }
  }

  //update next and previous buttons on card change
  useEffect(() => {
    if (currentCard === nOfCards) {
      setShowNext(false);
    } else if (currentCard < nOfCards && nOfCards > 4 && componentBeingRendered === 'Related Products' ||
              currentCard < nOfCards && nOfCards > 3 && componentBeingRendered === 'Your Outfit') {
                setShowNext(true);
              }
    if(currentCard > 4 && componentBeingRendered === 'Related Products' ||
      currentCard > 3 && componentBeingRendered === 'Your Outfit') {
        setShowPrevious(true);
    } else {
      setShowPrevious(false);
    }
  }, [currentCard])

  if (nOfCards === 0 && props.title === 'Related Products') {
    return (
      <div>
        <p>Sorry, there are no products in this view</p>
      </div>
    )
  }
  return (
    <>
    <MDiv>
    <CarouselStyled aria-label="Product Carousel">
      {showPrevious ? <CarouselControlPrev data-testid="prevControl" onClick={(e)=> slide(e, -1)}>&#60;</CarouselControlPrev> : <HiddenControlPrev></HiddenControlPrev> }
      {showNext ? <CarouselControlNext data-testid="nextControl" onClick={(e)=> slide(e, 1)}>&#62;</CarouselControlNext> : <HiddenControlNext></HiddenControlNext> }
      {React.cloneElement(props.children, {data: props.data}, null)}
    </CarouselStyled>
    </MDiv>
    </>
  )
}

export default Carousel;