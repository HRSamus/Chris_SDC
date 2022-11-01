import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, {ThemeProvider} from "styled-components";

import GlobalFonts from './fonts/fonts.js';
import Overview from './components/ProductDetail/Overview.jsx';
import NavigationBar from "./components/NavBar/NavigationBar.jsx";
import QA from "./components/Q&A/QA.jsx";
import RelatedItems from './components/RelatedItems/RelatedItems.jsx';
import RatingsReviews from './components/ratings-reviews/ratings-reviews.jsx';
import {BGBubbles} from './components/Shapes/Shapes.jsx';
import {URL, TOKEN} from '/MyConfig.js';
import axios from 'axios';

const Sdiv = styled.div`
display: flex;
flex-direction: column;
max-width: 100%;
justify-content: center;
align-items: center;
background: white;
`

const FullDiv = styled.div`
height: 100%;
width: 100%;
`
const widgetsIDs ={
  RatingsReviews: 'RatingsReviews',
  QandA: 'QandA',
  RelatedItems: 'RelatedItems',
  ProductInfo1: 'ProductInfo',
  ProductInfo2: 'ProductInfo',
  ProductInfo3: 'ProductInfo'
};

const theme = {
  fg: "black",
  bg: "white"
}

const postInteractionsAPI = (data) => {
  const controller = new AbortController();

  axios({
    url: `${URL}/interactions` ,
    method: 'post',
    headers: {authorization: TOKEN},
    data: data,
    signal: controller.signal
  })
  .then(res=>{console.log('interactions API posted:', data)})
  .catch(err=>console.log('failed to post userclick to Interactions API'));
  controller.abort()
}

window.onclick = (e) => {
  for (let i = 0; i < e.path.length; i ++) {
    let widget = widgetsIDs[e.path[i].id]
    if (widget!= undefined) {
      postInteractionsAPI({
        element: e.target.outerHTML.replace(e.target.innerHTML, ''),
        widget: widget,
        time: new Date().toJSON()
      });
      break;
    }
  }
}

const App = () => {
  return (
    <FullDiv>
      <ThemeProvider theme={theme}>
        {/* <BGBubbles/> */}
        <GlobalFonts/>
        <NavigationBar />
        <Sdiv>
          <Overview />
          <RelatedItems />
          <QA />
          <RatingsReviews />
        </Sdiv>
      </ThemeProvider>
    </FullDiv>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
