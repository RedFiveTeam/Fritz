import { UnicornStore } from '../store/UnicornStore';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { Repositories } from '../../../../utils/Repositories';
import { Stores } from '../../../../utils/Stores';
import { action } from 'mobx';

export class UnicornActions {
  private unicornStore: UnicornStore;
  private readonly unicornRepository: UnicornRepository;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.unicornStore = stores.unicornStore!;
    this.unicornRepository = repositories.unicornRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.unicornStore.hydrate(this.unicornRepository);
  }
}