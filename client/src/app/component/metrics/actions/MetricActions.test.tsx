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
      pendingDownloadMetric: new MetricModel(null, 'hi', 'Download', '1', null),
      setFilteredMetrics: jest.fn(),
      metrics: [
        new MetricModel(0, 'test1', 'Upload', '1551711488', null),
        new MetricModel(1, 'test2', 'Upload', '1551711565', null),
        new MetricModel(2, 'test3', 'Upload', '1551711512', null),
        new MetricModel(3, 'test1', 'Download', '', '1551711518'),
        new MetricModel(4, 'test2', 'Download', '', '1551711600'),
        new MetricModel(5, 'test3', 'Download', '', '1551711572')
      ]
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

  it('should be able to calculate the correct average workflow', () => {
    expect(subject.calculateAverage(metricStore.metrics)).toBe(42);
  });

  it('should filter the metrics based on the option', () => {
    subject.filterMetrics(60 * 60 * 24);
    expect(metricStore.setFilteredMetrics).toHaveBeenCalled();
  });
});