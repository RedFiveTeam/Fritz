import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { StyledMission } from '../unicorn/Mission/Mission';
import { UnicornActions } from '../unicorn/actions/UnicornActions';
import { StyledDropdown } from '../dropdown/Dropdown';

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  unicornActions?: UnicornActions;
}

const sites = ['DGS 1', 'DGS 2', 'DGS 3', 'DGS 4', 'DGS 5', 'DGS AR', 'DGS AL', 'DGS IN', 'DGS KS', 'DGS MA', 'DGS NV'];

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
            <span>Select a Mission from UNICORN</span>
            <span>Site</span>
            <StyledDropdown
              options={sites}
              defaultValue={this.props.unicornStore!.selectedSite}
              callback={(s: string) => {
                this.props.unicornStore!.setSelectedSite(s);
              }}
            />
          </div>
          <div className="headers">
            <span>Callsign</span>
            <span>Start Date</span>
          </div>
          {
            this.props.unicornStore!.missions
              .filter((m) => {
                return m.org === this.props.unicornStore!.selectedSite;
              })
              .map((m, idx) => {
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
  font-weight: bold;
  letter-spacing: 1.1px;
  font-size: 30px;
  
  span:nth-of-type(2) {
    position: absolute;
    left: 655px;
    color: #6c7f9c;
    font-weight: 300;
    letter-spacing: 0.9px;
  }
  
  .dropdown {
    position: absolute;
    left: 713px;
    top: 8px;
  }
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