import { MetricModel } from './MetricModel';

export interface MetricRepository {
  findAll(): Promise<MetricModel[]>;
}