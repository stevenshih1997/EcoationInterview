import React, { Component } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import querystring from 'querystring';
import './IncrementNumber.css';

class IncrementNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currInt: '',
      setInt: '',
    };
    this.onClick = this.incrementNumber.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
  }
  // Use API post request to increment integer
  incrementNumber = (event) => {
    event.preventDefault();
    axios.post('/user/nextInt', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        this.setState({
          currInt: response.data.currInt,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Use API post request to replace integer
  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/user/changeInt',
      querystring.stringify({
        currInt: this.input.value,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        this.setState({
          currInt: this.input.value,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="SetNumberForm">
        <form onSubmit={this.handleSubmit}>
          <div className="IntScreen">{this.state.currInt}</div>
          <Button
            className="IncrementButton center-block"
            bsSize="large"
            type="button"
            onClick={this.incrementNumber}
          >Increment
          </Button>
          <div className="text-center">
            <FormGroup controlId="currInt" bsSize="large">
              <input
                placeholder="Set number"
                ref={(element) => { this.input = element; }}
              />
            </FormGroup>
          </div>
          <Button
            className="center-block"
            bsSize="large"
            type="submit"
          >Set New Number
          </Button>
        </form>
      </div>
    );
  }
}

export default IncrementNumber;
