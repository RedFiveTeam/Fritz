import { action, computed, observable } from 'mobx';
import { MissionModel } from '../model/MissionModel';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { CalloutModel } from '../model/CalloutModel';
import { ReleasabilityModel } from '../model/ReleasabilityModel';

const fmvPlatforms = ['pred', 'predator', 'reaper', 'mc-12'];

export class UnicornStore {
  @observable private _missions: MissionModel[] = [];
  @observable private _activeMission: MissionModel | null;
  @observable private _selectedSite: string = 'DGS 1';
  @observable private _callouts: CalloutModel[] = [];
  @observable private _releasabilities: ReleasabilityModel[] = [];
  @observable private _releasability: string;
  @observable private _releasabilityId: string;

  async hydrate(unicornRepository: UnicornRepository) {
    if (navigator.userAgent.toLowerCase().indexOf('electron') !== -1) {
      this._missions.push(new MissionModel(
        'testId', 'starttime', 'TEST11', 'fake mission', 'OPEN', 'DGS 1', 'Pred')
      );
    } else {
      this._releasabilities = (await unicornRepository.getReleasabilities());
      this._missions = (await unicornRepository.getMissions())
        .filter((m) => {
          return fmvPlatforms.indexOf(m.platform.toLowerCase()) > -1;
        });
    }
  }

  @computed
  get releasability(): string {
    return this._releasability;
  }

  @computed
  get releasabilityId(): string {
    return this._releasabilityId;
  }

  @computed
  get releasabilities(): ReleasabilityModel[] {
    return this._releasabilities;
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

  @action.bound
  setReleasabilities(value: ReleasabilityModel[]) {
    this._releasabilities = value;
  }

  @action.bound
  setReleasability(value: string) {
    this._releasability = value;
  }

  @action.bound
  setReleasabilityId(value: string) {
    this._releasabilityId = value;
  }
}