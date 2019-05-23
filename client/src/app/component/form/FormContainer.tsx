import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlidesActions } from '../slides/actions/SlidesActions';
import { SlidesStore } from '../slides/store/SlidesStore';
import { ReleasabilityModel } from '../unicorn/model/ReleasabilityModel';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { UnicornActions } from '../unicorn/actions/UnicornActions';
import { UploadActions } from './upload/actions/UploadActions';
import { StyledValidatingInput } from '../input/ValidatingInput';
import { StyledValidatingDropdown } from '../dropdown/ValidatingDropdown';

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

  static changeReleasabilityColor() {
    let dropdownText = (document.querySelector('.form-group') as HTMLElement).querySelector('.default') as HTMLElement;
    if (dropdownText) {
      dropdownText.style.opacity = '1';
    }
  }

  render() {
    let {slidesStore} = this.props;

    return (
      <div
        className={this.props.className}
      >
        <div className="header">
          <h2>JPEG Renamer - Details
          </h2>
          <span>Complete the fields below to view and download JPEGs</span>
        </div>
        <form>
          <div className="form-group">
            <StyledValidatingInput
              label={'Date'}
              placeholder={'Select Date'}
              listener={this.props.slidesActions!.setDateFromInput}
              errorMessage={slidesStore!.errorMessages[0]}
              id={'dateInput'}
              validator={slidesStore!.isValidDate}
              type={'date'}
              value={slidesStore!.fullDate ? slidesStore!.fullDate : 'mm/dd/yyyy'}
            />
            <StyledValidatingInput
              label={'Operation Name'}
              placeholder={'e.g. Op Jumpshot'}
              listener={this.props.slidesActions!.setAndUpdateOpName}
              errorMessage={slidesStore!.errorMessages[1]}
              id={'opInput'}
              validator={slidesStore!.isValidOpName}
              value={slidesStore!.opName}
            />
            <StyledValidatingInput
              label={'Callsign'}
              placeholder={'Callsign'}
              listener={this.props.slidesActions!.setAndUpdateAsset}
              errorMessage={
                slidesStore!.differentAsset ? slidesStore!.errorMessages[3] : slidesStore!.errorMessages[2]
              }
              id={'assetInput'}
              validator={slidesStore!.isValidAsset}
              value={slidesStore!.asset}
            />
            <div className="splitControl sC1">
              <StyledValidatingInput
                label={'Classification'}
                placeholder={'e.g. Secret'}
                listener={this.props.slidesActions!.setAndUpdateClassification}
                id={'classificationInput'}
                validator={true}
                value={'Secret'}
              />
            </div>
            <div className="splitControl sC2">
              {
                !this.props.unicornStore!.offline &&
                <StyledValidatingDropdown
                  label={'Releasability'}
                  validator={slidesStore!.isValidReleasability}
                  options={this.props.unicornStore!.releasabilities.map((e: ReleasabilityModel) => {
                    return e.releasabilityName;
                  })}
                  defaultValue={'Select'}
                  value={slidesStore!.releasability}
                  id="releasabilityDropdown"
                  callback={(r: string) => {
                    this.props.slidesActions!.setAndUpdateReleasability(r);
                    FormContainer.changeReleasabilityColor();
                  }}
                  errorMessage={'The releasability field must be chosen'}
                />
              }
              {
                this.props.unicornStore!.offline &&
                  <StyledValidatingInput
                      label={'Releasability'}
                      placeholder={'e.g. FOUO'}
                      listener={this.props.slidesActions!.setAndUpdateCustomReleasability}
                      id={'releasabilityInput'}
                      validator={slidesStore!.isValidReleasability}
                      value={slidesStore!.releasability}
                      errorMessage={'The releasability field must be chosen'}
                  />
              }
            </div>
          </div>
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
  margin-top: 20px;
  margin-left: 50px;
  
  .controlUnit {
  padding-top: 30px;
  }
  
  .controlUnit:nth-child(1) {
  padding-top: 0px;
  }
  
  .form-group {
  width: 600px;
  }
  
  
  .splitControl {
  width: 280px;
  display: inline-block;
  position: relative;
  padding-top: 30px;
  }
  
  .sC1 {
  position: absolute;
  }
  
  .sC2 {
  position: relative;
  left: 320px;
  }
  
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
  
  .filename {
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 390px;
    overflow: hidden;
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
  
  .offlineRerrorText {
    position: absolute;
    color: #e46373; 
    left: 300px;
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
  
  #offlineReleaseLabel {
    margin-left: 300px;
    position: relative;
  }
  
  #onlineReleaseLabel {
    bottom: 20px;
    position: relative;
  }
  
  #classificationInput {
    width: 280px;
  }
  
  #onlineReleasabilityForm {
    position: relative;
    left: 302px;
  }
  
  #releasabilityInput {
    width: 280px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    height: 38px;
    display: block;
    padding-left: 0.75rem;
  }
  
  #classGroup {
    position: absolute;
  }
  
  .dropdown {
    display: block;
    width: 100%;
    color: #fff;
    background-color:rgba(0, 0, 0, 0);
    height: 38px;
    border: 1px solid #ced4da;
    font-weight: normal;
    font-size: 1rem;
      .dropdownBtn {
        width: 100%;
        position: relative;
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
