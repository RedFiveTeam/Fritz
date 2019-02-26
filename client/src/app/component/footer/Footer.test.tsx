import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Footer } from './Footer';
import { Provider } from 'mobx-react';
import { SlidesActions } from '../slides/SlidesActions';

describe('Footer', () => {
  let subject: ReactWrapper;

  beforeEach(() => {
    subject = mount(
      <Provider
        slidesActions={SlidesActions}
      >
        <Footer/>
      </Provider>
    );
  });

  it('should have a download button', () => {
    expect(subject.find('#downloadbutton').exists()).toBeTruthy();
  });
});