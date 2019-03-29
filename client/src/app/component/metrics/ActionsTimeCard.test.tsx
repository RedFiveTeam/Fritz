import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ActionsTimeCard } from './ActionsTimeCard';
import { MetricStore } from './MetricStore';

describe('ActionsTimeCard', () => {
  let subject: ShallowWrapper;
  let metricStore: MetricStore;
  let metricActions: any;

  beforeEach(() => {

    metricActions = {
      calculateWorkflowAverage: () => {
        return 42;
      },

      calculateAverages: () => {
        metricStore.setDownloadAverage(16);
        metricStore.setRenameAverage(20);
        metricStore.setUploadAverage(25);
      }
    };

    metricStore = new MetricStore();

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
    expect(subject.find('.averageUpload > div').at(0).text()).toBe('25s');
  });

  it('should display the average time taken for rename', () => {
    expect(subject.find('.averageRename > div').at(0).text()).toBe('20s');
  });

  it('should display the average time taken for download', () => {
    expect(subject.find('.averageDownload > div').at(0).text()).toBe('16s');
  });
});