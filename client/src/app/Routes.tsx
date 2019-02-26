import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { StyledHomePage } from './page/HomePage';

interface Props {
  className?: string;
}

@observer
export class Routes extends React.Component<Props> {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/" render={() => <StyledHomePage/>}/>
      </Switch>
    );
  }
}