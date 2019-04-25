import { MissionModel } from '../model/MissionModel';
import { CalloutModel } from '../model/CalloutModel';
import { UnicornUploadModel } from '../model/UnicornUploadModel';
import { ReleasabilityModel } from '../model/ReleasabilityModel';

export interface UnicornRepository {
  getMissions(): Promise<MissionModel[]>;
  getCallouts(missionId: string): Promise<CalloutModel[]>;
  upload(model: UnicornUploadModel): Promise<void>;
  getReleasabilities(): Promise<ReleasabilityModel[]>;
}