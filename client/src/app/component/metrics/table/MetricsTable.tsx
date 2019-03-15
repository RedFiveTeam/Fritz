import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { MetricStore } from '../MetricStore';
import { MetricActions } from '../actions/MetricActions';
import * as moment from 'moment';

interface Props {
  className?: string;
  metricStore?: MetricStore;
  metricActions?: MetricActions;
}

@observer
export class MetricsTable extends React.Component<Props> {

  async componentDidMount() {
    await this.props.metricActions!.initializeStores();
  }

  generateRows = (m: any, i: number) => {
    return (
      <tr
        id="metricsTableRow"
        key={i}
      >
        <td>{m.uid ? m.uid.substr(0, 6) : '000000'}</td>
        <td>{m.action}</td>
        <td>{moment.unix(m.startTime).format('MMMM D, YYYY @HHmm') + 'L'}</td>
        <td>{m.endTime ? parseInt(m.endTime, 10) - parseInt(m.startTime, 10) + 's' : 'n/a'}</td>
      </tr>
    );
  };

  render() {
    return (
      <div
        className={this.props.className}
      >
        <table
          id="metricsTable"
          className="w-100 table table-borderless table-responsive-lg"
        >
          <thead className="text-white">
          <tr>
            <th scope="col"><h3>UID</h3></th>
            <th scope="col"><h3>Action</h3></th>
            <th scope="col"><h3>Time</h3></th>
            <th scope="col"><h3>Time Taken</h3></th>
          </tr>
          </thead>
          <tbody className="text-white">
          {this.props.metricStore!.metrics.map((m, i) => {
            return this.generateRows(m, i);
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export const StyledMetricsTable = inject('metricStore', 'metricActions')(styled(MetricsTable)`
margin-left: 83px;
margin-top: 52px;
max-height: 1000px;
overflow-y: auto;
`);