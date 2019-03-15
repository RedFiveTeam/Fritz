import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { StyledMetricsTable } from './MetricsTable';
import { StubMetricRepository } from '../repository/StubMetricRepository';
import { MetricStore } from '../MetricStore';
import moment = require('moment');

describe('MetricsTable', () => {
  let subject: ReactWrapper;
  let metricStore: MetricStore;
  let metricActions: any;

  let metricRepository: StubMetricRepository;
  metricRepository = new StubMetricRepository();

  metricStore = new MetricStore();

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
    let m = moment().unix();

    expect(subject.find('#metricsTableRow').exists()).toBeTruthy();
    expect(subject.find('td').at(0).text()).toBe('e223sd');
    expect(subject.find('td').at(1).text()).toBe('Upload');
    expect(subject.find('td').at(2).text()).toBe(moment.unix(m).format('MMMM D, YYYY @HHmm') + 'L');
  });
});