import { UploadActions } from './UploadActions';
import { UploadRepository } from '../repository/UploadRepository';
import { UploadStore } from '../UploadStore';
import { StubUploadRepository } from '../repository/StubUploadRepository';
import { UploadModel } from '../UploadModel';
import { StatusModel } from '../../status/StatusModel';
import { SlidesStore } from '../../../slides/SlidesStore';
import { MetricRepository } from '../../../metrics/repository/MetricRepository';
import { StubMetricRepository } from '../../../metrics/repository/StubMetricRepository';

describe('UploadActions', () => {
  let subject: UploadActions;
  let uploadRepository: UploadRepository;
  let metricRepository: MetricRepository;
  let uploadStore: UploadStore;
  let slidesStore: SlidesStore;
  let metricActions: any;

  beforeEach(() => {

    uploadRepository = new StubUploadRepository();
    metricRepository = new StubMetricRepository();

    metricActions = {
      trackMetric: jest.fn(async () => {
        await Promise.resolve();
      }),
      updateMetric: jest.fn(async () => {
        await Promise.resolve();
      })
    };

    uploadRepository.upload = jest.fn(() => {
      return new UploadModel('chucknorris.ppt');
    });

    uploadRepository.status = jest.fn(() => {
      return Promise.resolve(new StatusModel('complete', ['slide1.png', 'slide2.png', 'slide3.png'], 0, 3));
    });

    uploadStore = new UploadStore();
    slidesStore = new SlidesStore();
    subject = new UploadActions({uploadRepository, metricRepository} as any, {uploadStore, slidesStore} as any);
    subject.uploadProcessingComplete = jest.fn();
    subject.metricActions = metricActions;
  });

  it('should set uploaded, processing and conversionStatus to true, and placeholder to false when upload is called',
     async () => {
      await subject.upload({});
      expect(uploadStore.uploaded).toBeTruthy();
      expect(uploadStore.processing).toBeTruthy();
      expect(uploadStore.ConversionStatus).toBeTruthy();
      expect(uploadStore.placeholder).toBeFalsy();
    });

  it('should pass the file to the backend', async () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.ppt', {type: 'application/vnd.ms-powerpoint'});
    await subject.upload({file: file});
    expect(uploadRepository.upload).toHaveBeenCalledWith({file: file});
    expect(uploadStore.uploaded).toBeTruthy();
    expect(uploadStore.fileName).toBe('chucknorris.ppt');
  });

  it('should populate the files in the model when checking status', async () => {
    await subject.checkStatus();
    expect(subject.uploadProcessingComplete).toHaveBeenCalled();
    expect(slidesStore.files).toEqual(['slide1.png', 'slide2.png', 'slide3.png']);
    expect(slidesStore.slides[0].oldName).toBe('slide1.png');
    expect(slidesStore.slides[1].oldName).toBe('slide2.png');
    expect(slidesStore.slides[2].oldName).toBe('slide3.png');
  });
});