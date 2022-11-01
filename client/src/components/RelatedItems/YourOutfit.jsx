import {useState, useEffect} from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard.jsx';
import {useRelatedItemsStore} from './RelatedItemsStore.jsx';
import plus from '../../assets/plus.png';
import ProductStore from '../Provider/Zus_Provider.jsx';
import {getProduct} from './parseHelpers.js';

const Div = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: left;
padding: 0;
`;

const CurrentProduct = styled.div`
  display: flex;
  justify-content: center;
  border-style: solid;
  align-items: center;
  align-self: center;
  width: 15em;
  height: 30em;
  //border-radius: 30px;
  box-shadow:6px 6px 10px #bebebe,
              -6px -6px 10px #ffffff;
  background-color: rgba(255, 255, 255, 1);
`;
const Image = styled.img`
  display: flex;
  align-self: center;
  width: 2em;
  height: 2em;
  margin: auto;

`;

const YourOutfit = ({data}) => {

  const setOutfit = useRelatedItemsStore((state) => state.setOutfit)
  const outfitList = useRelatedItemsStore.getState().outfitList;

  const {curProduct} = ProductStore();

  const addToOutfitHandler = (e) => {
    e.preventDefault();
    getProduct(curProduct.id).then(product => {
      outfitList[product.data.id] = product;
      setOutfit(outfitList);
    })

  }
  var outfitArray;
  if (outfitList != null) {
    outfitArray = Object.values(outfitList);
  } else {
    outfitArray=[]
  }
  // const outfitArray = Object.values(outfitList);


  return (
    <Div>
      <CurrentProduct onClick={addToOutfitHandler} >
        <Image src={plus} alt="add this Product to Outfit"/>
      </CurrentProduct>
      {outfitArray.map((product, index) => {
        return <ProductCard product={product} key={product.data.id} isStar={false}/>
      })}
    </Div>
  )
};


export default YourOutfit;