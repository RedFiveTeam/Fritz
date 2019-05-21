import { UnicornActions } from './UnicornActions';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { StubUnicornRepository } from '../repositories/StubUnicornRepository';
import { SlideModel } from '../../slides/SlideModel';
import { UnicornUploadModel } from '../model/UnicornUploadModel';
import { CalloutModel } from '../model/CalloutModel';

describe('UnicornActions', () => {
  let subject: UnicornActions;
  let unicornStore: any;
  let slidesStore: any;
  let unicornRepository: UnicornRepository;
  let slide = new SlideModel();

  beforeEach(() => {
    unicornStore = {
      hydrate: jest.fn(),
      setCallouts: jest.fn(),
      setPendingUpload: jest.fn(),
      activeMission: jest.fn(),
      releasabilityId: jest.fn(),
      releasabilities: jest.fn(),
      setUploadComplete: jest.fn(),
      setCurrentUploadCount: jest.fn(),
      setPendingCallouts: jest.fn(),
      uploadQueue: [new SlideModel(), new SlideModel()],
      setReleasabilities: jest.fn(),
      uploadsInProgress: false,
      setUploadsInProgress: jest.fn(),
      setUnassignedCallouts: jest.fn()
    };

    slidesStore = {
      slides: []
    };

    unicornRepository = new StubUnicornRepository();
    unicornRepository.upload = jest.fn(() => {
      return new UnicornUploadModel();
    });
    subject = new UnicornActions({unicornRepository} as any, {unicornStore, slidesStore} as any);

    subject.metricActions.updateMetric = jest.fn();
  });

  it('should hydrate the unicorn store', async () => {
    await subject.initializeStores();
    expect(unicornStore.hydrate).toHaveBeenCalled();
  });

  it('should set the callouts when getCallouts is called', async () => {
    let checkForCalloutMatchesSpy = jest.fn();
    subject.checkForCalloutMatches = checkForCalloutMatchesSpy;

    await subject.getCallouts('test');
    expect(unicornStore.setCallouts).toHaveBeenCalled();
    expect(unicornStore.setPendingCallouts).toHaveBeenCalledWith(false);
    expect(checkForCalloutMatchesSpy).toHaveBeenCalled();
  });

  it('should get releasabilities from unicorn', async () => {
    await subject.getReleasabilities();
    expect(unicornStore.setReleasabilities).toHaveBeenCalled();
  });

  it('should set the unicorn model with some stuff from the slide model', async () => {
    let returnValue = await subject.setUnicornModel(new SlideModel('TestName', '', '', '', false, 'eventId', ''));
    expect(returnValue.fileName).toBe('TestName');
    expect(returnValue.productName).toBe('TestName');
    expect(returnValue.targetEventId).toBe('eventId');
  });

  it('should upload to unicorn and shift the queue', async () => {
    let isUploadFinishedSpy = jest.fn();
    subject.isUploadFinished = isUploadFinishedSpy;
    await subject.buildUploadModel(slide);
    expect(unicornRepository.upload).toHaveBeenCalled();
    expect(isUploadFinishedSpy).toHaveBeenCalled();
  });

  it('should go through the queue and upload', async () => {
    let buildUploadModelSpy = jest.fn(() => {
      unicornStore.uploadQueue.shift();
    });
    subject.buildUploadModel = buildUploadModelSpy;

    await subject.startUploading();
    expect(buildUploadModelSpy).toHaveBeenCalledTimes(2);
  });

  it('should check for unassigned callouts', () => {
    slidesStore.slides = [
      new SlideModel('', '', '', '', false, 'eventId', ''),
      new SlideModel('', '', '', '', false, '', ''),
      new SlideModel('', '', '', '', false, '', '')
    ];

    subject.checkForUnassignedCallouts();
    expect(unicornStore.setUnassignedCallouts).toHaveBeenCalledWith(true);
  });

  it('should check for callout matches and match them', () => {
    slidesStore.slides = [
      new SlideModel('', '', '1234', '', false, 'eventId', ''),
      new SlideModel('', '', '2345', '', false, '', ''),
      new SlideModel('', '', '3456', '', false, '', '')
    ];

    unicornStore.callouts = [
      new CalloutModel('name', 'class', 'rel', 'acty', 'evntid', '1234'),
      new CalloutModel('name', 'class', 'rel', 'acty', 'evntid2', '2345'),
      new CalloutModel('name', 'class', 'rel', 'acty', 'evntid3', '3456')
    ];
    subject.checkForCalloutMatches();

    expect(slidesStore.slides[0].targetEventId).toBe('evntid');
    expect(slidesStore.slides[1].targetEventId).toBe('evntid2');
    expect(slidesStore.slides[2].targetEventId).toBe('evntid3');
  });
});