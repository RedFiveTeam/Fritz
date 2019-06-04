import * as React from 'react';
import { CSSProperties } from 'react';
import { inject, observer } from 'mobx-react';
import { UploadActions } from '../actions/UploadActions';
import { UploadStore } from '../UploadStore';
import { Toast } from '../../../../../utils/Toast';
import { SlidesStore } from '../../../slides/store/SlidesStore';
import styled from 'styled-components';

const pdfIcon = require('../../../../../icon/PDFIcon.svg');
const paperclipIcon = require('../../../../../icon/PaperclipIcon.svg');
const resetUploadIcon = require('../../../../../icon/ResetUploadIcon.svg');
const adobe = require('../../../../../icon/Adobe.svg');
const helpMenuIcon = require('../../../../../icon/HelpMenu.svg');

interface Props {
  className?: string;
  uploadActions?: UploadActions;
  uploadStore?: UploadStore;
  slidesStore?: SlidesStore;
}

@observer
export class UploadContainer extends React.Component<Props> {

  noBorder: CSSProperties = {
    border: 'none'
  };

  goodCSS: CSSProperties = {};

  doUpload = async (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    e.persist();
    if (e.type === 'change') {
      const element = document.querySelector('#uploadButton')! as HTMLInputElement;
      if (element != null && element.files) {
        formData.append('file', element.files[0]);
      }
    } else {
      formData.append('file', e.dataTransfer.files[0]);
    }
    let file: File = formData.get('file') as File;
    if (file) {
      let fileName = file.name;
      if (fileName.toLowerCase().endsWith('ppt')) {
        (document.querySelector('#uploadButton') as HTMLInputElement).value = '';
        Toast.create(
          5000,
          'errorToast',
          'The file format .ppt is not compatible with Fritz. File must be saved as .pdf.'
        );
      }
      if (fileName.toLowerCase().endsWith('pdf')) {
        await this.props.uploadActions!.upload(formData);
        let ele1 = document.querySelector('.uploadContainer') as HTMLElement;
        let ele2 = document.querySelector('.helpMessage') as HTMLElement;
        if (ele1 && ele2) {
          ele1.style.border = 'none';
          ele2.style.display = 'none';
        }
      } else if (!fileName.toLowerCase().endsWith('ppt')) {
        (document.querySelector('#uploadButton') as HTMLInputElement).value = '';
        Toast.create(
          5000,
          'errorToast',
          '<b>Error:</b> File must be a PDF(<b>.pdf</b>)'
        );
      }
    }
  };

  displayUploadRequest() {
    return (
      <div
        className="bigUploadBox"
        onDragEnter={(e: any) => {
          let evt = e as Event;
          evt.preventDefault();
        }}
        onDragOver={(e: any) => {
          let evt = e as Event;
          evt.preventDefault();
        }}
        onDrop={this.doUpload}
      >
        <div>
          <div className="bigConverterTitle">
          <span>
            Upload a PDF
            <img
              onClick={() => {
                this.props.slidesStore!.setHelp(true);
              }}
              className="bigHelpMenuIcon"
              src={helpMenuIcon}
            />
          </span>
            <span>Upload a mission storyboard as a .pdf file to view, rename, and upload images</span>
          </div>
          <label
            id="uploadLabel"
            htmlFor="uploadButton"
            className="bigPdfUploadButton"
          >
            <img
              id="bigAdobe"
              src={adobe}
            />
            <div
              id="bigClickable"
            >
              <span
                id="bigDragMessage"
              >
                Drag and drop Mission Storyboard saved as PDF
              </span>
              <span className="bigDragMessage2"> or </span>
              <label htmlFor="uploadButton" className="bigBrowseBtn">Browse</label>
              <input
                name="uploadButton"
                id="uploadButton"
                className="uploadButton"
                type="file"
                onChange={this.doUpload}
              />
            </div>
          </label>
        </div>
      </div>
    );
  }

  displayUploadedInfo() {
    return (
      <div className="row align-items-center text-center" id="uploadCompleteContainer">
        <div className="col-8 mx-auto" id="pdfIcon">
          <img src={pdfIcon}/>
        </div>
        <div className="p-2 text-uppercase w-100 col-9 mx-auto border-top border-bottom" id="pdfName">
          <img className="float-left" src={paperclipIcon}/>
          <div id="pdfFileName" className="float-left pl-2">
            {this.props.uploadStore!.fileName}
          </div>
          <img
            id="deletePP"
            className="float-right pt-1 clickable"
            data-toggle="modal"
            data-target="#deleteModal"
            src={resetUploadIcon}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        className={this.props.className + ' uploadContainer'}
        style={this.props.uploadStore!.uploaded ? this.noBorder : this.goodCSS}
      >
        <div
          className="container h-100 text-white"
        >
          {
            !this.props.uploadStore!.uploaded &&
            this.displayUploadRequest()
          }
          {
            this.props.uploadStore!.uploaded &&
            this.displayUploadedInfo()
          }
        </div>
      </div>
    );
  }
}

export const StyledUploadContainer = inject('uploadActions', 'uploadStore', 'slidesStore')(styled(UploadContainer)`
  #pdfFileName {
    width: 392px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .bigUploadBox {
    width: 1028px;
    position: absolute;
    left: 50%;
    top: 32px;
    transform: translate(-50%, 0%);
  }
  
  .bigConverterTitle {
    height: 73px;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    position: relative;
    margin-bottom: 40px;
    
    span:nth-of-type(1) {
      display: block;
    }
    
    span:nth-of-type(2) {
      position: relative;
      bottom: 16px;
      font-size: 20px;
      font-weight: 300;
      color: #88a6d6;
    }
  }
  
  .bigHelpMenuIcon {
    position: relative;
    margin-left: 8px;
    bottom: 2px;
    cursor: pointer;
  }
  
  .bigPdfUploadButton {
    width: 1000px;
    height: 566px;
    border: 1px dashed #d4d6db;
  }
  
  #bigAdobe {
    position: relative;
    left: 361px;
    top: 43px;
    margin-bottom: 68px;
  }
  
  #bigClickable {
    text-align: center;
    
     span {
      display: block;
     }
  }
  
  #bigDragMessage {
    font-size: 24px;
    color: #d4d6db;
    margin-bottom: 32px;
  }
  
  .bigDragMessage2 {
    font-weight: 300;
    font-size: 18px;
    color: #d4d6db;
    margin-bottom: 32px;
  }
  
  .bigBrowseBtn {
    outline: none;
    width: 157px;
    height: 38px;
    border-radius: 4px;
    border: solid 1px #00818C;
    color: #FFF;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 250ms;
    cursor: pointer;
    font-size: 16px;
    overflow-wrap: normal;
    line-height: 34px;
    vertical-align: middle;

    :hover {
      background-color: #00818C;
    }
  }
`);