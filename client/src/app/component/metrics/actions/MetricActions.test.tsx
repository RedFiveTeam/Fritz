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
      metrics: [
        new MetricModel(0, 'test1', 'Upload', '1551711488', '1551711498'),
        new MetricModel(1, 'test2', 'Upload', '1551711565', '1551711580'),
        new MetricModel(2, 'test3', 'Upload', '1551711512', '1551711535'),
        new MetricModel(3, 'test1', 'Download', '', '1551711518'),
        new MetricModel(4, 'test2', 'Download', '', '1551711600'),
        new MetricModel(5, 'test3', 'Download', '', '1551711572'),
        new MetricModel(6, 'test1', 'Renaming', '1551711488', '1551711498'),
        new MetricModel(7, 'test2', 'Renaming', '1551711565', '1551711580'),
        new MetricModel(8, 'test3', 'Renaming', '1551711512', '1551711535')
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
    expect(subject.calculateWorkflowAverage(metricStore.metrics)).toBe(42);
  });

  it('should be able to calculate the correct average upload time', () => {
    expect(subject.calculateUploadAverage(metricStore.metrics)).toBe(16);
  });

  it('should be able to calculate the correct rename time', () => {
    expect(subject.calculateRenameAverage(metricStore.metrics)).toBe(16);
  });
});