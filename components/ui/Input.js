import { useState, useMemo, forwardRef } from 'react';
import styled from 'styled-components';
import Icon from '@/components/common/Icon';
import Text from '@/components/common/Text';
import ReactTooltip from 'react-tooltip';

const InputContainer = styled.input`
  padding: 8px 16px;
  border: 1px solid var(--${(props) => (props.isError ? 'red' : 'divider')});
  border-radius: 3px;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  color: var(--black);
  font-size: 16px;

  :focus {
    box-shadow: 0px 0px 0px 2px
      ${(props) => (props.isError ? 'rgba(242, 29, 68, 0.2)' : '#d4dced')};
  }
`;

const EyeIcon = styled(Icon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: var(--black);
  }

  &:active,
  &:focus {
    background-color: var(--black);
  }
`;

export const Tooltip = styled(ReactTooltip).attrs({
  className: 'error-tooltip',
})`
  &.error-tooltip {
    display: grid;
    grid-template-columns: 16px auto;
    grid-gap: 10px;
    padding: 16px;
    background-color: white;
    opacity: 1 !important;
    color: var(--red);
    border-radius: 5px 5px 5px 0px;
    box-shadow: 0px 4px 6px rgba(26, 32, 44, 0.1),
      0px 2px 4px rgba(26, 32, 44, 0.06) !important;
    width: ${(props) =>
      props.tooltipWidth ? `${props.tooltipWidth}px` : '168px'};
  }
`;

const InputWrapper = styled.div`
  position: relative;

  & ${InputContainer}:hover + ${EyeIcon} {
    background-color: var(--black);
  }
`;

const TextCointainer = styled(Text)`
  max-width: 112px;
  white-space: normal;
`;

const Input = forwardRef(
  ({ type, icon, tooltipMessage, className, id, ...props }, ref) => {
    const [isContentVisible, setIsContentVisible] = useState(false);

    const isPasswordType = useMemo(() => type === 'password', [type]);

    const togglePasswordVisiblity = () => {
      setIsContentVisible(!isContentVisible);
    };

    return (
      <InputWrapper className={className} data-tip data-for={id}>
        <InputContainer
          {...props}
          ref={ref}
          type={!isContentVisible && isPasswordType ? 'password' : 'text'}
        />
        {!!tooltipMessage && (
          <Tooltip place="top" id={id} arrowColor="white" effect="solid">
            <Icon className="mr-1" icon="warning" color="red" />
            <TextCointainer size="14" color="red">
              {tooltipMessage}
            </TextCointainer>
          </Tooltip>
        )}
        {isPasswordType && (
          <EyeIcon
            icon={isContentVisible ? 'open-eye' : 'hide-eye'}
            color="grey"
            onClick={togglePasswordVisiblity}
          />
        )}
      </InputWrapper>
    );
  }
);
Input.displayName = 'Input';
export default Input;
