import * as React from 'react';
import { CSSProperties } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlidesActions } from '../slides/actions/SlidesActions';
import { SlidesStore } from '../slides/SlidesStore';
import { ReleasabilityModel } from '../unicorn/model/ReleasabilityModel';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { UnicornActions } from '../unicorn/actions/UnicornActions';
import { StyledDropdown } from '../dropdown/Dropdown';
import { UploadActions } from './upload/actions/UploadActions';
import * as ReactDOM from 'react-dom';

interface Props {
  className?: string;
  slidesActions?: SlidesActions;
  slidesStore?: SlidesStore;
  unicornStore?: UnicornStore;
  unicornActions?: UnicornActions;
  uploadActions?: UploadActions;
}

@observer
export class FormContainer extends React.Component<Props> {

  badInputCSS: CSSProperties = {
    border: '1px solid #e46373'
  };

  badLabelCSS: CSSProperties = {
    color: '#e46373'
  };

  goodCSS: CSSProperties = {};

  changeReleasabilityColor() {
    let dropdownText = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('.default') as HTMLElement;
    if (dropdownText) {
      dropdownText.style.opacity = '1';
    }
  }

  async componentDidMount() {
    await this.props.unicornActions!.getReleasabilities();
  }

  render() {

    return (
      <div
        className={this.props.className}
      >
        <form>
          <div className="form-group">
            <div className="header">
              <h2>JPEG Renamer - Details
              </h2>
              <span>Complete the fields below to view and download JPEGs</span>
            </div>
            <label
              style={(this.props.slidesStore!.validate && !this.props.slidesStore!.isValidDate()) ?
                this.badLabelCSS : this.goodCSS}
            >
              Date
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
                if (month === undefined || year === undefined || day === undefined) {
                  this.props.slidesActions!.setAndUpdateDate(null, null, null);
                } else {
                  this.props.slidesActions!.setAndUpdateDate(month, year, day);
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
              <div className="errorText">Field must be in the correct format</div>
            }
          </div>
          <div className="form-group">
            <label
              style={(this.props.slidesStore!.validate && !this.props.slidesStore!.isValidOpName()) ?
                this.badLabelCSS : this.goodCSS}
            >
              Operation Name
            </label>
            <input
              data-name="opName"
              onChange={(e: any) => {
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
              style={(this.props.slidesStore!.differentAsset) ?
                this.badLabelCSS : this.goodCSS}
            >
              Callsign
            </label>
            <input
              data-name="asset"
              onBlur={(e: any) => {
                this.props.uploadActions!.setCallsignInput(e.target.value);
              }}
              onChange={(e: any) => {
                this.props.slidesActions!.setAndUpdateAsset(e.target.value);
              }}
              type="text"
              className="form-control"
              id="assetInput"
              placeholder="Callsign"
              style={(this.props.slidesStore!.differentAsset) ?
                this.badInputCSS : this.goodCSS}
            />
            {
              this.props.slidesStore!.validate &&
              !this.props.slidesStore!.isValidAsset() &&
              <div className="errorText">Field cannot be empty</div>
            }
            {
              this.props.slidesStore!.differentAsset &&
              <div className="errorText">Mismatch Callsign</div>
            }
          </div>
          <div
            id="classGroup"
            className="form-group"
          >
            <label
              id="classLabel"
              style={this.goodCSS}
            >
              Classification
            </label>
            <input
              id="classificationInput"
              data-name="classification"
              onChange={(e: any) => {
                this.props.slidesActions!.setAndUpdateClassification(e.target.value);
              }}
              defaultValue="Secret"
              type="text"
              className="form-control "
              placeholder="e.g. Secret"
              style={this.goodCSS}
            />
          </div>
          <div className="form-group">
            <label
              id="releaseLabel"
              style={(this.props.slidesStore!.validate && !this.props.slidesStore!.isValidReleasability()) ?
                this.badLabelCSS : this.goodCSS}
            >
              Releasability
            </label>
            <StyledDropdown
              options={
                this.props.unicornStore!.releasabilities.map((e: ReleasabilityModel) => {
                  return e.releasabilityName;
                })}
              defaultValue={this.props.slidesStore!.releasability ? this.props.slidesStore!.releasability : 'Select'}
              callback={(r: string) => {
                this.props.slidesActions!.setAndUpdateReleasability(r);
                this.changeReleasabilityColor();
              }}
            />
            {
              this.props.slidesStore!.validate &&
              !this.props.slidesStore!.isValidReleasability() &&
              <div className="RerrorText">Field cannot be empty</div>
            }
          </div>
          <p className="helpMessage">
            To save as PDF in Powerpoint File > Export > Create PDF/XPS Document
          </p>
        </form>
      </div>
    );
  }
}

export const StyledFormContainer = inject(
  'slidesActions', 'slidesStore', 'unicornStore', 'unicornActions', 'uploadActions'
)
(styled(FormContainer)`
  color: #fff;
  margin-top: 45px;
  margin-left: 50px;
  
  #folderIcon {
    margin-bottom: 25px;
  }
  
  span {
    font-size: 16px;
    color: #D8E5FF;
  }
  
  form {
    position: relative;
    bottom: 2px;
  }
  
  .leftText {
    position: relative;
    display: block;
    transform: translate(0%, -50%);
    line-height: 12px;
  }
  
  h2 {
    font-size: 24px;
  }
  
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
  
  .filename {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 390px;
    overflow: hidden;
  }

  label {
    color: #fff;
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
  
  .RerrorText {
    position: relative;
    color: #e46373; 
    left: 300px;
    top: 20px;
  }
  .header {
    position: relative;
    margin-bottom: 10px;
  }
  
  .header > span {
    color: rgb(216, 229, 255);
    margin-bottom: 5px;
    font-size: 16px;
  }
  
  .header > h2 {
    line-height: 0.7;
    font-size: 24px;
  }
  
  .helpMessage {
    color: rgb(216, 229, 255);
  }
  
  #pdfFileName {
    text-overflow: ellipsis;
    width: 390px;
    overflow: hidden;
    white-space: nowrap;
  }
  
  .helpMenuIcon {
    margin-left: 10px;
    padding-bottom: 1px;
    cursor: pointer;
  }
  
  #releaseLabel {
    margin-left: 300px;
    position: relative;
    bottom: 24px;
  }
  
  #classificationInput {
    width: 280px;
  }
  
  #classGroup {
    position: absolute;
  }
  
  .dropdown {
    color: #fff;
    background-color:rgba(0, 0, 0, 0);
    top: 31px;
    right: 94px;
    height: 39px;
    width: 280px;
    border: 1px solid #ced4da;
    font-weight: normal;
    font-size: 1rem;
      .dropdownBtn {
        font-weight: normal;
        font-size: 1rem;
        text-align: left;
        padding-left: 24px;
        line-height: 40px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    
      .dd {
        width: 280px;
        left: 0;
        overflow: auto;
        max-height: 250px;
      }
      
      .ddd {
        text-align: left;
        padding-left: 8px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
  }
  
  .default {
    color: #FFF;
    opacity: 0.4;
  }
`);
