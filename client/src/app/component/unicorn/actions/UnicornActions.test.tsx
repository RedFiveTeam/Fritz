import { UnicornActions } from './UnicornActions';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { StubUnicornRepository } from '../repositories/StubUnicornRepository';
import { SlideModel } from '../../slides/SlideModel';
import { UnicornUploadModel } from '../model/UnicornUploadModel';

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
      setPendingCallouts: jest.fn()
    };

    slidesStore = {
      slides: []
    };

    unicornRepository = new StubUnicornRepository();
    unicornRepository.upload = jest.fn(() => {
      return new UnicornUploadModel();
    });

    subject = new UnicornActions({unicornRepository} as any, {unicornStore} as any);
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

  it('should upload to unicorn', async () => {
    await subject.buildUploadModel(slide);
    expect(unicornRepository.upload).toHaveBeenCalled();
  });
});