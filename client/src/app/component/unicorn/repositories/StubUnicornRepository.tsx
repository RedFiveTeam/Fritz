import { UnicornRepository } from './UnicornRepository';
import { MissionModel } from '../model/MissionModel';
import { CalloutModel } from '../model/CalloutModel';
import { UnicornUploadModel } from '../model/UnicornUploadModel';
import { ReleasabilityModel } from '../model/ReleasabilityModel';

export class StubUnicornRepository implements UnicornRepository {
  getMissions(): Promise<MissionModel[]> {
    return Promise.resolve([
      new MissionModel('1', '04-17-19', 'testCallsign', 'Test Mission', 'open', 'DGS-1', 'Pred')
    ]);
  }

  getCallouts(missionId: string): Promise<CalloutModel[]> {
    return Promise.resolve([
      new CalloutModel('Callout1', '2351-ei-235223', 'sas-232-1293821', 'Stuff here', '78282-sd-23512521', '1450Z')
    ]);
  }

  upload(model: UnicornUploadModel): Promise<void> {
    return Promise.resolve();
  }

  getReleasabilities(): Promise<ReleasabilityModel[]> {
    return Promise.resolve([
      new ReleasabilityModel('1', 'Unclass')
    ]);
  }
}