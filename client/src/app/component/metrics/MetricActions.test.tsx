import { MetricActions } from './MetricActions';
import { MetricRepository } from './MetricRepository';
import { StubMetricRepository } from './StubMetricRepository';

describe('MetricActions', () => {
  let subject: MetricActions;
  let metricStore: any;
  let metricRepository: MetricRepository;

  beforeEach(() => {
    metricStore = {
      hydrate: jest.fn()
    };
    metricRepository = new StubMetricRepository();

    subject = new MetricActions({metricRepository} as any, {metricStore} as any);
  });

  it('should hydrate the metric store', async () => {
    await subject.initializeStores();
    expect(metricStore.hydrate).toHaveBeenCalled();
  });

});