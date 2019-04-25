import { HTTPClient } from '../../../../utils/HTTPClient';
import { UnicornRepository } from './UnicornRepository';
import { MissionSerializer } from '../serializers/MissionSerializer';
import { MissionModel } from '../model/MissionModel';
import { CalloutModel } from '../model/CalloutModel';
import { CalloutSerializer } from '../serializers/CalloutSerializer';
import { UnicornUploadModel } from '../model/UnicornUploadModel';
import { UnicornUploadSerializer } from '../serializers/UnicornUploadSerializer';
import { ReleasabilityModel } from '../model/ReleasabilityModel';
import { ReleasabilitySerializer } from '../serializers/ReleasabilitySerializer';

export class WebUnicornRepository implements UnicornRepository {
  private missionSerializer = new MissionSerializer();
  private calloutSerializer = new CalloutSerializer();
  private unicornUploadSerializer = new UnicornUploadSerializer();
  private releasabilitySerializer = new ReleasabilitySerializer();

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

  async upload(model: UnicornUploadModel): Promise<void> {
    const body = JSON.stringify(this.unicornUploadSerializer.serialize(model));
    await this.client.postJSON(
      '/api/unicorn',
      body
    );
    return Promise.resolve();
  }

  async getReleasabilities(): Promise<ReleasabilityModel[]> {
    const json = await this.client.getJSON('/api/unicorn/releasabilities');
    return json.map((obj: any) => {
      return this.releasabilitySerializer.deserialize(obj);
    });
  }
}