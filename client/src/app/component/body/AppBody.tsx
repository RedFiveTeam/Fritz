import * as React from 'react';
import { observer } from 'mobx-react';
import { FormContainer } from '../form/FormContainer';

interface Props {
  className?: string;
}

@observer
export class AppBody extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
          <FormContainer/>
      </div>
    );
  }
}
