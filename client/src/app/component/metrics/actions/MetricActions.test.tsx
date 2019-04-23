import { MetricActions } from './MetricActions';
import { MetricRepository } from '../repository/MetricRepository';
import { StubMetricRepository } from '../repository/StubMetricRepository';
import { MetricModel } from '../MetricModel';
import * as moment from 'moment';

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
      setUploadAverage: jest.fn(),
      setRenameAverage: jest.fn(),
      setDownloadAverage: jest.fn(),
      uploadAverage: jest.fn(),
      renameAverage: jest.fn(),
      downloadAverage: jest.fn(),
      setFilteredMetrics: jest.fn(),
      setFilterValue: jest.fn(),
      setTotalUploads: jest.fn(),
      metrics: [
        new MetricModel(0, 'test1', 'Upload', '1551711488', '1551711498'),
        new MetricModel(1, 'test2', 'Upload', '1551711565', '1551711580'),
        new MetricModel(2, 'test3', 'Upload', '1551711512', '1551711535'),
        new MetricModel(3, 'test1', 'Download', '1551711512', '1551711518'),
        new MetricModel(4, 'test2', 'Download', '1551711565', '1551711600'),
        new MetricModel(5, 'test3', 'Download', '1551711488', '1551711572'),
        new MetricModel(6, 'test1', 'Renaming', '1551711488', '1551711498'),
        new MetricModel(7, 'test2', 'Renaming', '1551711565', '1551711580'),
        new MetricModel(8, 'test3', 'Renaming', '1551711512', '1551711535')
      ],
      filteredMetrics: [
        new MetricModel(0, 'test1', 'Upload', '1551711488', '1551711498'),
        new MetricModel(1, 'test2', 'Upload', '1551711565', '1551711580'),
        new MetricModel(2, 'test3', 'Upload', '1551711512', '1551711535'),
        new MetricModel(3, 'test1', 'Download', '1551711512', '1551711518'),
        new MetricModel(4, 'test2', 'Download', '1551711565', '1551711600'),
        new MetricModel(5, 'test3', 'Download', '1551711488', '1551711572'),
        new MetricModel(6, 'test1', 'Renaming', '1551711488', '1551711498'),
        new MetricModel(7, 'test2', 'Renaming', '1551711565', '1551711580'),
        new MetricModel(8, 'test3', 'Renaming', '1551711512', '1551711535')
      ],
      averages: {
        download: [],
        upload: [],
        rename: [],
        workflow: []
      },
      filterValue: moment().unix() - 1551711563
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

  it('should filter the metrics based on the option', async () => {
    await subject.filterMetrics(60 * 60 * 24);
    expect(metricStore.setFilteredMetrics).toHaveBeenCalled();
  });

  it('should be able to calculate the correct averages for upload, rename and download', async () => {
    await subject.setAverages();
    expect(metricStore.averages.download.length).toBe(3);
    expect(metricStore.averages.upload.length).toBe(3);
    expect(metricStore.averages.rename.length).toBe(3);
  });

  it('should calculate the average for the filtered metrics', async () => {
    await subject.setAverages();
    expect(subject.calculateAverage('download', 60 * 60 * 24 * 10000000)).toBe(42);
  });

  it('should calculate the average difference for the filtered metrics', async () => {
    await subject.setAverages();
    expect(subject.calculateAverageDifference('download')).toBe(-10);
  });
});