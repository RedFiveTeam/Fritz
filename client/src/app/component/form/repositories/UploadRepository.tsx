import { UploadModel } from '../UploadModel';
import { StatusModel } from '../StatusModel';

export interface UploadRepository {
  upload(data: any): Promise<UploadModel>;
  status(): Promise<StatusModel>;
}