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
      countUploads: () => { return 3; },
      countDownloads: () => { return 4; },
      countDeletes: () => { return 1; }
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

  it('should contain total zips downloaded', () => {
    expect(subject.find('.totalDownloadCount').text()).toBe('4');
  });

  it('should contain the total JPEGs deleted', () => {
    expect(subject.find('.totalDeleteCount').text()).toBe('1');
  });
});