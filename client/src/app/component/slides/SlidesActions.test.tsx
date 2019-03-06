import { SlidesActions } from './SlidesActions';
import { SlidesStore } from './SlidesStore';
import { SlideModel } from './SlideModel';
import { RenameRepository } from '../form/repositories/RenameRepository';
import { MetricModel } from '../metrics/MetricModel';

describe('SlidesActions', () => {
  let subject: SlidesActions;
  let slidesStore: SlidesStore;
  let renameRepository: RenameRepository;
  let metricRepository: any;
  let uploadStore: any;

  slidesStore = new SlidesStore();

  uploadStore = {
    hash: 'ewerwerw'
  };

  metricRepository = {
    create: jest.fn(() => {
      return Promise.resolve(new MetricModel(1, 'test', 'download', '23512512', '235123512512'));
    }),
    update: () => {
      return Promise.resolve();
    }
  };

  beforeEach(() => {
    slidesStore.setSlides([
      new SlideModel('test', 'test'),
      new SlideModel('test2', 'test2')
    ]);

    subject = new SlidesActions({renameRepository, metricRepository} as any, {slidesStore, uploadStore} as any);
  });

  it('update the slide model name when called', () => {
    subject.setAndUpdateDate('14TTTTZFEB19');
    for (let i = 0; i < slidesStore.slides.length; i++) {
      expect(slidesStore.slides[i].newName).toBe('14TTTTZFEB19_TGT_NAME_ACTY_ASSET_CLASSIFICATION' + (i + 1));
    }
    subject.setAndUpdateOpName('op hello');
    for (let i = 0; i < slidesStore.slides.length; i++) {
      expect(slidesStore.slides[i].newName).toBe('14TTTTZFEB19_OP_HELLO_ACTY_ASSET_CLASSIFICATION' + (i + 1));
    }

    subject.setAndUpdateAsset('ass');
    for (let i = 0; i < slidesStore.slides.length; i++) {
      expect(slidesStore.slides[i].newName).toBe('14TTTTZFEB19_OP_HELLO_ACTY_ASS_CLASSIFICATION' + (i + 1));
    }

    subject.setAndUpdateClassification('secret');
    for (let i = 0; i < slidesStore.slides.length; i++) {
      expect(slidesStore.slides[i].newName).toBe('14TTTTZFEB19_OP_HELLO_ACTY_ASS_SECRET' + (i + 1));
    }
  });

  it('should log metrics on download', async () => {
    await subject.renameAndDownload();
    expect(metricRepository.create).toHaveBeenCalled();
  });
});