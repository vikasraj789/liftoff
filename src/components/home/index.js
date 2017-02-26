import React, { Component } from 'react';
import Background from '../background/index'
import {TextField, DatePicker, Slider, RaisedButton, CircularProgress} from 'material-ui';
import Classnames from 'classnames';
import areIntlLocalesSupported from 'intl-locales-supported';
import {areAllKeysEmpty} from '../../utils/index'
import {Modal, Button} from 'react-bootstrap'
import Moment from 'react-moment';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto'
},
  leftSideClas = Classnames({
  'name-start-holder': true,
  'm-r-10': true
}),
  rightSideClas = Classnames({
    'value-end-holder': true,
    'm-r-10': true
  }),
  progressStyle = {
    position: 'relative'
  };

let DateTimeFormat;

if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
  require('intl/locale-data/jsonp/fa-IR');
}

export default class Home extends Component {

  constructor(props) {
  super(props);

    const minDate = new Date();
    const maxDate = new Date(minDate.getTime() + 24 * 60 * 60 * 1000);
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: true,
      disableYearSelection: false,
      slider: 0,
      errObj: {}
    };
  }

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date
    });
    console.log(date);
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date
    });
  };

  handleSlider = (event, value) => {
    let errObj = this.state.errObj;
    errObj['slider'] = '';
    this.setState({
      slider: value,
      errObj: errObj
    });
  };

  handleEndDate = () => {
    let errObj = this.state.errObj;
    errObj['endDate'] = '';
    this.setState({
      errObj: errObj
    });
  };

  navigateToDashboard = (event, value) => {
    let state = this.state,
        errObj = this.state.errObj;

    if(!state.fullname) {
      errObj['fullname'] = 'Full name is required';
    }

    if(state.slider === 0) {
      errObj['slider'] = 'Value must be greater than 0';
    }

    if(state.minDate >= state.maxDate) {
      errObj['endDate'] = 'End date must be greater than start date'
    }

    this.setState({
      errObj: errObj
    });

    if(areAllKeysEmpty(this.state.errObj)) {
      this.setState({ show: true});
    }
  };


  handleFullNameChange = (event, value) => {
    let errObj = this.state.errObj;
    errObj['fullname'] = '';
    this.setState({
      fullname: value,
      errObj: errObj
    });
  };

  render() {
    let close = () => this.setState({ show: false});

    return (
      <div className="complete-wrapper">
        <Background />
        <div className="form-container">
          <h3 className="m-b-0">
            Enter your details:
          </h3>
          <div className="flex-container">
            <div className={leftSideClas}>
              <TextField
                hintText="Full name"
                floatingLabelText="Full name"
                onChange={this.handleFullNameChange}
              />
              <div className="err-txt">
                {this.state.errObj.fullname ? this.state.errObj.fullname : ''}
              </div>
              <div>
                <div style={optionsStyle}>
                  <DatePicker
                    onChange={this.handleChangeMinDate}
                    autoOk={this.state.autoOk}
                    floatingLabelText="Start date"
                    minDate={this.state.minDate}
                    value={this.state.minDate}
                    defaultDate={this.state.minDate}
                    disableYearSelection={this.state.disableYearSelection}
                    formatDate={new DateTimeFormat('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }).format}
                  />
                </div>
              </div>
            </div>
            <div className={rightSideClas}>
              <div className="value-holder">
                <span className="title">Value:</span> <span className="slider-value">{this.state.slider}</span>

              </div>
              <div className="value-wrapper">
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  defaultValue={0}
                  value={this.state.slider}
                  onChange={this.handleSlider}
                />
              </div>
              <div className="err-txt">
                {this.state.errObj.slider ? this.state.errObj.slider : ''}
              </div>
              <div style={optionsStyle}>
                <DatePicker
                  onChange={this.handleChangeMaxDate}
                  autoOk={this.state.autoOk}
                  floatingLabelText="End date"
                  minDate={this.state.maxDate}
                  value={this.state.maxDate}
                  defaultDate={this.state.maxDate}
                  disableYearSelection={this.state.disableYearSelection}
                  formatDate={new DateTimeFormat('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }).format}
                  onFocus={this.handleEndDate}
                />
                <div className="err-txt">
                  {this.state.errObj.endDate ? this.state.errObj.endDate : ''}
                </div>
              </div>
            </div>
          </div>
          <div className="goto-reports">
            <RaisedButton label="GO TO REPORTS" onClick={this.navigateToDashboard} primary={true} />
          </div>
        </div>
        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header className="modal-heading" closeButton>
            <Modal.Title id="contained-modal-title">Report:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
              <tbody>
              <tr>
                <th>Full name</th>
                <td>{this.state.fullname}</td>
              </tr>
              <tr>
                <th>Start date</th>
                <td><Moment format="DD/MMM/YY">{this.state.minDate}</Moment></td>
              </tr>
              <tr>
                <th>End date</th>
                <td><Moment format="DD/MMM/YY">{this.state.maxDate}</Moment></td>
              </tr>
              <tr>
                <th>Value</th>
                <td style={progressStyle}>
                  <CircularProgress
                  mode="determinate"
                  value={this.state.slider}
                  size={80}
                  thickness={5}
                  className="progress-holder"
                />
                  <div className="text-holder">
                    {this.state.slider}%
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}