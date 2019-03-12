import { SlidesActions } from './SlidesActions';
import { SlidesStore } from '../SlidesStore';
import { SlideModel } from '../SlideModel';

describe('SlidesActions', () => {
  let subject: SlidesActions;
  let slidesStore: SlidesStore;
  let metricActions: any;
  let uploadStore: any;

  slidesStore = new SlidesStore();

  uploadStore = {
    hash: 'ewerwerw'
  };

  metricActions = {
    trackMetric: jest.fn(() => {
      return Promise.resolve();
    }),
    updateMetric: jest.fn(() => {
      return Promise.resolve();
    })
  };

  beforeEach(() => {
    slidesStore.setSlides([
      new SlideModel('test', 'test'),
      new SlideModel('test2', 'test2')
    ]);

    subject = new SlidesActions({} as any, {slidesStore, uploadStore} as any);
    subject.metricActions = metricActions;
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
    await subject.trackRenameAndDownload();
    expect(metricActions.trackMetric).toHaveBeenCalled();
  });
});