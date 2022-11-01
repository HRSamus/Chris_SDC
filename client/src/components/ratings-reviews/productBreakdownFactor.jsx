import styled from "styled-components";


const StyledCharacteristicBar = styled.div`
  border-style: solid;
  background-color: LightGray;
`;

const StyledIcon = styled.i`
  position: relative;
  left: ${props=> props.position};
`;

const StyledFlexbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: smaller;
`;

const StyledPadDiv = styled.div`
  padding: 2% 0;
`

export const ProductBreakdownFactor = ({characteristic, data})=> {

  let iconPosition = ((Number(data.value) / 5) * 100).toFixed(2);
  iconPosition = iconPosition > 93? '93%': `${iconPosition}%`;
  const range = {
    Size: ['Too small', 'Perfect', 'Too large'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Comfort: ['Uncomfortable', 'Perfect'],
    Quality: ['Poor', 'Perfect'],
    Length: ['Runs short', 'Perfect', 'Runs long'],
    Fit: ['Runs tight', 'Perfect', 'Runs long']
  };

  return (
  <StyledPadDiv>
    <header>{characteristic}</header>
    <StyledCharacteristicBar><StyledIcon position={iconPosition}>▼</StyledIcon></StyledCharacteristicBar>
    <StyledFlexbox>{range[characteristic].map((item, index)=> (<div key={index}>{item}</div>))}</StyledFlexbox>
  </StyledPadDiv>
  )
}