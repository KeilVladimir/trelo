import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Local } from '../../services/localStorage';
const PopUpForAuthor: React.FC<{
  setIsOpen: (isOpen: boolean) => void;
}> = (props) => {
  let authorName = '';
  useEffect(() => {
    console.log('render');
  }, []);
  return (
    <StyledPopUp>
      <div>
        <h3>Здравствуйте, введите свое имя</h3>
        <input
          onChange={(event) => {
            authorName = JSON.stringify(event.target.value);
          }}
          type="text"
          placeholder="Введите имя"
        />
        <button
          onClick={() => {
            Local.setInLocalAuthor(authorName);
            props.setIsOpen(false);
          }}>
          Ввести имя
        </button>
      </div>
    </StyledPopUp>
  );
};
const StyledPopUp = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  display: block;

  div {
    position: absolute;
    margin-left: 36%;
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 30px;
  }

  input {
    width: 150px;
    height: 35px;
    margin-bottom: 30px;
  }

  button {
    width: 80px;
    height: auto;
    color: white;
    background: rgb(0, 121, 191);
  }

  h3 {
    color: black;
  }
`;
export default PopUpForAuthor;
