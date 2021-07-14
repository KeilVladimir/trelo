import React, { useState } from 'react';
import styled from 'styled-components';

const StyledPopUp = styled.div<{ isOpen: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};

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

const PopUpForAuthor: React.FC<{
  SetStateInLocal(key: string, state: string);
}> = (props) => {
  let ops;
  if (localStorage.getItem('AuthorName') === null) {
    ops = true;
  }
  const [open, SetOpen] = useState<boolean>(ops);
  const AuthorNameKey = 'AuthorName';
  let AuthorName = '';

  return (
    <StyledPopUp isOpen={open}>
      <div>
        <h3>Здравствуйте, введите свое имя</h3>
        <input
          onChange={(event) => {
            AuthorName = event.target.value;
          }}
          type="text"
          placeholder="Введите имя"
        />
        <button
          onClick={() => {
            props.SetStateInLocal(AuthorNameKey, AuthorName);
            SetOpen(!open);
          }}>
          Ввести имя
        </button>
      </div>
    </StyledPopUp>
  );
};
export default PopUpForAuthor;
