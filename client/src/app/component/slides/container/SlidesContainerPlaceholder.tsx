import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const placeholder = require('../../../../icon/slidesContainerPlaceholder.svg');

interface Props {
  className?: string;
}

@observer
export class SlidesContainerPlaceholder extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <img
          src={placeholder}
          className="placeholderIcon"
          alt="Placeholder"
        />
        <p>
          Fill out the form on the left and
          upload a PDF to view
          previews of converted JPEGs
        </p>
      </div>
    );
  }
}

export const StyledSlidesContainerPlaceholder = styled(SlidesContainerPlaceholder)`
  position: relative;
  display: block;
  left: 32%;
  width: 400px;
  top: 55px;
  
  img {
    display: block;
    margin: auto;
    margin-bottom: 45px;
  }
  
  p {
    text-align: center;
    margin: auto;
    color: #5C6A7F;
    width: 320px;
    line-height: 24px;
    font-size: 24px;
  }
`;