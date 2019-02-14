import { UploadRepository } from './UploadRepository';
import { UploadModel } from '../UploadModel';

export class StubUploadRepository implements UploadRepository {
  upload(data: any): Promise<UploadModel> {
    return Promise.resolve(data);
  }
}