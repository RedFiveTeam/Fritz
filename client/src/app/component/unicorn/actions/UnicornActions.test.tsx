import { UnicornActions } from './UnicornActions';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { StubUnicornRepository } from '../repositories/StubUnicornRepository';

describe('UnicornActions', () => {
  let subject: UnicornActions;
  let unicornStore: any;
  let slidesStore: any;
  let unicornRepository: UnicornRepository;

  beforeEach(() => {
    unicornStore = {
      hydrate: jest.fn(),
      setCallouts: jest.fn()
    };

    slidesStore = {
      slides: []
    };

    unicornRepository = new StubUnicornRepository();

    subject = new UnicornActions({unicornRepository} as any, {unicornStore, slidesStore} as any);
  });

  it('should hydrate the unicorn store', async () => {
    await subject.initializeStores();
    expect(unicornStore.hydrate).toHaveBeenCalled();
  });

  it('should set the callouts when getCallouts is called', async () => {
    await subject.getCallouts('test');
    expect(unicornStore.setCallouts).toHaveBeenCalled();
  });

});