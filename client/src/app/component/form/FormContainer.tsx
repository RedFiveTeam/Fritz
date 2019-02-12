import * as React from 'react';
import { observer } from 'mobx-react';

interface Props {
  className?: string;
}

interface State {
  nameFormat: {
    date: null | string,
    time: null | string,
    opName: null | string,
    asset: null | string,
    classification: null | string
  };
}

@observer
export class FormContainer extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      nameFormat: {
        date: null,
        time: null,
        opName: null,
        asset: null,
        classification: null
      }
    };
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="namingConvention mt-4 pt-5 pl-4">
          <span className="text-white">
            <h4>
            {
              (this.state.nameFormat.date || 'DDTTTTZMONYY') +
              (this.state.nameFormat.time || '') + '_TGT_' +
              (this.state.nameFormat.opName || 'NAME') +
              '_ACTIVITY_' +
              (this.state.nameFormat.asset || 'ASSET') + '_' +
              (this.state.nameFormat.classification || 'CLASSIFICATION')
            }
            </h4>
          </span>
        </div>
        <form className="w-50 pl-4 pt-3">
          <div className="form-group">
            <label className="text-white">Date*</label>
            <br/>
            <input
              type="date"
              data-name="date"
              onChange={(e: any) => {
                // let value = e.target.value;
                let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                let month = months[parseInt(e.target.value.substr(5, 2), 10) - 1];
                let year = e.target.value.substr(2, 2);
                let day = e.target.value.substr(8, 2);
                let newValue: any = day + 'TTTTZ' + month + year;
                this.setState(prevState => ({
                  nameFormat: {
                    ...prevState.nameFormat,
                    date: newValue
                  },
                }));
              }}
              className="form-control bg-dark d-inline-block w-75"
              id="dateInput"
              aria-describedby="emailHelp"
              placeholder="Select Date"
            />
          </div>
          <div className="form-group">
            <label className="text-white">Operation Name*
            </label>
            <input
              data-name="opName"
              onChange={(e: any) => {
                let value = e.target.value.split(' ').join('_').toUpperCase();
                this.setState(prevState => ({
                  nameFormat: {
                    ...prevState.nameFormat,
                    opName: value
                  },
                }));
              }}
              type="text"
              className="form-control bg-dark"
              id="opInput"
              placeholder="e.g. Op Jumpshot"
            />
          </div>
          <div className="form-group">
            <label className="text-white">Asset*
            </label>
            <input
              data-name="asset"
              onChange={(e: any) => {
                let value = e.target.value.split(' ').join('_').toUpperCase();
                this.setState(prevState => ({
                  nameFormat: {
                    ...prevState.nameFormat,
                    asset: value
                  },
                }));
              }}
              type="text"
              className="form-control bg-dark"
              id="assetInput"
              placeholder="Callsign"
            />
          </div>
          <div className="form-group">
            <label className="text-white">Classification*
            </label>
            <input
              data-name="classification"
              onChange={(e: any) => {
                let value = e.target.value.split(' ').join('_').toUpperCase();
                this.setState(prevState => ({
                  nameFormat: {
                    ...prevState.nameFormat,
                    classification: value
                  },
                }));
              }}
              type="text"
              className="form-control bg-dark"
              id="classificationInput"
              placeholder="e.g. FVEY"
            />
          </div>
          <p className="text-white-50">* = Required Field</p>
        </form>
      </div>
    );
  }
}
