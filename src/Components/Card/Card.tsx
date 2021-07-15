import React from 'react';
import styled from 'styled-components';

const Card: React.FC<{ cardName: string }> = (props) => {
  return (
    <CardStyle>
      <p>{props.cardName}</p>
    </CardStyle>
  );
};
const CardStyle = styled.div`
  width: 150px;
  height: 60px;
  background: white;
  margin-left: 35px;
`;
export default Card;
