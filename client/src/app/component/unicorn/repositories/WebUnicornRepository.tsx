import { HTTPClient } from '../../../../utils/HTTPClient';
import { UnicornRepository } from './UnicornRepository';
import { UnicornSerializer } from '../UnicornSerializer';
import { MissionModel } from '../model/MissionModel';

export class WebUnicornRepository implements UnicornRepository {
  private unicornSerializer = new UnicornSerializer();

  constructor(private client: HTTPClient) {
  }

  async getMissions(): Promise<MissionModel[]> {
    const json = await this.client.getJSON('/api/unicorn/missions');
    return json.map((obj: any) => {
      return this.unicornSerializer.deserialize(obj);
    });
  }

}