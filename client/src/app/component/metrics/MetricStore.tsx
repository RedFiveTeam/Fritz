import { action, computed, observable } from 'mobx';
import { MetricModel } from './MetricModel';
import { MetricRepository } from './repository/MetricRepository';
import { AverageModel } from '../average/AverageModel';

export class MetricStore {
  @observable private _metrics: MetricModel[] = [];
  @observable private _pendingUploadMetric: MetricModel;
  @observable private _endTime: String;
  @observable private _pendingDownloadMetric: MetricModel;
  @observable private _pendingConversionMetric: MetricModel;
  @observable private _pendingRenamingMetric: MetricModel;
  @observable private _filteredMetrics: MetricModel[] = [];
  @observable private _filterValue: number = 9007199254740991;
  @observable private _averages: AverageModel = new AverageModel();

  async hydrate(metricRepository: MetricRepository) {
    this._metrics = await metricRepository.findAll();
    if (this._filteredMetrics.length === 0) {
      this._filteredMetrics = this._metrics;
    }
  }

  @computed
  get averages(): AverageModel {
    return this._averages;
  }

  @computed
  get filterValue(): number {
    return this._filterValue;
  }

  @computed
  get filteredMetrics(): MetricModel[] {
    return this._filteredMetrics;
  }

  @computed
  get pendingRenamingMetric(): MetricModel {
    return this._pendingRenamingMetric;
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
  get pendingConversionMetric(): MetricModel {
    return this._pendingConversionMetric;
  }

  @computed
  get endTime(): String {
    return this._endTime;
  }

  @action.bound
  setAverage(value: AverageModel) {
    this._averages = value;
  }

  @action.bound
  setFilterValue(value: number) {
    this._filterValue = value;
  }

  @action.bound
  setPendingRenamingMetric(value: MetricModel) {
    this._pendingRenamingMetric = value;
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

  @action.bound
  setPendingConversionMetric(value: MetricModel) {
    this._pendingConversionMetric = value;
  }

  @action.bound
  setFilteredMetrics(value: MetricModel[]) {
    this._filteredMetrics = value;
  }
}