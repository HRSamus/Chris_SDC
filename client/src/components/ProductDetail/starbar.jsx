import styled from "styled-components";

import quarterStar from '../../assets/YellowStar/1Star.png';
import halfStar from '../../assets/YellowStar/halfStar.png';
import threefourthsStar from '../../assets/YellowStar/3Star.png';
import Star from '../../assets/YellowStar/yellowStar.png';
import emptyStar from '../../assets/YellowStar/emptyStar.png';



const ImgS = styled.img`
height: 20px;
width: 20px;
`

//From Ben Tanaka
const Starbar = function ({rating}) {

  const ratingsArray = new Array(Math.floor(rating)).fill(Star);
  rating = rating - Math.floor(rating);

  if (rating === .75) {
    ratingsArray.push(threefourthsStar)
  } else if (rating === .5) {
    ratingsArray.push(halfStar)
  } else if (rating === .25) {
    ratingsArray.push(quarterStar)
  }
  while (ratingsArray.length < 5) {
    ratingsArray.push(emptyStar)
  }

  return (
    <div>
      {ratingsArray.map((item, index)=> {
        return (
          <ImgS key={index} src={item} />
        )
      })}
    </div>
  )
}

export default Starbar;


