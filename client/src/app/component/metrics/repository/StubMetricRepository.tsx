import { MetricRepository } from './MetricRepository';
import { MetricModel } from '../MetricModel';
import moment = require('moment');

export class StubMetricRepository implements MetricRepository {

  findAll(): Promise<MetricModel[]> {
    return Promise.resolve([
      new MetricModel('1', 'e223sdfs23523sdfs', 'Upload', moment().unix().toString(), null, null)
    ]);
  }

  create(metric: MetricModel) {
    return Promise.resolve(new MetricModel(3, 'testetstestes', 'Upload', moment().unix().toString(), null, null));
  }

  update(metric: MetricModel) {
    return Promise.resolve(new MetricModel(
      3,
      'testetstestes',
      'Upload',
      moment().unix().toString(),
      moment().unix().toString(),
      null)
    );
  }
}