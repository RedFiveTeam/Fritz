import { action, computed, observable } from 'mobx';
import { MetricModel } from './MetricModel';
import { MetricRepository } from './repository/MetricRepository';

export class MetricStore {
  @observable private _metrics: MetricModel[] = [];
  @observable private _pendingUploadMetric: MetricModel;
  @observable private _endTime: String;
  @observable private _pendingDownloadMetric: MetricModel;
  @observable private _pendingConversionMetric: MetricModel;
  @observable private _pendingRenamingMetric: MetricModel;
  @observable private _uploadAverage: number;
  @observable private _renameAverage: number;
  @observable private _downloadAverage: number;

  async hydrate(metricRepository: MetricRepository) {
    this._metrics = await metricRepository.findAll();
  }

  @computed
  get uploadAverage(): number {
    return this._uploadAverage;
  }

  @computed
  get renameAverage(): number {
    return this._renameAverage;
  }

  @computed
  get downloadAverage(): number {
    return this._downloadAverage;
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
  setUploadAverage(value: number) {
    this._uploadAverage = value;
  }

  @action.bound
  setRenameAverage(value: number) {
    this._renameAverage = value;
  }

  @action.bound
  setDownloadAverage(value: number) {
    this._downloadAverage = value;
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

}