import * as React from 'react';
import { observer } from 'mobx-react';
import { InjectedUploadContainer } from './UploadContainer';
import styled from 'styled-components';

interface Props {
  className?: string;
}

interface State {
  nameFormat: {
    date: null | string,
    time: null | string,
    opName: null | string,
    asset: null | string,
    classification: null | string
  };
}

@observer
export class FormContainer extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      nameFormat: {
        date: null,
        time: null,
        opName: null,
        asset: null,
        classification: null
      }
    };
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="namingConvention">
          <span>
            <h4>
            {
              (this.state.nameFormat.date || 'DDTTTTZMONYY') +
              (this.state.nameFormat.time || '') + '_TGT_' +
              (this.state.nameFormat.opName || 'NAME') +
              '_ACTIVITY_' +
              (this.state.nameFormat.asset || 'ASSET') + '_' +
              (this.state.nameFormat.classification || 'CLASSIFICATION')
            }
            </h4>
          </span>
        </div>
        <form>
          <div className="form-group">
            <label>Date*</label>
            <br/>
            <input
              type="date"
              data-name="date"
              onChange={(e: any) => {
                // let value = e.target.value;
                let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                let month = months[parseInt(e.target.value.substr(5, 2), 10) - 1];
                let year = e.target.value.substr(2, 2);
                let day = e.target.value.substr(8, 2);
                let newValue: any = day + 'TTTTZ' + month + year;
                this.setState(prevState => ({
                  nameFormat: {
                    ...prevState.nameFormat,
                    date: newValue
                  },
                }));
              }}
              className="form-control bg-dark d-inline-block"
              id="dateInput"
              aria-describedby="emailHelp"
              placeholder="Select Date"
            />
          </div>
          <div className="form-group">
            <label>Operation Name*
            </label>
            <input
              data-name="opName"
              onChange={(e: any) => {
                let value = e.target.value.split(' ').join('_').toUpperCase();
                this.setState(prevState => ({
                  nameFormat: {
                    ...prevState.nameFormat,
                    opName: value
                  },
                }));
              }}
              type="text"
              className="form-control bg-dark"
              id="opInput"
              placeholder="e.g. Op Jumpshot"
            />
          </div>
          <div className="form-group">
            <label>Asset*
            </label>
            <input
              data-name="asset"
              onChange={(e: any) => {
                let value = e.target.value.split(' ').join('_').toUpperCase();
                this.setState(prevState => ({
                  nameFormat: {
                    ...prevState.nameFormat,
                    asset: value
                  },
                }));
              }}
              type="text"
              className="form-control bg-dark"
              id="assetInput"
              placeholder="Callsign"
            />
          </div>
          <div className="form-group">
            <label>Classification*
            </label>
            <input
              data-name="classification"
              onChange={(e: any) => {
                let value = e.target.value.split(' ').join('_').toUpperCase();
                this.setState(prevState => ({
                  nameFormat: {
                    ...prevState.nameFormat,
                    classification: value
                  },
                }));
              }}
              type="text"
              className="form-control bg-dark"
              id="classificationInput"
              placeholder="e.g. FVEY"
            />
          </div>
          <p>* = Required Field</p>
          <InjectedUploadContainer/>
        </form>
      </div>
    );
  }
}

export const StyledFormContainer = (styled(FormContainer)`
  color: #fff;
  margin-top: 87px;
  margin-left: 39px;
  
  input {
    width: 580px;
  }
  
  .namingConvention {
    color: #fff;
  }

  label {
    color: #fff;
  }
  
  .uploadButton {
    width: .1px;
    height: .1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .uploadContainer {
      box-sizing: border-box;
      border: 1px dashed #d4d6db;
      border-radius: 4px;
      width: 580px;
      height: 241px;
  }
  
  .clickable {
      cursor: pointer;
  }
`);
