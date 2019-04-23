import { action, computed, observable } from 'mobx';
import { MissionModel } from '../model/MissionModel';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { CalloutModel } from '../model/CalloutModel';

const fmvPlatforms = ['pred', 'predator', 'reaper', 'mc-12'];

export class UnicornStore {
  @observable private _missions: MissionModel[] = [];
  @observable private _activeMission: MissionModel | null;
  @observable private _selectedSite: string = 'DGS 1';
  @observable private _callouts: CalloutModel[] = [];

  async hydrate(unicornRepository: UnicornRepository) {
    if (navigator.userAgent.toLowerCase().indexOf('electron') !== -1) {
      this._missions.push(new MissionModel(
        'testId', 'starttime', 'TEST11', 'fake mission', 'OPEN', 'DGS 1', 'Pred')
      );
    } else {
      this._missions = (await unicornRepository.getMissions())
        .filter((m) => {
          return fmvPlatforms.indexOf(m.platform.toLowerCase()) > -1;
        });
    }
  }

  @computed
  get missions(): MissionModel[] {
    return this._missions;
  }

  @computed
  get activeMission(): MissionModel | null {
    return this._activeMission;
  }

  @computed
  get selectedSite(): string {
    return this._selectedSite;
  }

  @computed
  get callouts(): CalloutModel[] {
    return this._callouts;
  }

  @action.bound
  setMissions(value: MissionModel[]) {
    this._missions = value;
  }

  @action.bound
  setActiveMission(value: MissionModel | null) {
    this._activeMission = value;
  }

  @action.bound
  setSelectedSite(value: string) {
    this._selectedSite = value;
  }

  @action.bound
  setCallouts(value: CalloutModel[]) {
    this._callouts = value;
  }
}