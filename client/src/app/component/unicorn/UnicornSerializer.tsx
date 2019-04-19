import { Serializer } from '../../../utils/Serializer';
import { MissionModel } from './model/MissionModel';

export class UnicornSerializer implements Serializer<MissionModel> {
  serialize(item: MissionModel): any {
    return {
      id: item.id,
      startTime: item.startTime,
      callsign: item.callsign,
      description: item.description,
      status: item.status
    };
  }

  deserialize(item: any): MissionModel {
    return new MissionModel(
      item.id,
      item.startTime,
      item.callsign,
      item.description,
      item.status
    );
  }
}