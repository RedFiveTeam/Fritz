import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledProgressBar } from '../../progressBar/ProgressBar';

interface Props {
  className?: string;
}

const FritzLoadingLogo = require('../../../../icon/LoadingLogo.svg');

@observer
export class LoadingScreen extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="loadingMessage">
          <span>One moment, Fritz is uploading and converting your mission storyboard...</span>
        </div>
        <div className="loadingImage">
          <img src={FritzLoadingLogo}/>
        </div>
        <StyledProgressBar/>
      </div>
    );
  }
}

export const StyledLoadingScreen = styled(LoadingScreen)`
#progressBar {
  background-image: linear-gradient(to left, #15deec, #00818c);
}

.loadingMessage {
  position: relative;
  width: 1650px;
  text-align: center;
  margin: auto;
  margin-top: 58px;
}

.loadingImage {
  width: 370px;
  position: relative;
  margin: auto;
  margin-top: 68px;
}

img {
  width: 369px;
  height: 479px;
}

span {
  font-size: 40px;
  font-weight: 300;
  color: #fff;
}
`;