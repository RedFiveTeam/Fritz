import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { StyledMission } from '../unicorn/Mission/Mission';
import { UnicornActions } from '../unicorn/actions/UnicornActions';
import { StyledUnicornMissionLoading } from '../average/loading/UnicornMissionLoading';
import { DropdownOption, StyledDropdown } from '../dropdown/Dropdown';

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  unicornActions?: UnicornActions;
}

const sites = [
  new DropdownOption('1', 'DGS 1'),
  new DropdownOption('2', 'DGS 2'),
  new DropdownOption('3', 'DGS 3'),
  new DropdownOption('4', 'DGS 4'),
  new DropdownOption('5', 'DGS 5'),
  new DropdownOption('6', 'AFSOC'),
  new DropdownOption('7', 'DGS AR'),
  new DropdownOption('8', 'DGS AL'),
  new DropdownOption('9', 'DGS IN'),
  new DropdownOption('10', 'DGS KS'),
  new DropdownOption('11', 'DGS MA'),
  new DropdownOption('12', 'DGS NV')
];

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
            <div className={'site-selector'}>
              <span className={'site-label'}>Site</span>
              <StyledDropdown
                options={sites}
                value={this.props.unicornStore!.selectedSite}
                defaultValue={this.props.unicornStore!.selectedSite}
                callback={(s: DropdownOption) => {
                  this.props.unicornStore!.setSelectedSite(s.display);
                }}
              />
            </div>
          </div>
          <div className="headers">
            <span>Callsign</span>
            <span>Start Date</span>
          </div>
          {
            this.props.unicornStore!.missions.length < 1 && this.props.unicornStore!.loading &&
            <StyledUnicornMissionLoading/>
          }
          <div className="missionRows">
            {
              this.props.unicornStore!.missions
                .filter((m) => {
                  return m.org === this.props.unicornStore!.selectedSite;
                })
                .sort((a, b) => {
                  let name1 = a.callsign!.toLowerCase();
                  let name2 = b.callsign!.toLowerCase();
                  return name1 < name2 ? -1 : (name1 > name2 ? 1 : 0);
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
    padding: 0 12px 0 21px;
    background-color: #1f1f2c;
    color: white;
    font-weight: bold;
    letter-spacing: 1.1px;
    font-size: 30px;
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
      
    .site-selector {
      display: flex;
      align-items: center;
      
      .bootstrap-dropdown{
        width: 117px;
        height: 44px;
        
        .dropdown-menu {
          left: -23px !important;
        }
      }
      
      .site-label {
        font-size: 24px;
        font-weight: 300;
        letter-spacing: 0.9px;
        color: #6c7f9c;
        padding-right: 12px;
      }
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
  .missionRows {
    overflow-y: auto;
    height: 390px;
  }
`);