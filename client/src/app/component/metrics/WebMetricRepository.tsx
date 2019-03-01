import { MetricRepository } from './MetricRepository';
import { MetricSerializer } from './MetricSerializer';
import { HTTPClient } from '../../../utils/HTTPClient';
import { MetricModel } from './MetricModel';

export class WebMetricRepository implements MetricRepository {
  private metricsSerializer = new MetricSerializer();

  constructor(private client: HTTPClient) {
  }

  async findAll(): Promise<MetricModel[]> {
    const json = await this.client.getJSON('/api/metrics');
    return json.map((obj: any) => {
      return this.metricsSerializer.deserialize(obj);
    });
  }
}