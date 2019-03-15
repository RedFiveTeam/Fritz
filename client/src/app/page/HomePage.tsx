import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledAppBody } from '../component/body/AppBody';
import { StyledToast } from '../../utils/Toast';
import { StyledFooter } from '../component/footer/Footer';
import { StyledDeleteModal } from '../component/modals/DeleteModal';
import { StyledHomePageHeader } from '../component/header/HomePageHeader';
import { StyledClassificationBanner } from '../component/classification/ClassificationBanner';
import { ClassificationStore } from '../component/classification/store/ClassificationStore';
import { ClassificationActions } from '../component/classification/ClassificationActions';

interface Props {
  className?: string;
  classificationStore?: ClassificationStore;
  classificationActions?: ClassificationActions;
}

@observer
export class HomePage extends React.Component<Props> {

  async componentDidMount() {
    await this.props.classificationActions!.initializeStore();
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledToast/>
        <StyledDeleteModal/>
        <StyledClassificationBanner
          classification={this.props.classificationStore!.classification}
        />
        <StyledHomePageHeader/>
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
top: 24px;
`);