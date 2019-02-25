import { UploadStore } from '../app/component/form/UploadStore';
import { SlidesStore } from '../app/component/slides/SlidesStore';

const uploadStore = new UploadStore();
const slidesStore = new SlidesStore();

export interface Stores {
  uploadStore: UploadStore;
  slidesStore: SlidesStore;
}

export const stores = {
  uploadStore,
  slidesStore
};