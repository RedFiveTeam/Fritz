import { Serializer } from '../../../utils/Serializer';
import { StatusModel } from './StatusModel';

export class StatusSerializer implements Serializer<StatusModel> {
  serialize(item: StatusModel): any {
    return {
      status: item.status
    };
  }

  deserialize(item: any): StatusModel {
    return new StatusModel(
      item.status
    );
  }
}