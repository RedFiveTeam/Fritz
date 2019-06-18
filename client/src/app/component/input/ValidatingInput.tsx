import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { badInputCSS, badLabelCSS, goodCSS } from '../../../themes/default';
import { observable } from 'mobx';
import classNames = require('classnames');

interface Props {
  placeholder: string;
  listener: (e: any) => void;
  id: string;
  validator?: boolean;
  value?: string | null;
  label?: string;
  errorMessage?: string;
  defaultValue?: string;
  type?: string;
  onlyValidateOnExit?: boolean;
  className?: string;
  tabIndex?: number;
  badStyle?: any;
  reference?: any;
  keyDown?: (e: any) => void;
}

@observer
export class ValidatingInput extends React.Component<Props> {
  @observable private exited: boolean = false;

  shouldDisplayValidation(): boolean {
    if (
      !this.props.onlyValidateOnExit
      && !this.props.validator
    ) {
      return true;
    } else if (
      this.props.onlyValidateOnExit
      && this.exited
      && !this.props.validator
    ) {
      return true;
    }
    return false;
  }

  validateInput() {
    return this.shouldDisplayValidation()
      ? this.props.badStyle || badInputCSS
      : goodCSS;
  }

  validateLabel() {
    return this.shouldDisplayValidation()
      ? badLabelCSS
      : goodCSS;
  }

  renderErrorMessage() {
    if (this.shouldDisplayValidation()) {
      return (
        <div className="errorMessage">
          {this.props.errorMessage}
        </div>
      );
    }
    return;
  }

  render() {
    return (
      <div className={classNames(this.props.className, 'controlUnit')}>
        <label
          className="Label"
          style={this.validateLabel()}
        >
          {this.props.label}
        </label>
        <input
          id={this.props.id}
          type={this.props.type ? this.props.type : 'text'}
          placeholder={this.props.placeholder}
          onChange={this.props.listener}
          className="form-control"
          style={this.validateInput()}
          defaultValue={this.props.defaultValue}
          value={this.props.value ? this.props.value : ''}
          onBlur={() => this.exited = true}
          onFocus={() => this.exited = false}
          tabIndex={this.props.tabIndex ? this.props.tabIndex : 0}
          ref={this.props.reference}
          onKeyDown={this.props.keyDown}
        />
        {this.renderErrorMessage()}
      </div>
    );
  }
}

export const
  StyledValidatingInput = styled(ValidatingInput)`
  
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