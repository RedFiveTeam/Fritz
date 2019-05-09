import { UploadStore } from '../app/component/form/upload/UploadStore';
import { SlidesStore } from '../app/component/slides/store/SlidesStore';
import { MetricStore } from '../app/component/metrics/MetricStore';
import { ClassificationStore } from '../app/component/classification/store/ClassificationStore';
import { UnicornStore } from '../app/component/unicorn/store/UnicornStore';

const uploadStore = new UploadStore();
const slidesStore = new SlidesStore();
const metricStore = new MetricStore();
const classificationStore = new ClassificationStore();
const unicornStore = new UnicornStore();

export interface Stores {
  uploadStore: UploadStore;
  slidesStore: SlidesStore;
  metricStore: MetricStore;
  classificationStore: ClassificationStore;
  unicornStore: UnicornStore;
}

export const stores = {
  uploadStore,
  slidesStore,
  metricStore,
  classificationStore,
  unicornStore
};