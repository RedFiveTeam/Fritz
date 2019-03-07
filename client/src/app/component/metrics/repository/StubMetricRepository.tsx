import { MetricRepository } from './MetricRepository';
import { MetricModel } from '../MetricModel';

export class StubMetricRepository implements MetricRepository {

  findAll(): Promise<MetricModel[]> {
    return Promise.resolve([
      new MetricModel('1', 'e223sdfs23523sdfs', 'Upload', '1551711588', null)
    ]);
  }

  create(metric: MetricModel) {
    return Promise.resolve(new MetricModel(3, 'testetstestes', 'Upload', '1551723178', null));
  }

  update(metric: MetricModel) {
    return Promise.resolve(new MetricModel(3, 'testetstestes', 'Upload', '1551723178', '1551723188'));
  }
}