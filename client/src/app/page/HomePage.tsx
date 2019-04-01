import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledAppBody } from '../component/body/AppBody';
import { StyledToast } from '../../utils/Toast';
import { StyledFooter } from '../component/footer/Footer';
import { StyledDeleteModal } from '../component/modals/DeleteModal';
import { StyledExpandedView } from '../component/modals/ExpandedView';

interface Props {
  className?: string;
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

export const StyledHomePage = inject('classificationStore', 'classificationActions')(styled(HomePage)`
height: auto;
min-height: 1060px;
overflow-y: hidden;
position: relative;
`);