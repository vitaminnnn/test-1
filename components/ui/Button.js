import styled from 'styled-components';

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 24px;

  border: 1px solid var(--yellow);
  border-radius: 3px;

  font-weight: 400;
  font-size: 14px;
  line-height: 140%;

  min-height: 36px;
  width: ${(props) => (props.block ? '100%' : 'fit-content')};
  min-width: ${(props) => (props.minWidth ? `${props.minWidth}px` : 'initial')};

  color: var(--black);
  background-color: ${(props) =>
    props.filled ? 'var(--yellow)' : 'transparent'};

  &.fb {
    color: var(--white);
    background-color: var(--blue-dark);
    border-color: var(--blue-dark);
    justify-content: left;
    gap: 10px;

    :hover {
      background-color: #71a0d4;
      border-color: #71a0d4;
    }

    :active {
      background-color: #4e6c8e;
      border-color: #4e6c8e;
    }
  }

  &.google {
    color: var(--grey);
    background-color: var(--white);
    border-color: var(--blue-dark);
    justify-content: left;
    gap: 10px;

    :hover {
      background-color: #71a0d4;
      border-color: #71a0d4;
    }

    :active {
      background-color: #4e6c8e;
      border-color: #4e6c8e;
    }
  }

  :hover {
    background-color: ${(props) => (props.filled ? '#FFDA58' : '#FFF5DE')};
    border-color: ${(props) => (props.filled ? '#FFDA58' : '#FFB822')};
  }

  :active {
    background-color: ${(props) => (props.filled ? '#F4D48A' : '#F4C20E')};
    border-color: ${(props) => (props.filled ? '#F4D48A' : '#FFB822')};
  }

  :disabled {
    color: #c4c4c4;
    border-color: #c4c4c4;
    background-color: ${(props) => (props.filled ? '#ECECEC' : 'transparent')};
  }
`;
const Loading = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;

  :after {
    content: ' ';
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #fff;
    border-color: ${(props) =>
      props.filled
        ? 'var(--white) transparent var(--white) transparent'
        : 'var(--yellow) transparent var(--yellow) transparent'};
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Button = ({ children, isLoading, ...props }) => {
  return <Btn {...props}>{isLoading ? <Loading {...props} /> : children}</Btn>;
};

export default Button;
