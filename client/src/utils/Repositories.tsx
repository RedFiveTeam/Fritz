import { UploadRepository } from '../app/component/form/repositories/UploadRepository';
import { HTTPClient } from './HTTPClient';
import { WebUploadRepository } from '../app/component/form/repositories/WebUploadRepository';
import { StubUploadRepository } from '../app/component/form/repositories/StubUploadRepository';

export interface Repositories {
  uploadRepository: UploadRepository;
}

const client = new HTTPClient();

export const WebRepositories: Repositories = Object.freeze({
  uploadRepository: new WebUploadRepository(client)
});

export const StubRepositories: Repositories = {
  uploadRepository: new StubUploadRepository()
};