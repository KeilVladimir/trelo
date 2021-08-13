import React from 'react';
import { Board } from './Components/Board';

import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #0079bf;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <Global />
      <Board />
    </>
  );
};
export default App;
