import React from "react"
import styled from 'styled-components';

const StyledPopUp = styled.div<{isOpen:boolean}>`
  position: fixed;
  width: 100vw;
  height:100vh;
  background: rgba(0,0,0,0.3);
  top:0;
  left:0;
  display: ${({isOpen}) => isOpen ? 'block' : 'none'};
  div{
    width: 350px;
    height: 250px;
    background: white;
  }
`
const PopUpForAuthor:React.FC<{isOpen:boolean}> = (props) =>{
    console.log(props.isOpen)
    return(
        <StyledPopUp isOpen={props.isOpen} />
    )
};
export default PopUpForAuthor