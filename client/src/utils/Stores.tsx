import { UploadStore } from '../app/component/form/UploadStore';
import { SlidesStore } from '../app/component/slides/SlidesStore';
import { MetricStore } from '../app/component/metrics/MetricStore';

const uploadStore = new UploadStore();
const slidesStore = new SlidesStore();
const metricStore = new MetricStore();

export interface Stores {
  uploadStore: UploadStore;
  slidesStore: SlidesStore;
  metricStore: MetricStore;
}

export const stores = {
  uploadStore,
  slidesStore,
  metricStore
};