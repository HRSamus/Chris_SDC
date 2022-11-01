import React, {useState, useEffect} from 'react';
import checkMark from '../../assets/checkMark.png';
import cross from '../../assets/cross.png';


const Feature = ({currentProductFeatures, comparisonProductFeatures, feature}) => {

  const existsInCurrent = currentProductFeatures.includes(feature);
  const existsInComparison = comparisonProductFeatures.includes(feature);
  feature.value = feature.value === null ? '' : feature.value;
  feature.feature = feature.feature === null ? '' : feature.feature;

  return (

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <img src={existsInCurrent ? checkMark : cross }style={{
              display: 'flex',
              alignSelf: 'center',
              height: "1em",
              width: "1em"
            }}/>

      <p>{feature.value + ' ' + feature.feature}</p>

      <img src={existsInComparison ? checkMark : cross }style={{
              display: 'flex',
              alignSelf: 'center',
              height: "1em",
              width: "1em"
            }}/>
    </div>

  )
}
export default Feature;