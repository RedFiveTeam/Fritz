import { MissionModel } from '../model/MissionModel';
import { CalloutModel } from '../model/CalloutModel';

export interface UnicornRepository {
  getMissions(): Promise<MissionModel[]>;
  getCallouts(missionId: string): Promise<CalloutModel[]>;
}