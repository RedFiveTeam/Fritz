import { CSSProperties } from 'react';

export const Theme = Object.freeze({
  fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
  fontWeight: '300',
  fontSize: '16',
  fontColor: '#fff',
  background: 'linear-gradient(360deg,#1E222A 0%,#39414E 100%)'
});

export const badLabelCSS: CSSProperties = {
  color: '#e46373'
};

export const badInputCSS: CSSProperties = {
  border: '1px solid #e46373'
};

export const goodCSS: CSSProperties = {
};

export const badCallsignCSS: CSSProperties = {
  border: '1px solid #ae4754',
  borderRadius: '7px'
};

export const badReleasabilityCSS: CSSProperties = {
  borderWidth: '1px 1px 1px 0',
  borderRadius: '0 4px 4px 0',
  borderStyle: 'solid',
  borderColor: '#ae4754'
};

export const badClassificationCSS: CSSProperties = {
  borderWidth: '1px 0px 1px 1px',
  borderRadius: '4px 0 0 4px',
  borderStyle: 'solid',
  borderColor: '#ae4754'
};