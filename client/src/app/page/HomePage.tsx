import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledAppBody } from '../component/body/AppBody';
import { StyledToast } from '../../utils/Toast';
import { StyledFooter } from '../component/footer/Footer';
import { StyledDeleteModal } from '../component/modals/DeleteModal';
import { StyledExpandedView } from '../component/modals/ExpandedView';
import { UnicornStore } from '../component/unicorn/store/UnicornStore';
import { StyledSelectMissionModal } from '../component/modals/SelectMissionModal';
import { SlidesStore } from '../component/slides/SlidesStore';
import { StyledHelpMenu } from '../component/modals/HelpMenu';
import { UploadStore } from '../component/form/upload/UploadStore';
import { StyledLoadingScreen } from '../component/slides/container/LoadingScreen';

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  slidesStore?: SlidesStore;
  uploadStore?: UploadStore;
}

@observer
export class HomePage extends React.Component<Props> {

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledToast/>
        <StyledDeleteModal/>
        <StyledExpandedView/>
        {
          !this.props.unicornStore!.activeMission &&
          <StyledSelectMissionModal/>
        }
        {
          this.props.slidesStore!.help &&
          <StyledHelpMenu/>
        }
        <div
          className="mainBody"
        >
          {
            (this.props.uploadStore!.uploading || this.props.uploadStore!.processing) ?
              <StyledLoadingScreen/>
              :
              <StyledAppBody/>
          }
        </div>
        {
          (!this.props.uploadStore!.uploading && !this.props.uploadStore!.processing) &&
          <StyledFooter/>
        }
      </div>
    );
  }
}

export const StyledHomePage = inject('unicornStore', 'slidesStore', 'uploadStore')(styled(HomePage)`
height: auto;
min-height: 1060px;
overflow-y: hidden;
position: relative;
`);