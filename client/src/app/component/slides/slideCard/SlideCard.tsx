import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { SlideModel } from '../SlideModel';

interface Props {
  className?: string;
  slideName: any;
  slideNumber: number;
  slideModel: SlideModel;
}

@observer
export class SlideCard extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={'api/image/' + this.props.slideNumber} className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{this.props.slideName}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledSlideCard = styled(SlideCard)`
  .card {
    background-color: #191E2A;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    height: 168px;
  }
  
  .card-title {
    font-size: 14px;
  }
  
  .card-body {
    display: block;
    position: relative;
    right: 15%;
  }
  
  img {
    object-fit: cover;

    width: 70%;
    height: 167px;
  }
`;