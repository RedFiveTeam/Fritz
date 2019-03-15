import { UploadRepository } from '../app/component/form/upload/repository/UploadRepository';
import { HTTPClient } from './HTTPClient';
import { WebUploadRepository } from '../app/component/form/upload/repository/WebUploadRepository';
import { StubUploadRepository } from '../app/component/form/upload/repository/StubUploadRepository';
import { RenameRepository } from '../app/component/form/rename/RenameRepository';
import { WebRenameRepository } from '../app/component/form/rename/WebRenameRepository';
import { StubRenameRepository } from '../app/component/form/rename/StubRenameRepository';
import { MetricRepository } from '../app/component/metrics/repository/MetricRepository';
import { WebMetricRepository } from '../app/component/metrics/repository/WebMetricRepository';
import { StubMetricRepository } from '../app/component/metrics/repository/StubMetricRepository';
import { ClassificationRepository } from '../app/component/classification/repositories/ClassificationRepository';
import { WebClassificationRepository } from
    '../app/component/classification/repositories/WebClassificationRepository';
import { StubClassificationRepository } from
    '../app/component/classification/repositories/StubClassificationRepository';

export interface Repositories {
  uploadRepository: UploadRepository;
  renameRepository: RenameRepository;
  metricRepository: MetricRepository;
  classificationRepository: ClassificationRepository;
}

const client = new HTTPClient();

export const WebRepositories: Repositories = Object.freeze({
  uploadRepository: new WebUploadRepository(client),
  renameRepository: new WebRenameRepository(client),
  metricRepository: new WebMetricRepository(client),
  classificationRepository: new WebClassificationRepository(client)
});

export const StubRepositories: Repositories = {
  uploadRepository: new StubUploadRepository(),
  renameRepository: new StubRenameRepository(),
  metricRepository: new StubMetricRepository(),
  classificationRepository: new StubClassificationRepository()
};