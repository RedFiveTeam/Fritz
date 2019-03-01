import { MetricRepository } from './MetricRepository';
import { MetricModel } from './MetricModel';

export class StubMetricRepository implements MetricRepository {

  findAll(): Promise<MetricModel[]> {
    return Promise.resolve([
      new MetricModel('1', 'e223sdfs23523sdfs', 'Upload', '1551711588')
    ]);
  }
}