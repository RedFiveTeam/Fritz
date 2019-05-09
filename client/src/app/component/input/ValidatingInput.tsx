import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { badInputCSS, badLabelCSS, goodCSS } from '../../../themes/default';
import classNames = require('classnames');

interface Props {
  label: string;
  placeholder: string;
  listener: (e: any) => void;
  id: string;
  validator: boolean;
  value?: string | null;
  errorMessage?: string;
  defaultValue?: string;
  className?: string;
  type?: string;
}

@observer
export class ValidatingInput extends React.Component<Props> {
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
        <input
          id={this.props.id}
          type={this.props.type ? this.props.type : 'text'}
          placeholder={this.props.placeholder}
          onChange={this.props.listener}
          className="form-control"
          style={
            this.props.validator
              ? goodCSS
              : badInputCSS
          }
          defaultValue={this.props.defaultValue}
          value={this.props.value ? this.props.value : ''}
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

export const StyledValidatingInput = styled(ValidatingInput)`
  
  label {
    color: #fff;
  }
  
  input {
    width: 100%;
    color: #fff;
    background-color:rgba(0, 0, 0, 0);
  }
  
  input:focus {
    background-color:rgba(0, 0, 0, 0);
    color: #fff;
    border: #15deec solid 1px;
  }
  
  .errorMessage {
  position: absolute;
  color: #e46373;
  }


`;