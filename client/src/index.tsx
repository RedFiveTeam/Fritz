import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { InjectedApp } from './app/App';
import { Provider } from 'mobx-react';
import { actions } from './utils/Actions';
import { stores } from './utils/Stores';

ReactDOM.render(
  <Provider
    {...stores}
    {...actions}
  >
    <InjectedApp/>
  </Provider>,
  document.getElementById('root')
);
