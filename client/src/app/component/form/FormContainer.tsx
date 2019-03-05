import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { InjectedUploadContainer } from './UploadContainer';
import styled from 'styled-components';
import { SlidesActions } from '../slides/SlidesActions';
import { SlidesStore } from '../slides/SlidesStore';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  slidesActions?: SlidesActions;
  slidesStore?: SlidesStore;
}

@observer
export class FormContainer extends React.Component<Props> {

  badInputCSS: CSSProperties = {
    border: '1px solid #e46373'
  };

  badLabelCSS: CSSProperties = {
    color: '#e46373'
  };

  goodCSS: CSSProperties = {
  };

  render() {
    return (
      <div
        className={this.props.className}
      >
        <form>
          <div className="form-group">
            <label
              style={(this.props.slidesStore!.validate && !this.props.slidesStore!.isValidDate()) ?
                this.badLabelCSS : this.goodCSS}
            >
              Date*
            </label>
            <br/>
            <input
              type="date"
              data-name="date"
              onChange={(e: any) => {
                let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                let month = months[parseInt(e.target.value.substr(5, 2), 10) - 1];
                let year = e.target.value.substr(2, 2);
                let day = e.target.value.substr(8, 2);
                let newValue: any = day + 'TTTTZ' + month + year;
                if (month === undefined || year === undefined || day === undefined) {
                  this.props.slidesActions!.setAndUpdateDate(null);
                } else {
                  this.props.slidesActions!.setAndUpdateDate(newValue);
                }
              }}
              className="form-control"
              id="dateInput"
              placeholder="Select Date"
              style={(this.props.slidesStore!.validate && !this.props.slidesStore!.isValidDate()) ?
                this.badInputCSS : this.goodCSS}
            />
            {
              this.props.slidesStore!.validate &&
              !this.props.slidesStore!.isValidDate() &&
              <div className="errorText">Field cannot be empty</div>
            }
          </div>
          <div className="form-group">
            <label
              style={(this.props.slidesStore!.validate && !this.props.slidesStore!.isValidOpName()) ?
                this.badLabelCSS : this.goodCSS}
            >
              Operation Name*
            </label>
            <input
              data-name="opName"
              onChange={(e: any) => {
                // console.log(FormContainer.validate);
                // console.log(this.props.slidesStore!.asset);
                // console.log(this.props.slidesStore!.asset!.length);
                this.props.slidesActions!.setAndUpdateOpName(e.target.value);
              }}
              type="text"
              className="form-control"
              id="opInput"
              placeholder="e.g. Op Jumpshot"
              style={(this.props.slidesStore!.validate && !this.props.slidesStore!.isValidOpName()) ?
                this.badInputCSS : this.goodCSS}
            />
            {
              this.props.slidesStore!.validate &&
              !this.props.slidesStore!.isValidOpName() &&
                <div className="errorText">Field cannot be empty</div>
            }
          </div>
          <div className="form-group">
            <label
              style={(this.props.slidesStore!.validate && !this.props.slidesStore!.isValidAsset()) ?
                this.badLabelCSS : this.goodCSS}
            >
              Asset*
            </label>
            <input
              data-name="asset"
              onChange={(e: any) => {
                this.props.slidesActions!.setAndUpdateAsset(e.target.value);
              }}
              type="text"
              className="form-control"
              id="assetInput"
              placeholder="Callsign"
              style={(this.props.slidesStore!.validate && !this.props.slidesStore!.isValidAsset()) ?
                this.badInputCSS : this.goodCSS}
            />
            {
              this.props.slidesStore!.validate &&
              !this.props.slidesStore!.isValidAsset() &&
              <div className="errorText">Field cannot be empty</div>
            }
          </div>
          <div className="form-group">
            <label
              style={(this.props.slidesStore!.validate && !this.props.slidesStore!.isValidClassification()) ?
                this.badLabelCSS : this.goodCSS}
            >
              Classification*
            </label>
            <input
              data-name="classification"
              onChange={(e: any) => {
                this.props.slidesActions!.setAndUpdateClassification(e.target.value);
              }}
              type="text"
              className="form-control "
              id="classificationInput"
              placeholder="e.g. FVEY"
              style={(this.props.slidesStore!.validate && !this.props.slidesStore!.isValidClassification()) ?
                this.badInputCSS : this.goodCSS}
            />
            {
              this.props.slidesStore!.validate &&
              !this.props.slidesStore!.isValidClassification() &&
              <div className="errorText">Field cannot be empty</div>
            }
          </div>
          <p>* = Required Field</p>
          <InjectedUploadContainer/>
        </form>
      </div>
    );
  }
}

export const StyledFormContainer = inject('slidesActions', 'slidesStore')(styled(FormContainer)`
  color: #fff;
  margin-top: 87px;
  margin-left: 39px;
  
  input {
    width: 580px;
    color: #fff;
    background-color:rgba(0, 0, 0, 0);
  }
  
  input:focus {
    background-color:rgba(0, 0, 0, 0);
    color: #fff;
    border: #15deec solid 1px;
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
  
  .form-group {
    margin-bottom: 25px;
  }
  
  .errorText {
    position: absolute;
    color: #e46373;
  }
`);
