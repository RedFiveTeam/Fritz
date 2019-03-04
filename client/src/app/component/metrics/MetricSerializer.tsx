import { Serializer } from '../../../utils/Serializer';
import { MetricModel } from './MetricModel';

export class MetricSerializer implements Serializer<MetricModel> {
  serialize(item: MetricModel): {} {
    return {
      id: item.id,
      uid: item.uid,
      action: item.action,
      startTime: item.startTime,
      endTime: item.endTime
    };
  }

  deserialize(item: any): MetricModel {
    return new MetricModel(
      item.id,
      item.uid,
      item.action,
      item.startTime,
      item.endTime
    );
  }
}