import { action, computed, observable } from 'mobx';
import { ClassificationRepository } from '../repositories/ClassificationRepository';
import { ClassificationModel } from '../ClassificationModel';

export class ClassificationStore {
  @observable private _classification: string;

  async hydrate(assificationRepository: ClassificationRepository) {
    let classModel: ClassificationModel = await assificationRepository.get();
    this._classification = classModel.classification;
  }

  @computed
  get classification(): string {
    return this._classification;
  }

  @action.bound
  setClassification(value: string) {
    this._classification = value;
  }
}