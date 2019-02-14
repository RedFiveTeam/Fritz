import { HTTPClient } from '../../../../utils/HTTPClient';
import { UploadRepository } from './UploadRepository';
import { UploadSerializer } from '../UploadSerializer';
import { UploadModel } from '../UploadModel';

export class WebUploadRepository implements UploadRepository {
  private uploadSerializer = new UploadSerializer();

  constructor(private client: HTTPClient) {
  }

  async upload(data: any): Promise<UploadModel> {
    const json = await this.client.postJSON(
      '/api/upload',
      data);
    return this.uploadSerializer.deserialize(json);
  }
}