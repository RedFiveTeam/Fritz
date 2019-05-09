import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { SlideModel } from '../slides/models/SlideModel';

interface Props {
  className?: string;
  slideModel: SlideModel;
}

@observer
export class UndoDeleteContainer extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="deleteTitle">
          JPEG Deleted
        </div>
        <button
          className="undoButton"
          onClick={() => this.props.slideModel.setDeleted(false)}
        >
          Undo
        </button>
      </div>
    );
  }
}

export const StyledUndoDeleteContainer = styled(UndoDeleteContainer)`
background: #191E2A;
border-radius: .25rem;
border: 1px solid rgba(0,0,0,.125);
box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
height: 50px;
font-size: 16px;
line-height: 46px;
display: inline-block;
width: 100%;
margin-bottom: 1rem;

  button {
    float: right;
    border: none;
    background: none;
    color: rgb(21, 222, 236);
    cursor: pointer;
    position: relative;
    right: 10px;
  }
  
  button:focus {
    outline: 0;
  }
  
  .deleteTitle {
    position: relative;
    left: 10px;
    display: inline-block;
  }

`;