import { MetricStore } from './MetricStore';
import { MetricRepository } from './MetricRepository';
import { Stores } from '../../../utils/Stores';
import { Repositories } from '../../../utils/Repositories';
import { action } from 'mobx';

export class MetricActions {
  private metricStore: MetricStore;
  private readonly metricRepository: MetricRepository;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.metricStore = stores.metricStore!;
    this.metricRepository = repositories.metricRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.metricStore.hydrate(this.metricRepository);
  }
}