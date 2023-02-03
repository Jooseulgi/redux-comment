import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
    box-sizing: border-box;
  }

  #root {
    min-height: 100vh;
    padding:30px;
    background:#ececf9;
  }
`;

export default GlobalStyle;
