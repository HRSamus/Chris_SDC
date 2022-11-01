import {useState, useEffect, useRef} from 'react';
import ProductCard from './ProductCard.jsx';
import styled from 'styled-components';

const Div = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: left;
padding: 0;
`;

const RelatedProducts = ({data}) => {

  let uniqueData = {};
  data.forEach(item => {
    uniqueData[item.data.id] = item;
  })
  const uniqueDataArray = Object.values(uniqueData);


  return (
    <Div>
      {uniqueDataArray.map((product, index) => {
        return <ProductCard product={product} key={product.data.id} isStar={true}/>
      })}
    </Div>
  )
};

export default RelatedProducts;