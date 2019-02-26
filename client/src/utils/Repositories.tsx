import { UploadRepository } from '../app/component/form/repositories/UploadRepository';
import { HTTPClient } from './HTTPClient';
import { WebUploadRepository } from '../app/component/form/repositories/WebUploadRepository';
import { StubUploadRepository } from '../app/component/form/repositories/StubUploadRepository';
import { RenameRepository } from '../app/component/form/repositories/RenameRepository';
import { WebRenameRepository } from '../app/component/form/repositories/WebRenameRepository';
import { StubRenameRepository } from '../app/component/form/repositories/StubRenameRepository';

export interface Repositories {
  uploadRepository: UploadRepository;
  renameRepository: RenameRepository;
}

const client = new HTTPClient();

export const WebRepositories: Repositories = Object.freeze({
  uploadRepository: new WebUploadRepository(client),
  renameRepository: new WebRenameRepository(client)
});

export const StubRepositories: Repositories = {
  uploadRepository: new StubUploadRepository(),
  renameRepository: new StubRenameRepository()
};