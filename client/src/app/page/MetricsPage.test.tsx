import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsPage } from './MetricsPage';
import { StyledMetricsTable } from '../component/metrics/table/MetricsTable';
import { StyledActionsTimeCard } from '../component/metrics/ActionsTimeCard';

describe('MetricsPage', () => {
  let subject: ShallowWrapper;
  let metricActions: any;

  beforeEach(() => {

    metricActions = {
      exportMetrics: jest.fn(),
      filterMetrics: jest.fn()
    };

    subject = shallow(
      <MetricsPage
        metricActions={metricActions}
      />
    );
  });

  it('should render the dashboard', () => {
    expect(subject.find(StyledActionsTimeCard).exists()).toBeTruthy();
    expect(subject.find(StyledMetricsTable).exists()).toBeTruthy();
  });

  it('should have a metrics page banner', () => {
    expect(subject.find('#bannerTitle').text()).toBe('Metrics');
  });

  it('should have an export metrics button that exports metrics', () => {
    subject.find('.exportMetrics').simulate('click');
    expect(metricActions.exportMetrics).toHaveBeenCalled();
  });

  it('should contain an actions time card', () => {
    expect(subject.find(StyledActionsTimeCard).exists()).toBeTruthy();
  });

  it('should display a select menu with options for filtering metrics', () => {
    expect(subject.find('.sortSelector').simulate('change', {target: {value: 60 * 60 * 24}}));
    expect(metricActions.filterMetrics).toHaveBeenCalledWith(60 * 60 * 24);
  });

  it('should render two different tabs', () => {
    expect(subject.find('#tab1').exists()).toBeTruthy();
    expect(subject.find('#tab2').exists()).toBeTruthy();
  });
});