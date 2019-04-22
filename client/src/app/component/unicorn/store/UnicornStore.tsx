import { action, computed, observable } from 'mobx';
import { MissionModel } from '../model/MissionModel';
import { UnicornRepository } from '../repositories/UnicornRepository';

export class UnicornStore {
  @observable private _missions: MissionModel[] = [];
  @observable private _activeMission: MissionModel | null;
  @observable private _selectedSite: string = 'DGS 1';

  async hydrate(unicornRepository: UnicornRepository) {
    this._missions = await unicornRepository.getMissions();
    if (window.location.hostname.toLowerCase() === 'localhost') {
      this._missions.push(new MissionModel('testId', 'starttime', 'TEST11', 'fake mission', 'OPEN', 'DGS 1'));
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
}