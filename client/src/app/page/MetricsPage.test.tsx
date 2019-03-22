import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsPage } from './MetricsPage';
import { StyledMetricsTable } from '../component/metrics/table/MetricsTable';
import { StyledActionsTimeCard } from '../component/metrics/ActionsTimeCard';

describe('MetricsPage', () => {
  let subject: ShallowWrapper;
  let metricActions: any;
  let classificationStore: any;
  let classificationActions: any;

  beforeEach(() => {
    classificationStore = {
      classification: 'UNCLASS'
    };

    classificationActions = {
      initializeStore: jest.fn()
    };

    metricActions = {
      exportMetrics: jest.fn()
    };

    subject = shallow(
      <MetricsPage
        metricActions={metricActions}
        classificationStore={classificationStore}
        classificationActions={classificationActions}
      />
    );
  });

  it('should render the metrics table', () => {
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
});