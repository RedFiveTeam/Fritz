import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { ActionsTimeCard } from './ActionsTimeCard';
import { MetricStore } from './MetricStore';
import { AverageSubsetModel } from '../average/AverageSubsetModel';

describe('ActionsTimeCard', () => {
  let subject: ReactWrapper;
  let metricStore: MetricStore;
  let metricActions: any;

  beforeEach(() => {
    metricStore = new MetricStore();

    metricStore.averages.setWorkflow([new AverageSubsetModel(123523521, 42)]);
    metricStore.averages.setDownload([new AverageSubsetModel(123523521, 42)]);
    metricStore.averages.setRename([new AverageSubsetModel(123523521, 42)]);
    metricStore.averages.setUpload([new AverageSubsetModel(123523521, 42)]);

    metricActions = {
      calculateWorkflowAverage: () => {
        return 42;
      },

      calculateAverageDifference: () => {
        return 1;
      },
      initializeStores: jest.fn(),

      calculateAverage: (average: string) => {
        if (average === 'workflow') {
          return '42';
        } else if (average === 'upload') {
          return '25';
        } else if (average === 'rename') {
          return '20';
        } else if (average === 'download') {
          return '16';
        }
        return null;
      },

      calculateAverages: jest.fn()
    };

    subject = mount(
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

  it('should display the difference in time for the averages', () => {
    expect(subject.find('.difference > span').at(0).text()).toBe('(+1 Seconds)');
  });
});