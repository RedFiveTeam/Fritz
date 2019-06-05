import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { badLabelCSS, badReleasabilityCSS, goodCSS } from '../../../themes/default';
import { StyledDropdown } from './Dropdown';
import classNames = require('classnames');

interface Props {
  validator: boolean;
  options: string[];
  defaultValue: string;
  value: string;
  callback: (s: any) => void;
  id?: string;
  label?: string;
  errorMessage?: string;
  className?: string;
}

@observer
export class ValidatingDropdown extends React.Component<Props> {
  render() {
    return (
      <div className={classNames(this.props.className, 'controlUnit')}>
        <label
          className="Label"
          style={
            this.props.validator
              ? goodCSS
              : badLabelCSS
          }
        >
          {this.props.label}
        </label>
        <StyledDropdown
          options={this.props.options}
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          callback={this.props.callback}
          id={this.props.id ? this.props.id : ''}
          validator={this.props.validator ? goodCSS : badReleasabilityCSS}
        />
        {
          !this.props.validator &&
          <div className="errorMessage">
            {this.props.errorMessage}
          </div>
        }
      </div>
    );
  }
}

export const StyledValidatingDropdown = styled(ValidatingDropdown)`
  width: 100%;
  display: block;

  label {
    width: 100%;
  }
 
 .errorMessage {
    position: absolute;
    color: #e46373;
  }
`;