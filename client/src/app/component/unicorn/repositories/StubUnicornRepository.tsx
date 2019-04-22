import { UnicornRepository } from './UnicornRepository';
import { MissionModel } from '../model/MissionModel';

export class StubUnicornRepository implements UnicornRepository {
  getMissions(): Promise<MissionModel[]> {
    return Promise.resolve([
      new MissionModel('1', '04-17-19', 'testCallsign', 'Test Mission', 'open', 'DGS-1')
    ]);
  }
}