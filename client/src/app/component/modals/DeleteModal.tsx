import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UploadStore } from '../form/upload/UploadStore';
import { SlidesStore } from '../slides/SlidesStore';
import { UploadActions } from '../form/upload/actions/UploadActions';
import { Toast } from '../../../utils/Toast';

interface Props {
  className?: string;
  uploadStore?: UploadStore;
  slidesStore?: SlidesStore;
  uploadActions?: UploadActions;
}

@observer
export class DeleteModal extends React.Component<Props> {

  deleteSlides = () => {
    this.props.uploadStore!.setProcessing(false);
    this.props.uploadStore!.setUploaded(false);
    this.props.uploadStore!.setPlaceholder(true);
    this.props.slidesStore!.setSlides([]);
    this.props.uploadActions!.clearPoll();
    this.props.uploadStore!.setTotal(0);
    this.props.uploadStore!.setProgress(0);
    let ele = document.querySelector('.uploadContainer') as HTMLElement;
    if (ele) {
      ele.style.border = '1px dashed #d4d6db';
    }
    Toast.create(
      30000,
      'deleteToast',
      '<b>Powerpoint File Removed</b>'
    );
    this.cleanOnExit();
  };

  cleanOnExit() {
    let request = new XMLHttpRequest();
    request.open('POST', '/api/roomba', true);
    request.send(document.cookie);
    // return undefined;
  }

  render() {
    return (
      <div
        className={this.props.className + ' modal show'}
        id="deleteModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Delete Powerpoint</h5>
              <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete the powerpoint file? All changes will be lost and this action cannot
              be done and no one is going to read this shit.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary text-white" data-dismiss="modal">Cancel</button>
              <button
                type="button"
                className="btn btn-primary text-white"
                onClick={this.deleteSlides}
                data-dismiss="modal"
              >
                Delete Powerpoint
              </button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export const StyledDeleteModal = inject('uploadStore', 'slidesStore', 'uploadActions')(styled(DeleteModal)`
position: absolute;
left: 50%;
top: 55%;
width: 600px;
height: 400px;
transform: translate(-50%, -50%);

.modal-header {
border-bottom-color: #1b1e21;
}
.modal-footer {
border-top-color: #1b1e21;
}
.btn-primary {
background: #AE4754;
border: none;
}
`);