import { UploadStore } from '../app/component/form/upload/UploadStore';
import { SlidesStore } from '../app/component/slides/SlidesStore';
import { MetricStore } from '../app/component/metrics/MetricStore';
import { ClassificationStore } from '../app/component/classification/store/ClassificationStore';

const uploadStore = new UploadStore();
const slidesStore = new SlidesStore();
const metricStore = new MetricStore();
const classificationStore = new ClassificationStore();

export interface Stores {
  uploadStore: UploadStore;
  slidesStore: SlidesStore;
  metricStore: MetricStore;
  classificationStore: ClassificationStore;
}

export const stores = {
  uploadStore,
  slidesStore,
  metricStore,
  classificationStore
};