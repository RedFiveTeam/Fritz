import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { SlidesStore } from '../slides/SlidesStore';
import { SlideModel } from '../slides/SlideModel';

interface Props {
  className?: string;
  slidesStore?: SlidesStore;
}

@observer
export class ExpandedView extends React.Component<Props> {

  componentDidMount() {
    let ele = document.querySelector('.expandedView') as HTMLElement;
    if (ele !== null) {
      ele.onclick = (e: any) => {
        if (!ele.contains(e.target) || ele === e.target) {
          ele.style.display = 'none';
          let eles = document.querySelectorAll('.active');
          if (eles !== null) {
            for (let i = 0; i < eles.length; i++) {
              eles[i].classList.remove('active');
            }
          }
        }
      };
    }
  }

  getSlideName = (s: SlideModel, idx: number) => {
    return (
      <div key={idx} className="slide">
        {
          this.props.slidesStore!.day
        }
        {
          s.time === 'TTTT' ? <span className="text-info font-italic">TTTTZ</span> : <span>
            {s.time}Z
          </span>}
        {
          this.props.slidesStore!.month
        }
        {
          this.props.slidesStore!.year
        }
        {
          ('_' + (this.props.slidesStore!.opName || 'TGT_NAME') + '_').toUpperCase().split(' ').join('_')
        }
        {
          s.activity === 'ACTY' ? <span className="text-info font-italic">ACTY</span> : <span>
            {s.activity.split(' ').join('_')}
          </span>}
        {('_' + (this.props.slidesStore!.asset || 'ASSET') + '_' +
          (this.props.slidesStore!.classification || 'CLASSIFICATION'))
          .split(' ').join('_').toUpperCase()
        }
      </div>
    );
  };

  render() {
    return (
      <div
        className={this.props.className + ' expandedView'}
      >
        <div
          id="carousel"
          className="carousel slide"
          data-ride="false"
          data-interval="false"
        >
          <div className="carousel-inner">
            {
              this.props.slidesStore!.slides.map((s, idx) => {
                return (
                  <div
                    key={idx}
                    className="carousel-item"
                  >
                    <img src={'/api/image/' + idx} className="d-block" alt="..."/>
                    <div
                      className="numberAndTitle"
                    >
                      <div
                        className="slideNumber"
                      >
                        {idx + 1} of {this.props.slidesStore!.slides.length}
                      </div>
                      <div>{this.getSlideName(s, idx)}</div>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"/>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"/>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}

export const StyledExpandedView = inject('slidesStore')(styled(ExpandedView)`
background: rgba(0, 0, 0, 0.5);
top: 0;
left: 0;
bottom: 0;
right: 0;
margin: auto;
width: 100%;
height: 100%;
position: fixed;
z-index: 100;
display: none;
color: #FFF;
font-size: 22px;

  .slideNumber {
    font-size: 16px;
    margin: 18px;
  }

  .carousel {
    max-width: 1196px;
    margin: auto;
    top: 10%;
  }

  img {
    left: 10%;
    width: 960px;
    height: auto;
    position: relative;
  }
  
  .carousel-item {
    transition: transform 500ms ease, opacity 100ms ease-out
  }
  
  .numberAndTitle {
    text-align: center;
  }
  
  .carousel-control-prev-icon , .carousel-control-next-icon {
    height: 36px;
    width: 36px;
  }
  
  a {
    height: 720px;
  }
`);