import { SlidesActions } from './SlidesActions';
import { SlidesStore } from './SlidesStore';
import { SlideModel } from './SlideModel';
import { RenameRepository } from '../form/repositories/RenameRepository';

describe('SlidesActions', () => {
  let subject: SlidesActions;
  let slidesStore: SlidesStore;
  let renameRepository: RenameRepository;

  slidesStore = new SlidesStore();

  beforeEach(() => {
    slidesStore.setSlides([
      new SlideModel('test', 'test'),
      new SlideModel('test2', 'test2')
    ]);

    subject = new SlidesActions({renameRepository} as any, {slidesStore} as any);
  });

  it('update the slide model name when called', () => {
    subject.setAndUpdateDate('14TTTTZFEB19');
    for (let i = 0; i < slidesStore.slides.length; i++) {
      expect(slidesStore.slides[i].newName).toBe('14TTTTZFEB19_TGT_NAME_ACTIVITY_ASSET_CLASSIFICATION' + (i + 1));
    }
    subject.setAndUpdateOpName('op hello');
    for (let i = 0; i < slidesStore.slides.length; i++) {
      expect(slidesStore.slides[i].newName).toBe('14TTTTZFEB19_OP_HELLO_ACTIVITY_ASSET_CLASSIFICATION' + (i + 1));
    }

    subject.setAndUpdateAsset('ass');
    for (let i = 0; i < slidesStore.slides.length; i++) {
      expect(slidesStore.slides[i].newName).toBe('14TTTTZFEB19_OP_HELLO_ACTIVITY_ASS_CLASSIFICATION' + (i + 1));
    }

    subject.setAndUpdateClassification('secret');
    for (let i = 0; i < slidesStore.slides.length; i++) {
      expect(slidesStore.slides[i].newName).toBe('14TTTTZFEB19_OP_HELLO_ACTIVITY_ASS_SECRET' + (i + 1));
    }
  });
});