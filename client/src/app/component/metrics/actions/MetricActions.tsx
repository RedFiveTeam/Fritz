import { MetricStore } from '../MetricStore';
import { MetricRepository } from '../repository/MetricRepository';
import { Stores } from '../../../../utils/Stores';
import { Repositories } from '../../../../utils/Repositories';
import { action } from 'mobx';
import { MetricModel } from '../MetricModel';
import { UploadStore } from '../../form/upload/UploadStore';
import moment = require('moment');

export class MetricActions {
  private metricStore: MetricStore;
  private uploadStore: UploadStore;
  private readonly metricRepository: MetricRepository;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.metricStore = stores.metricStore!;
    this.uploadStore = stores.uploadStore!;
    this.metricRepository = repositories.metricRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.metricStore.hydrate(this.metricRepository);
  }

  @action.bound
  async trackMetric(act: string) {
    let metric = new MetricModel(null, this.uploadStore.hash, act, Math.round((Date.now() / 1000)).toString(), null);
    this.metricStore['setPending' + act + 'Metric'](await this.metricRepository.create(metric));
  }

  @action.bound
  async updateMetric(act: string) {
    if (act === 'Upload') {
      this.metricStore['pending' + act + 'Metric'].setUid(this.uploadStore.hash);
    }
    this.metricStore['pending' + act + 'Metric'].setEndTime(Math.round((Date.now() / 1000)).toString());
    await this.metricRepository.update(this.metricStore['pending' + act + 'Metric']);
  }

  @action.bound
  async createMetric(act: string) {
    let metric = new MetricModel(null, this.uploadStore.hash, act, Math.round((Date.now() / 1000)).toString(), null);
    await this.metricRepository.create(metric);
  }

  @action.bound
  exportMetrics() {
    const a = document.createElement('a');
    const array = ['uid,action,time_taken\r\n'];

    const file = new Blob(
      array.concat(this.metricStore.metrics.slice().reverse().map((m: MetricModel) => {
        let endTime = parseFloat(m.endTime!);
        let startTime = parseFloat(m.startTime);
        let timeTaken = endTime - startTime;
        return moment.unix(startTime).format('MMMM Do YYYY H:mm') + 'L' +
          ',' + m.uid +
          ',' + m.action +
          ',' + timeTaken + 's' +
          '\r\n';
      })),
      {type: 'text/plain'}
    );
    a.href = URL.createObjectURL(file);
    a.download = 'metrics.csv';
    a.click();
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(file, 'metrics.csv');
    }
  }

  @action.bound
  calculateWorkflowAverage(met: MetricModel[]) {
    let metrics = met;
    let flowTimes: number[] = [];
    let set = new Set<string>();
    for (let i = 0; i < metrics.length; i++) {
      set.add(metrics[i].uid);
    }
    for (let item of set) {
      let startTime: string | null;
      let endTime;
      metrics.filter((m) => {
        return m.uid === item;
      })
        .map((metric) => {
          if (metric.action === 'Upload') {
            startTime = metric.startTime;
          }
          if (metric.action === 'Download' && metric.endTime) {
            endTime = metric.endTime;
            if (startTime && endTime) {
              flowTimes.push(parseInt(endTime, 10) - parseInt(startTime, 10));
              startTime = null;
              endTime = null;
            }
          }
        });
    }
    return Math.round(flowTimes.reduce((a, b) => a + b, 0) / flowTimes.length);
  }

  @action.bound
  async calculateAverages() {
    let flowTimes: any = {
      downloadTimes: [],
      renameTimes: [],
      uploadTimes: []
    };
    await this.initializeStores();
    this.metricStore.metrics.map((m: MetricModel) => {
      if (m.action === 'Renaming' && m.startTime && m.endTime) {
        flowTimes.renameTimes.push(parseInt(m.endTime, 10) - parseInt(m.startTime, 10));
      } else if (m.action === 'Upload' && m.startTime && m.endTime) {
        flowTimes.uploadTimes.push(parseInt(m.endTime, 10) - parseInt(m.startTime, 10));
      } else if (m.action === 'Download' && m.startTime && m.endTime) {
        flowTimes.downloadTimes.push(parseInt(m.endTime, 10) - parseInt(m.startTime, 10));
      }
    });
    this.metricStore.setDownloadAverage(Math.round(
      flowTimes.downloadTimes.reduce((a: number, b: number) => a + b, 0) / flowTimes.downloadTimes.length)
    );
    this.metricStore.setUploadAverage(Math.round(
      flowTimes.uploadTimes.reduce((a: number, b: number) => a + b, 0) / flowTimes.uploadTimes.length)
    );
    this.metricStore.setRenameAverage(Math.round(
      flowTimes.renameTimes.reduce((a: number, b: number) => a + b, 0) / flowTimes.renameTimes.length)
    );
  }

  @action.bound
  filterMetrics(option: number) {
    this.metricStore.setFilteredMetrics(
      this.metricStore.metrics.filter((m: MetricModel) => {
        return moment().unix() - parseInt(m.startTime, 10) < option;
      }));
  }
}