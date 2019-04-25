import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UserActionsCard } from './UserActionsCard';
import { MetricStore } from './MetricStore';

describe('UserActionsCard', () => {
  let subject: ShallowWrapper;
  let metricStore: MetricStore;
  let metricActions: any;

  beforeEach(() => {

    metricStore = new MetricStore();

    metricActions = {
      initializeStores: jest.fn(),
      setTotalUploads: jest.fn(),
      countUploads: () => { return 3; }
    };

    subject = shallow(
      <UserActionsCard
        metricActions={metricActions}
        metricStore={metricStore}
      />
    );
  });

  it('should contain an icon', () => {
    expect(subject.find('img').exists()).toBeTruthy();
  });

  it('should contain total slides uploaded', () => {
    expect(subject.find('.totalUploadCount').text()).toBe('3');
  });

});