import { MissionModel } from '../model/MissionModel';

export interface UnicornRepository {
  getMissions(): Promise<MissionModel[]>;
}