import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UploadActions } from '../actions/UploadActions';
import { UploadStore } from '../UploadStore';
import { Toast } from '../../../../../utils/Toast';

const uploadIcon = require('../../../../../icon/UploadIcon.svg');
const pptIcon = require('../../../../../icon/PPTIcon.svg');
const paperclipIcon = require('../../../../../icon/PaperclipIcon.svg');
const resetUploadIcon = require('../../../../../icon/ResetUploadIcon.svg');

interface Props {
  className?: string;
  uploadActions?: UploadActions;
  uploadStore?: UploadStore;
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
          'The file format .ppt is not compatible with Fritz. File must be saved as .pptx.'
        );
      }
      if (fileName.toLowerCase().endsWith('pptx')) {
        await this.props.uploadActions!.upload(formData);
        let ele = document.querySelector('.uploadContainer') as HTMLElement;
        if (ele) {
          ele.style.border = 'none';
        }
      } else if (!fileName.toLowerCase().endsWith('ppt')) {
        (document.querySelector('#uploadButton') as HTMLInputElement).value = '';
        Toast.create(
          5000,
          'errorToast',
          '<b>Error:</b> File must be in Powerpoint format (<b>.pptx</b>)'
        );
      }
    }
  };

  displayUploadRequest() {
    return (
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
        <p className="col-8 mx-auto mt-5">Drag and drop .ppt file</p>
        <p className="col-9 mx-auto ">or</p>
        <input
          name="uploadButton"
          id="uploadButton"
          className="uploadButton"
          type="file"
          onChange={this.doUpload}
        />
        <label
          id="uploadLabel"
          htmlFor="uploadButton"
          className="btn btn-outline-info form-control-file col-5 mx-auto mb-5 w-25 text-white"
        >
          <img draggable={true} src={uploadIcon}/>
          <span className="ml-2 font-weight-bold">Upload Powerpoint</span>
        </label>
      </div>
    );
  }

  displayUploadedInfo() {
    return (
      <div className="row align-items-center h-100 text-center" id="uploadCompleteContainer">
        <div className="col-8 mx-auto" id="pptIcon">
          <img src={pptIcon}/>
        </div>
        <div className="p-2 text-uppercase w-100 col-9 mx-auto border-top border-bottom" id="pptName">
          <img className="float-left" src={paperclipIcon}/>
          <div className="float-left pl-2 filename">
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

export const InjectedUploadContainer = inject('uploadActions', 'uploadStore')(UploadContainer);