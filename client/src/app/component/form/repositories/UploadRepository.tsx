import { UploadModel } from '../UploadModel';

export interface UploadRepository {
  upload(data: any): Promise<UploadModel>;
}