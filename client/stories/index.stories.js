import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { StyledSlideCard } from "../src/app/component/slides/slideCard/SlideCard";
import { SlideModel } from "../src/app/component/slides/models/SlideModel";
import { SlidesActions } from "../src/app/component/slides/actions/SlidesActions";
import { SlidesStore } from "../src/app/component/slides/store/SlidesStore";
import { MetricActions } from "../src/app/component/metrics/actions/MetricActions";
import { UploadStore } from "../src/app/component/form/upload/UploadStore";
import { UnicornStore } from "../src/app/component/unicorn/store/UnicornStore";
import { Provider } from "mobx-react";
import { UnicornActions } from "../src/app/component/unicorn/actions/UnicornActions";
import { ThemeProvider } from "styled-components";
import { Theme } from "../src/themes/default";
import { StyledFormContainer } from "../src/app/component/form/FormContainer";
import { UploadActions } from "../src/app/component/form/upload/actions/UploadActions";
import 'bootstrap/dist/css/bootstrap.css';


let slidesActions = new SlidesActions({}, {});
let slidesStore = new SlidesStore();
let metricActions = new MetricActions({}, {});
let uploadStore = new UploadStore();
let unicornStore = new UnicornStore();

const wrapper = (story) => {
  return (
    <ThemeProvider theme={Theme}>
      <div style={{background: 'linear-gradient(360deg,#1E222A 0%,#39414E 100%)'} }>
        {story()}
      </div>
    </ThemeProvider>
  );
};

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')}/>);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (<Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
  </Button>));

storiesOf('SlideCard', module)
  .addDecorator(story => wrapper(story))
  .add('default', () => {

    return (<Provider
      slidesActions={slidesActions}
      slidesStore={slidesStore}
      metricActions={metricActions}
      uploadStore={uploadStore}
      unicornStore={unicornStore}
      unicornActions={new UnicornActions({}, {})}
    >
      <StyledSlideCard
        slideNumber={1}
        slide={new SlideModel()}
        thumbnailClick={() => {
        }}
      />
    </Provider>);
  });

storiesOf('FormContainer', module)
  .addDecorator(story => wrapper(story))
  .add('offline', () => {
    // unicornStore.setOffline(true);
    return (
      <Provider
        slidesActions={slidesActions}
        slidesStore={slidesStore}
        metricActions={metricActions}
        uploadStore={uploadStore}
        unicornStore={unicornStore}
        unicornActions={new UnicornActions({}, {})}
        uploadActions={new UploadActions({}, {})}
      >
        <StyledFormContainer/>
      </Provider>
    );
  });
