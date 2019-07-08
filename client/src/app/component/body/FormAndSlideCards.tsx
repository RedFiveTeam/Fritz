import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { StyledFormContainer } from '../form/FormContainer';
import { StyledSlideCardContainer } from '../slides/container/SlideCardContainer';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import * as classNames from 'classnames';
import { UploadStore } from '../form/upload/UploadStore';
import { styled } from '../../../themes/default';

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  uploadStore?: UploadStore;
}

@observer
export class FormAndSlideCards extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('formAndSlideCards', this.props.className)}>
        {this.displaySlideForm()}
        {this.displayDividingLine()}
        {this.displaySlideCards()}
      </div>
    );
  }

  private displayDividingLine() {
    return (
      <div className={'dividingLine'}>
        <div className={'line'}/>
      </div>
    );
  }

  private displaySlideCards() {
    return (
      <div className={'slideCards'}>
        <StyledSlideCardContainer/>
      </div>
    );
  }

  private displaySlideForm() {
    return (
      <div className={'slideForm'}>
        <StyledFormContainer
          fileName={this.props.uploadStore!.fileName}
        />
      </div>
    );
  }
}

export const StyledFormAndSlideCards = inject('uploadStore', 'unicornStore')(styled(FormAndSlideCards)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  height: inherit;
  overflow: hidden;
    
  .slideForm {
    height: inherit;
    margin-top: 24px;
    min-width: 688px;
  }

  .dividingLine {
    display: flex;
    height: 100%;
    margin-right: 44px;
    
    .line {
      margin-top: 68px;
      margin-bottom: 108px;
      background: ${(props) => props.theme.color.blueGrey};
      width: 1px;
    }
  }
  
  .slideCards {
    padding-top: 16px;
    height: 100%;
  }
`);
