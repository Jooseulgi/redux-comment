import { FiLoader } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';

function Spinner() {
  return (
    <SpinnerWrap>
      <FiLoader />
    </SpinnerWrap>
  );
}

export default Spinner;

const rotation = keyframes`
   from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`;

const SpinnerWrap = styled.div`
  svg {
    font-size: 30px;
    color: #2e2ef0;
    animation: ${rotation} 2s linear infinite;
  }
`;
