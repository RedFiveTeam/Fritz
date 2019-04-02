import { MetricStore } from '../MetricStore';
import { MetricRepository } from '../repository/MetricRepository';
import { Stores } from '../../../../utils/Stores';
import { Repositories } from '../../../../utils/Repositories';
import { action } from 'mobx';
import { MetricModel } from '../MetricModel';
import { UploadStore } from '../../form/upload/UploadStore';
import moment = require('moment');
import { AverageSubsetModel } from '../../average/AverageSubsetModel';

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
    await this.setWorkflowAverage();
    await this.setAverages();
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
  async setWorkflowAverage() {
    let metrics = this.metricStore.filteredMetrics;
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
        .map((m) => {
          if (m.action === 'Upload') {
            startTime = m.startTime;
          }
          if (m.action === 'Download' && m.endTime) {
            endTime = m.endTime;
            if (startTime && endTime) {
              this.metricStore.averages.workflow.push(
                new AverageSubsetModel(parseInt(startTime, 10), (parseInt(endTime, 10) - parseInt(startTime, 10)))
              );
              startTime = null;
              endTime = null;
            }
          }
        });
    }
  }

  @action.bound
  async setAverages() {
    this.metricStore.filteredMetrics.map((m: MetricModel) => {
      if (m.action === 'Renaming' && m.startTime && m.endTime) {
        this.metricStore.averages.rename.push(
          new AverageSubsetModel(parseInt(m.startTime, 10), (parseInt(m.endTime, 10) - parseInt(m.startTime, 10)))
        );
      } else if (m.action === 'Upload' && m.startTime && m.endTime) {
        this.metricStore.averages.upload.push(
          new AverageSubsetModel(parseInt(m.startTime, 10), (parseInt(m.endTime, 10) - parseInt(m.startTime, 10)))
        );
      } else if (m.action === 'Download' && m.startTime && m.endTime) {
        this.metricStore.averages.download.push(
          new AverageSubsetModel(parseInt(m.startTime, 10), (parseInt(m.endTime, 10) - parseInt(m.startTime, 10)))
        );
      }
    });
  }

  @action.bound
  async filterMetrics(option: number) {
    this.metricStore.setFilterValue(option);
    this.metricStore.setFilteredMetrics(
      this.metricStore.metrics.filter((m: MetricModel) => {
        return moment().unix() - parseInt(m.startTime, 10) < option;
      })
    );
    await this.setAverages();
    await this.setWorkflowAverage();
  }

  @action.bound
  calculateAverage(average: string, filter: number) {
    let averages = (this.metricStore.averages[average] as AverageSubsetModel[])
      .filter((asm: AverageSubsetModel) => {
        return moment().unix() - asm.startTime < filter;
      });
    let time: number = 0;
    for (let i = 0; i < averages.length; i++) {
      time = time + averages[i].timeTaken;
    }
    return Math.round(time / averages.length);
  }

  @action.bound
  calculateAverageDifference(average: string) {
    let filter = this.metricStore.filterValue;
    let oldAverages = (this.metricStore.averages[average] as AverageSubsetModel[])
      .filter((asm: AverageSubsetModel) => {
        return moment().unix() - asm.startTime < filter;
      });
    let oldTime: number = 0;
    for (let i = 0; i < oldAverages.length; i++) {
      oldTime = oldTime + oldAverages[i].timeTaken;
    }
    let oldAverage = Math.round(oldTime / oldAverages.length);

    let newTime: number = 0;
    let time = moment().unix();
    let newAverages = (this.metricStore.averages[average] as AverageSubsetModel[]).filter((asm: AverageSubsetModel) => {
      return time - asm.startTime > filter && time - asm.startTime < filter * 2;
    });
    for (let i = 0; i < newAverages.length; i++) {
      newTime = newTime + newAverages[i].timeTaken;
    }
    let newAverage = Math.round(newTime / newAverages.length);
    return oldAverage - newAverage;
  }
}