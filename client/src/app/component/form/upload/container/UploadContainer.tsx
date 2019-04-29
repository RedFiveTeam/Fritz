import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UploadActions } from '../actions/UploadActions';
import { UploadStore } from '../UploadStore';
import { Toast } from '../../../../../utils/Toast';
import { SlidesStore } from '../../../slides/SlidesStore';

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
      <div>
        <div className="converterTitle">
          <h2>JPEG Converter - Details</h2>
          <span>Complete the fields below to view and download JPEGs</span>
        </div>
        <label
          id="uploadLabel"
          htmlFor="uploadButton"
          className="pdfUploadButton"
        >
          <div
            onDragEnter={(e: any) => {
              let evt = e as Event;
              evt.preventDefault();
            }}
            onDragOver={(e: any) => {
              let evt = e as Event;
              evt.preventDefault();
            }}
            onDrop={this.doUpload}
            className="row align-items-center h-100 text-center"
          >
        <span
          className="step1"
        >
          Step 1: Upload a PDF
          <img
            onClick={() => {
              this.props.slidesStore!.setHelp(true);
            }}
            className="helpMenuIcon"
            src={helpMenuIcon}
          />
        </span>
            <img
              id="adobe"
              src={adobe}
            />
            <p
              id="dragMessage"
            >
              Drag and drop Mission Storyboard saved as PDF
              <span className="dragMessage2"> or
            <span className="browse">&nbsp; Browse &nbsp;</span>
              for your file
            </span>
            </p>
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

export const InjectedUploadContainer = inject('uploadActions', 'uploadStore', 'slidesStore')(UploadContainer);