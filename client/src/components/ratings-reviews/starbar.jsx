import Star from '../../assets/YellowStar/emptyStar.png';
import quarterStar from '../../assets/YellowStar/1Star.png';
import halfStar from '../../assets/YellowStar/halfStar.png';
import threefourthsStar from '../../assets/YellowStar/3Star.png';
import fullstar from '../../assets/YellowStar/yellowStar.png';

export const Starbar = function ({rating}) {


  rating = ((rating / .25).toFixed(0)) * .25;
  const ratingsArray = new Array(Math.floor(rating)).fill(fullstar);
  rating = rating - Math.floor(rating);

  if (rating === .75) {
    ratingsArray.push(threefourthsStar)
  } else if (rating === .5) {
    ratingsArray.push(halfStar)
  } else if (rating === .25) {
    ratingsArray.push(quarterStar)
  }
  while (ratingsArray.length < 5) {
    ratingsArray.push(Star)
  }

  return (
    <div>
      {ratingsArray.map((item, index)=> {
        return <img key={index} src={item} width="23px" height="23px"></img>
      })}
    </div>
  )
}