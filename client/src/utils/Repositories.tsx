import { UploadRepository } from '../app/component/form/repositories/UploadRepository';
import { HTTPClient } from './HTTPClient';
import { WebUploadRepository } from '../app/component/form/repositories/WebUploadRepository';
import { StubUploadRepository } from '../app/component/form/repositories/StubUploadRepository';
import { RenameRepository } from '../app/component/form/repositories/RenameRepository';
import { WebRenameRepository } from '../app/component/form/repositories/WebRenameRepository';
import { StubRenameRepository } from '../app/component/form/repositories/StubRenameRepository';
import { MetricRepository } from '../app/component/metrics/MetricRepository';
import { WebMetricRepository } from '../app/component/metrics/WebMetricRepository';
import { StubMetricRepository } from '../app/component/metrics/StubMetricRepository';

export interface Repositories {
  uploadRepository: UploadRepository;
  renameRepository: RenameRepository;
  metricRepository: MetricRepository;
}

const client = new HTTPClient();

export const WebRepositories: Repositories = Object.freeze({
  uploadRepository: new WebUploadRepository(client),
  renameRepository: new WebRenameRepository(client),
  metricRepository: new WebMetricRepository(client)
});

export const StubRepositories: Repositories = {
  uploadRepository: new StubUploadRepository(),
  renameRepository: new StubRenameRepository(),
  metricRepository: new StubMetricRepository()
};