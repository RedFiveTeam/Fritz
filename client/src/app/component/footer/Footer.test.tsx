import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Footer } from './Footer';
import { Provider } from 'mobx-react';
import { SlidesActions } from '../slides/SlidesActions';
import { UploadStore } from '../form/UploadStore';
import { SlidesStore } from '../slides/SlidesStore';

describe('Footer', () => {
  let subject: ReactWrapper;

  beforeEach(() => {
    subject = mount(
      <Provider
        slidesActions={SlidesActions}
        uploadStore={UploadStore}
        slidesStore={SlidesStore}
      >
        <Footer/>
      </Provider>
    );
  });

  it('should have a download button', () => {
    expect(subject.find('#downloadbutton').exists()).toBeTruthy();
  });
});