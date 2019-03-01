import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsPage } from './MetricsPage';
import { StyledMetricsTable } from '../component/metrics/MetricsTable';

describe('MetricsPage', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<MetricsPage/>);
  });

  it('should render the metrics table', () => {
    expect(subject.find(StyledMetricsTable).exists()).toBeTruthy();
  });

  it('should have a metrics page banner', () => {
    expect(subject.find('#bannerTitle').text()).toBe('Metrics');
  });
});