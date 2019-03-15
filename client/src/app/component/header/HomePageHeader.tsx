import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

@observer
export class HomePageHeader extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="left">
          <div className="leftText">
            <h2>JPEG Renamer - Details</h2>
            <span>Complete the fields below to view and download JPEGs</span>
          </div>
        </div>
        <div className="right">
          <h2>JPEG Previews</h2>
        </div>
      </div>
    );
  }
}

export const StyledHomePageHeader = styled(HomePageHeader)`
  background: #363E4A;
  color: #FFF;
  
  h2 {
    font-size: 24px;
  }
  
  .right > h2 {
   margin-left: 29px;
   position: absolute;
   display: block;
   top: 48%;
   transform: translate(0%, -50%);
  }
  
  .left {
    height: 71px;
    width: 49%;
    min-width: 800px;
    display: inline-block;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .right {
    height: 71px;
    width: 51%;
    display: inline-block;
    position: absolute;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  
  span {
    font-size: 16px;
    color: #D8E5FF;
  }
  
  .leftText {
    position: relative;
    display: block;
    margin-left: 15px;
    top: 50%;
    transform: translate(0%, -50%);
  }

`;