import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { styled } from '../../../themes/default';

interface Props {
  className?: string;
}

@observer
export class UploadInProgress extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('uploadInProgress', this.props.className)}>
        <div className={'loadingWheel'}/>
        <span className={'message'}>Uploading</span>
      </div>
    );
  }
}

export const StyledUploadInProgress = styled(UploadInProgress)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.fontColor};
  
  .loadingWheel {
    border-radius: 50%;
    height: .5em;
    width: .5em;
    margin-bottom: 32px;
    margin-top: 20px;
  }
  
  .message {
    font-size: 14px;
    letter-spacing: 0.4px;
    font-weight: 500;
  }
  
  .loadingWheel {
    animation: loadingWheel 700ms infinite;
  }
  
  @keyframes loadingWheel {
    0% {
      box-shadow: 1.2em 0 0 .2em #15DEEC, 
                  .5em 1em #EFF6F7,
                  -0.5em 1em #EFF6F7,
                  -1.2em 0 #EFF6F7,
                  -0.5em -1em #DAF6F8,
                  .5em -1em #8EE4EA;
    }
    16.666% {
      box-shadow: 1.2em 0 #8EE4EA, 
                  .5em 1em 0 .2em #15DEEC,
                  -0.5em 1em #EFF6F7,
                  -1.2em 0 #EFF6F7,
                  -0.5em -1em #EFF6F7,
                  .5em -1em #DAF6F8;
    }
    33.332% {
      box-shadow: 1.2em 0 #DAF6F8, 
                  .5em 1em #8EE4EA,
                  -0.5em 1em 0 .2em #15DEEC,
                  -1.2em 0 #EFF6F7,
                  -0.5em -1em #EFF6F7,
                  .5em -1em #EFF6F7;
    }
    50% {
      box-shadow: 1.2em 0 #EFF6F7, 
                  .5em 1em #DAF6F8,
                  -0.5em 1em #8EE4EA,
                  -1.2em 0 0 .2em #15DEEC,
                  -0.5em -1em #EFF6F7,
                  .5em -1em #EFF6F7;
    }
    66.666% {
      box-shadow: 1.2em 0 #EFF6F7, 
                  .5em 1em #EFF6F7,
                  -0.5em 1em #DAF6F8,
                  -1.2em 0 #8EE4EA,
                  -0.5em -1em 0 .2em #15DEEC,
                  .5em -1em #EFF6F7;
    }
    83.333% {
      box-shadow: 1.2em 0 #EFF6F7, 
                  .5em 1em #EFF6F7,
                  -0.5em 1em #EFF6F7,
                  -1.2em 0 #DAF6F8,
                  -0.5em -1em #8EE4EA,
                  .5em -1em 0 .2em #15DEEC;
    }
    100% {
      box-shadow: 1.2em 0 0 .2em #15DEEC, 
                  .5em 1em #EFF6F7,
                  -0.5em 1em #EFF6F7,
                  -1.2em 0 #EFF6F7,
                  -0.5em -1em #DAF6F8,
                  .5em -1em #8EE4EA;
    }
  }
`;