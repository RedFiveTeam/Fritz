import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledMetricsTable } from '../component/metrics/MetricsTable';

interface Props {
  className?: string;
}

@observer
export class MetricsPage extends React.Component<Props> {

  render() {
    return (
      <div
        className={this.props.className}
      >
        <nav
          className="nav navbar-default"
        >
          <div
            id="bannerTitle"
          >
            Metrics
          </div>
        </nav>
        <StyledMetricsTable/>
      </div>
    );
  }
}

export const StyledMetricsPage = styled(MetricsPage)`
  #bannerTitle {
    margin: 16px 16px 16px 33px;
  }
  
  nav {
    font-size: 34px;
    color: #fff;
    background: #363E4A;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
`;