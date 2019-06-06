import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledAppBody } from '../component/body/AppBody';
import { StyledToast } from '../../utils/Toast';
import { StyledFooter } from '../component/footer/Footer';
import { StyledDeleteModal } from '../component/modals/DeleteModal';
import { UnicornStore } from '../component/unicorn/store/UnicornStore';
import { StyledSelectMissionModal } from '../component/modals/SelectMissionModal';
import { SlidesStore } from '../component/slides/store/SlidesStore';
import { StyledHelpMenu } from '../component/modals/HelpMenu';
import { SlidesActions } from '../component/slides/actions/SlidesActions';
import { UnicornActions } from '../component/unicorn/actions/UnicornActions';
import { StyledLoadingScreen } from '../component/slides/container/LoadingScreen';
import { UploadStore } from '../component/form/upload/UploadStore';
import { StyledUnicornOfflineModal } from '../component/modals/UnicornOfflineModal';
import { CarouselStore } from '../component/carousel/CarouselStore';
import { StyledCarousel } from '../component/carousel/Carousel';

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  slidesStore?: SlidesStore;
  slidesActions?: SlidesActions;
  unicornActions?: UnicornActions;
  uploadStore?: UploadStore;
  carouselStore?: CarouselStore;
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
        {
          this.props.carouselStore!.isVisible &&
            <StyledCarousel
              slides={this.props.slidesStore!.undeletedSlides}
            />
        }
        {
          this.props.unicornStore!.offlineModal &&
          <StyledUnicornOfflineModal/>
        }
        {
          !this.props.unicornStore!.activeMission && !this.props.unicornStore!.offline &&
          <StyledSelectMissionModal/>
        }
        {
          this.props.slidesStore!.help &&
          <StyledHelpMenu/>
        }
        {
          (this.props.uploadStore!.uploading || this.props.uploadStore!.processing) ?
            <StyledLoadingScreen/>
            :
            <div
              className="mainBody"
            >
              <StyledAppBody/>
              <StyledFooter
                downloader={this.props.slidesActions!.trackRenameAndDownload}
                uploader={this.props.unicornActions!.uploadToUnicorn}
                hideButtons={this.props.unicornStore!.isUploading}
              />
            </div>
        }
      </div>
    );
  }
}

export const StyledHomePage = inject(
  'unicornStore',
  'slidesStore',
  'slidesActions',
  'unicornActions',
  'uploadStore',
  'carouselStore'
)(styled(HomePage)`
  height: auto;
  min-height: 1060px;
  overflow-y: hidden;
  position: relative;
`);