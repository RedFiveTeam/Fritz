import { HTTPClient } from '../../../../utils/HTTPClient';
import { UnicornRepository } from './UnicornRepository';
import { MissionSerializer } from '../MissionSerializer';
import { MissionModel } from '../model/MissionModel';
import { CalloutModel } from '../model/CalloutModel';
import { CalloutSerializer } from '../CalloutSerializer';

export class WebUnicornRepository implements UnicornRepository {
  private missionSerializer = new MissionSerializer();
  private calloutSerializer = new CalloutSerializer();

  constructor(private client: HTTPClient) {
  }

  async getMissions(): Promise<MissionModel[]> {
    const json = await this.client.getJSON('/api/unicorn/missions');
    return json.map((obj: any) => {
      return this.missionSerializer.deserialize(obj);
    });
  }

  async getCallouts(missionId: string): Promise<CalloutModel[]> {
    const json = await this.client.getJSON('/api/unicorn/targets/' + missionId);
    return json.map((obj: any) => {
      return this.calloutSerializer.deserialize(obj);
    });
  }
}