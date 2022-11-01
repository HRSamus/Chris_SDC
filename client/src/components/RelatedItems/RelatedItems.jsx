import React, {useState, useEffect, useRef} from 'react';
import getProducts from './parseHelpers.js';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import styled from 'styled-components';
import Carousel from './Carousel.jsx';
import {getRelatedProducts} from './parseHelpers.js';
import {useRelatedItemsStore} from './RelatedItemsStore.jsx';
import ProductStore from '../Provider/Zus_Provider.jsx';
import {H2} from '../ProductDetail/StyleCart.jsx';

const Title = styled.h1`

`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;
const MasterDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
  width: 65em;
  border-spacing: 0.5%;
  margin: 0;
  padding: 0;
  line-height: 0.8;
`;
const H = styled(H2)`
  text-align: center;
`;

const RelatedItems = () => {

  const setRelatedItems = useRelatedItemsStore(state => state.setRelatedItems);
  const getOutfitFromLocalStorage = useRelatedItemsStore(state => state.getOutfitFromLocalStorage);
  const {curProduct} = ProductStore();
  const isMounted = useRef(false);

  useEffect(() => {
    if(isMounted.current) {
      getRelatedProducts(curProduct.id).then(items => {
        setRelatedItems(items);
        return
      }).then(() => {
        getOutfitFromLocalStorage();
      })
    } else {
      isMounted.current = true;
    }
  }, [curProduct])
  const { relatedItemsList, outfitList} = useRelatedItemsStore();

  if (isMounted) {
    return (
      <Div id="RelatedItems">
        <H>Related Products</H>
        <MasterDiv>
          <Carousel data={relatedItemsList} title="Related Products"><RelatedProducts/></Carousel>
        </MasterDiv>
        <H>Your Outfit</H>
        <MasterDiv>
          <Carousel data={outfitList} title="Your Outfit"><YourOutfit/></Carousel>
        </MasterDiv>
      </Div>

    )
  } else {
    return <div>loading...</div>
  }
}

export default RelatedItems;