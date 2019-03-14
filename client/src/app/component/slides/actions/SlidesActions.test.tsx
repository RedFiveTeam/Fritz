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
      new SlideModel('test2', 'test2'),
      new SlideModel('test3', 'test3'),
      new SlideModel('test4', 'test4'),
      new SlideModel('test5', 'test5')
    ]);

    subject = new SlidesActions({} as any, {slidesStore, uploadStore} as any);
    subject.metricActions = metricActions;
  });

  it('update the slide model name when called', () => {
    subject.setAndUpdateActivity(slidesStore.slides[0], 'Test activity');
    expect(slidesStore.slides[0].newName).toBe('DDTTTTZMONYY_TGT_NAME_TEST_ACTIVITY_ASSET_CLASSIFICATION' + 1);

    subject.setAndUpdateDate('14TTTTZFEB19');
    expect(slidesStore.slides[1].newName).toBe('14TTTTZFEB19_TGT_NAME_ACTY_ASSET_CLASSIFICATION' + 2);

    subject.setAndUpdateOpName('op hello');
    expect(slidesStore.slides[2].newName).toBe('14TTTTZFEB19_OP_HELLO_ACTY_ASSET_CLASSIFICATION' + 3);

    subject.setAndUpdateAsset('asset');
    expect(slidesStore.slides[3].newName).toBe('14TTTTZFEB19_OP_HELLO_ACTY_ASSET_CLASSIFICATION' + 4);

    subject.setAndUpdateClassification('secret');
    expect(slidesStore.slides[4].newName).toBe('14TTTTZFEB19_OP_HELLO_ACTY_ASSET_SECRET' + 5);
  });

  it('should log metrics on download', async () => {
    await subject.trackRenameAndDownload();
    expect(metricActions.trackMetric).toHaveBeenCalled();
  });
});