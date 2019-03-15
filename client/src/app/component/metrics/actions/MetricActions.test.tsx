import { MetricActions } from './MetricActions';
import { MetricRepository } from '../repository/MetricRepository';
import { StubMetricRepository } from '../repository/StubMetricRepository';
import { MetricModel } from '../MetricModel';

describe('MetricActions', () => {
  let subject: MetricActions;
  let metricStore: any;
  let metricRepository: MetricRepository;
  let uploadStore: any;

  beforeEach(() => {
    metricStore = {
      setPendingUploadMetric: jest.fn(),
      hydrate: jest.fn(),
      setEndTime: jest.fn(),
      pendingUploadMetric: new MetricModel(null, 'hi', 'Upload', '1', null),
      pendingDownloadMetric: new MetricModel(null, 'hi', 'Download', '1', null)
    };

    uploadStore = {
      hash: 'eresersr'
    };

    metricRepository = new StubMetricRepository();

    subject = new MetricActions({metricRepository} as any, {metricStore, uploadStore} as any);
  });

  it('should hydrate the metric store', async () => {
    await subject.initializeStores();
    expect(metricStore.hydrate).toHaveBeenCalled();
  });

  it('should track a metric', async () => {
    await subject.trackMetric('Upload');
    expect(metricStore.setPendingUploadMetric).toHaveBeenCalled();
  });

  it('should update the tracked metric', async () => {
    await subject.updateMetric('Download');
    expect(metricStore.pendingDownloadMetric.endTime).toBeTruthy();
  });

});