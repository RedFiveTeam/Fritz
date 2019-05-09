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

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  slidesStore?: SlidesStore;
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
          <StyledAppBody/>
          <StyledFooter/>
        </div>
      </div>
    );
  }
}

export const StyledHomePage = inject('unicornStore', 'slidesStore')(styled(HomePage)`
height: auto;
min-height: 1060px;
overflow-y: hidden;
position: relative;
`);