import { action, computed, observable } from 'mobx';
import { MetricModel } from './MetricModel';
import { MetricRepository } from './MetricRepository';

export class MetricStore {
  @observable private _metrics: MetricModel[] = [];

  async hydrate(metricRepository: MetricRepository) {
    this._metrics = await metricRepository.findAll();
  }

  @computed
  get metrics(): MetricModel[] {
    return this._metrics;
  }

  @action.bound
  setMetrics(value: MetricModel[]) {
    this._metrics = value;
  }
}