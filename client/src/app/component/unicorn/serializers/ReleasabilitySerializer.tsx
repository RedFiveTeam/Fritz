import { Serializer } from '../../../../utils/Serializer';
import { ReleasabilityModel } from '../model/ReleasabilityModel';

export class ReleasabilitySerializer implements Serializer<ReleasabilityModel> {
  serialize(item: ReleasabilityModel): any {
    return {
      releasabilityId: item.releasabilityId,
      releasabilityName: item.releasabilityName
    };
  }

  deserialize(item: any): ReleasabilityModel {
    return new ReleasabilityModel(
      item.releasabilityId,
      item.releasabilityName
    );
  }
}