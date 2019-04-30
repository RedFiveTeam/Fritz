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
  let unicornStore: any;
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
      }),
      trackConversion: jest.fn()
    };

    unicornStore = {
      callouts: []
    };

    uploadRepository.upload = jest.fn(() => {
      return new UploadModel('chucknorris.pdf');
    });

    uploadRepository.status = jest.fn(() => {
      return Promise.resolve(new StatusModel(
        'complete', ['slide1.jpg', 'slide2.jpg', 'slide3.jpg'], ['1525', '', ''], 0, 3, '05MAR19', 'OP MATT', 'MATT 81'
      ));
    });

    uploadStore = new UploadStore();
    slidesStore = new SlidesStore();
    subject = new UploadActions(
      {uploadRepository, metricRepository} as any, {uploadStore, slidesStore, unicornStore} as any
    );
    subject.uploadProcessingComplete = jest.fn();
    subject.setDateInput = jest.fn();
    subject.setOpInput = jest.fn();
    subject.setCallsignInput = jest.fn();
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
    const file = new File(['(⌐□_□)'], 'chucknorris.pdf', {type: 'application/pdf'});
    await subject.upload({file: file});
    expect(uploadRepository.upload).toHaveBeenCalledWith({file: file});
    expect(uploadStore.uploaded).toBeTruthy();
    expect(uploadStore.fileName).toBe('chucknorris.pdf');
  });

  it('should populate the files and times in the model when checking status', async () => {
    await subject.checkStatus();
    expect(subject.uploadProcessingComplete).toHaveBeenCalled();
    expect(slidesStore.files).toEqual(['slide1.jpg', 'slide2.jpg', 'slide3.jpg']);
    expect(slidesStore.slides[0].oldName).toBe('slide1.jpg');
    expect(slidesStore.slides[1].oldName).toBe('slide2.jpg');
    expect(slidesStore.slides[2].oldName).toBe('slide3.jpg');
    expect(slidesStore.slides[0].time).toBe('1525');
  });

  it('should update the date when a status model is returned', async () => {
    await subject.checkStatus();
    expect(subject.setDateInput).toHaveBeenCalledWith('05MAR19');
  });

  it('should update the op when a status model with an operation is returned', async () => {
    await subject.checkStatus();
    expect(subject.setOpInput).toHaveBeenCalledWith('OP MATT');
  });

  it('should update the callsign when a status model with a callsign is returned', async () => {
    await subject.checkStatus();
    expect(subject.setCallsignInput).toHaveBeenCalledWith('MATT 81');
  });
});