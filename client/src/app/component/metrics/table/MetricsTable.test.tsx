import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { StyledMetricsTable } from './MetricsTable';
import { StubMetricRepository } from '../repository/StubMetricRepository';
import { MetricStore } from '../MetricStore';
import moment = require('moment');
import { MetricModel } from '../MetricModel';

describe('MetricsTable', () => {
  let subject: ReactWrapper;
  let metricStore: MetricStore;
  let metricActions: any;

  let metricRepository: StubMetricRepository;
  metricRepository = new StubMetricRepository();

  metricStore = new MetricStore();

  metricStore.setMetrics([
    new MetricModel(0, 'test1', 'Upload', '1551711488', '1551711498'),
    new MetricModel(1, 'test2', 'Upload', '1551711565', '1551711580'),
    new MetricModel(2, 'test3', 'Upload', '1551711512', '1551711535'),
    new MetricModel(3, 'test1', 'Download', '1551711512', '1551711518'),
    new MetricModel(4, 'test2', 'Download', '1551711565', '1551711600'),
    new MetricModel(5, 'test3', 'Download', '1551711488', '1551711572'),
    new MetricModel(6, 'test1', 'Renaming', '1551711488', '1551711498'),
    new MetricModel(7, 'test2', 'Renaming', '1551711565', '1551711580'),
    new MetricModel(8, 'test3', 'Renaming', '1551711512', '1551711535')
  ]);

  metricActions = {
    initializeStores: () => { return Promise.resolve(metricStore.hydrate(metricRepository)); }
  };

  beforeEach(() => {
    subject = mount(
      <StyledMetricsTable
        metricActions={metricActions}
        metricStore={metricStore}
      />
    );
  });

  it('should display a table of metrics', () => {
    expect(subject.find('#metricsTable').exists()).toBeTruthy();
  });

  it('should render some specific column names', () => {
    expect(subject.find('th').at(0).text()).toBe('UID');
    expect(subject.find('th').at(1).text()).toBe('Action');
    expect(subject.find('th').at(2).text()).toBe('Time');
  });

  it('should display some metrics', () => {
    expect(subject.find('#metricsTableRow').exists()).toBeTruthy();
    expect(subject.find('td').at(0).text()).toBe('test3');
    expect(subject.find('td').at(1).text()).toBe('Renaming');
    expect(subject.find('td').at(2).text()).toBe(moment.unix(1551711512).format('MMMM D, YYYY @HHmm') + 'L');
  });
});