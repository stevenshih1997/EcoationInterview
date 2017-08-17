import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class CurrNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currNumber: null,
      secondsElapsed: 0,
    };
  }
  componentDidMount() {
    this.interval = setInterval(this.getInteger(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getInteger() {
    console.log('get');
    axios.get('/user/getInt', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        console.log('hi');
        console.log(response);
        this.setState({
          currNumber: response.currNumber,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="displayInt">
        {this.state.currNumber}
      </div>
    );
  }
}

export default CurrNumber;
