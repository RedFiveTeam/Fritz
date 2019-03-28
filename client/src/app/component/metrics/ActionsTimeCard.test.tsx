import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ActionsTimeCard } from './ActionsTimeCard';
import { MetricModel } from './MetricModel';

describe('ActionsTimeCard', () => {
  let subject: ShallowWrapper;
  let metricStore: any;
  let metricActions: any;

  beforeEach(() => {

    metricActions = {
      calculateWorkflowAverage: () => {
        return 42;
      },
      calculateUploadAverage: () => {
        return 16;
      }
    };

    metricStore = {
      metrics: [
        new MetricModel(0, 'test1', 'Upload', '1551711488', '1551711498'),
        new MetricModel(1, 'test2', 'Upload', '1551711565', '1551711580'),
        new MetricModel(2, 'test3', 'Upload', '1551711512', '1551711535'),
        new MetricModel(3, 'test1', 'Download', '', '1551711518'),
        new MetricModel(4, 'test2', 'Download', '', '1551711600'),
        new MetricModel(5, 'test3', 'Download', '', '1551711572')
      ]
    };

    subject = shallow(
      <ActionsTimeCard
        metricActions={metricActions}
        metricStore={metricStore}
      />
    );
  });

  it('should contain an icon', () => {
    expect(subject.find('img').exists()).toBeTruthy();
  });

  it('should display the average time taken for workflows', () => {
    expect(subject.find('.averageTime > div').at(0).text()).toBe('42s');
  });

  it('should display the average time taken for upload', () => {
    expect(subject.find('.averageUpload > div').at(0).text()).toBe('16s');
  });
});