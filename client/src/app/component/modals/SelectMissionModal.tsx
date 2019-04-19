import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { StyledMission } from '../unicorn/Mission/Mission';
import { UnicornActions } from '../unicorn/actions/UnicornActions';

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  unicornActions?: UnicornActions;
}

@observer
export class SelectMissionModal extends React.Component<Props> {
  async componentDidMount() {
    await this.props.unicornActions!.initializeStores();
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="modal">
          <div className="title">
            Select a Mission from UNICORN
          </div>
          <div className="headers">
            <span>Callsign</span>
            <span>Start Date</span>
          </div>
          {
            this.props.unicornStore!.missions.map((m, idx) => {
              return (
                <StyledMission
                  key={idx}
                  mission={m}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export const StyledSelectMissionModal = inject('unicornStore', 'unicornActions')(styled(SelectMissionModal)`

  background: rgba(0, 0, 0, 0.5);
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  position: fixed;
  z-index: 75;

.modal {
  position: absolute;
  display: block;
  width: 840px;
  height: 490px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.5);
  background-color: #2b303c;
}

.title {
  height: 60px;
  line-height: 60px;
  padding-left: 21px;
  background-color: #1f1f2c;
  color: white;
  font-size: 30px;
}

.headers {
  height: 40px;
  line-height: 40px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: #2b303c;
  color: #6c7f9c;
  font-size: 20px;
  
  span:first-of-type {
    margin-left: 21px;
    margin-right: 125px;
  }
}
`);