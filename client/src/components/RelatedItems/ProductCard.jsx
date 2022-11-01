import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { getProductStyles } from './parseHelpers.js';
import SmallStarBar from './SmallStarbar.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import yellowStar from '../../assets/yellow-star.png';
import sorryNoPictureAvailable from '../../assets/sorryNoPictureAvailable.png';
import ProductStore from '../Provider/Zus_Provider.jsx';
import {useRelatedItemsStore} from './RelatedItemsStore.jsx';
import cross from '../../assets/cross.png';

////////////////Styles//////////////////////////////////////
const CardStyled = styled.div`
display: flex;
flex-direction: column;
border-style: solid;
border-spacing: 20px;
margin: 2px;
padding: 0;
width: 15em;
height: 30em;
// border-radius: 30px;
box-shadow:6px 6px 10px #bebebe,
            -6px -6px 10px #ffffff;
`;


const ProductImageStyled = styled.div`
display: flex;
flex-direction: Column;
align-items: center;
justify-content: center;
flex-grow: 3;
margin: auto;
position: relative;
width: auto;
background-color: rgba(255, 255, 255, 1);
// border-radius: 30px 30px 0 0 ;

`;


const ImageStyled = styled.img`
display: flex;
align-items: center
position: relative;
width: 90%;
height: auto;
padding: 2%;
// border-radius: 10px;
`;

const ButtonStyled = styled.img`
position: absolute;
top 10px;
right: 10px;
flex: none;
width: 1.5em;
`;

const OuterDescriptionDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%
height: 5em;
bottom: 1;
padding: 0.5em 0 0.5em 0;
background-color: rgba(211, 211, 211, 0.5);
// border-radius: 30px;
`;
const Category = styled.p`
  margin-top: 0;
  margin-bottom: 0.7em;
  font-size: 0.7em;
`;

const ProductTitle = styled.h5`
  text-align: center;
  margin: 0 0 0 0;
  width: 100%;
`;

const Price = styled.p`
margin: 0.1em 0, 0.1em 0;
font-size: 0.9em;
`;



///////////////React Component///////////////////////////
const ProductCard = ({product, isStar}) => {

  const [modalIsOpen, setIsOpen] = useState(false);

  const {curProduct} = ProductStore();
  const {setCurrProdFromObject} = ProductStore();
  //***********Deal with default Image being null*************
  let defaultImage = product.styles.data.results[0].photos[0].thumbnail_url;
  if(defaultImage === null) {
    defaultImage = sorryNoPictureAvailable;
  }

  //**************Handle hover over Star**********************
  const handleOnMouseEnter = () => {
    setTimeout(setIsOpen, 200, true);
  }

  const handleOnMouseLeave = () => {
    setTimeout(setIsOpen, 200, false);
  }

  //**************Handle setting current Product on click****
  const handleCardClick = (e) => {
    if (isStar) {
      setCurrProdFromObject(product);
    }
    window.scrollTo(0,0);
  }
  //*************Handle removing product from YourOutfit********** */
  const setOutfit = useRelatedItemsStore((state) => state.setOutfit)
  const outfitList = useRelatedItemsStore.getState().outfitList;
  const onCrossClickHandler = (e) => {
    e.preventDefault();
    delete outfitList[product.data.id];
    setOutfit(outfitList);
  }

  //****************Handle Grabbing average Review*********
  const averageRating = () => {
    const reviewObject = product.reviews.data.ratings;
    let sumTotal = 0;
    let sumReviewers = 0;
    for(let key in reviewObject) {
      sumTotal += key * reviewObject[key];
      sumReviewers += Number(reviewObject[key]);
    }
    return sumTotal/sumReviewers;
  };
  const rating = averageRating();

  //************ set top right icon depending on whether its on RP or YO********** */
  const setCrossIcon = (
    <ButtonStyled src={cross}
          onClick={onCrossClickHandler}
          aria-label="remove from outfit Button"/>
  );

  const setStarIcon = (
    <ButtonStyled src={yellowStar}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          aria-label="Comparison Button"/>
  )

  return (
    <CardStyled data-testid="productCard">
      <ComparisonModal modalIsOpen={modalIsOpen} currentProduct={curProduct} comparisonProduct={product.data}/>
      <ProductImageStyled >
        <ImageStyled src={defaultImage} alt="Image of RelatedProduct" aria-label="Product Image" onClick={handleCardClick}/>
        {isStar ? setStarIcon : setCrossIcon}
      </ProductImageStyled>
      <OuterDescriptionDiv onClick={handleCardClick}>
        <SmallStarBar rating={rating}/>
        <Category>{product.data.category}</Category>
        <ProductTitle>{product.data.name}</ProductTitle>
        <Price>${product.data.default_price}</Price>
      </OuterDescriptionDiv>
    </CardStyled>
  )
}

export default ProductCard;