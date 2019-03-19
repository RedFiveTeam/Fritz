import { MetricStore } from '../MetricStore';
import { MetricRepository } from '../repository/MetricRepository';
import { Stores } from '../../../../utils/Stores';
import { Repositories } from '../../../../utils/Repositories';
import { action } from 'mobx';
import { MetricModel } from '../MetricModel';
import { UploadStore } from '../../form/upload/UploadStore';

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
}