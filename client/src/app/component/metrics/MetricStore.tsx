import { action, computed, observable } from 'mobx';
import { MetricModel } from './MetricModel';
import { MetricRepository } from './repository/MetricRepository';

export class MetricStore {
  @observable private _metrics: MetricModel[] = [];
  @observable private _pendingUploadMetric: MetricModel;
  @observable private _endTime: String;
  @observable private _pendingDownloadMetric: MetricModel;

  async hydrate(metricRepository: MetricRepository) {
    this._metrics = await metricRepository.findAll();
  }

  @computed
  get metrics(): MetricModel[] {
    return this._metrics;
  }

  @computed
  get pendingUploadMetric(): MetricModel {
    return this._pendingUploadMetric;
  }

  @computed
  get pendingDownloadMetric(): MetricModel {
    return this._pendingDownloadMetric;
  }

  @computed
  get endTime(): String {
    return this._endTime;
  }

  @action.bound
  setPendingDownloadMetric(value: MetricModel) {
    this._pendingDownloadMetric = value;
  }

  @action.bound
  setEndTime(value: String) {
    this._endTime = value;
  }

  @action.bound
  setMetrics(value: MetricModel[]) {
    this._metrics = value;
  }

  @action.bound
  setPendingUploadMetric(value: MetricModel) {
    this._pendingUploadMetric = value;
  }

  @action.bound
  setPendingDownloadEndTime(value: string) {
    this._pendingDownloadMetric.setEndTime(value);
  }
}