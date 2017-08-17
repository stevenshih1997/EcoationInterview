import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class IncrementNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currNumber: null,
    };
  }
  incrementNumber = (event) => {
    event.preventDefault();
    axios.post('/user/nextInt', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <Button
        bsSize="large"
        type="submit"
        onClick={this.incrementNumber}
      >Increment
      </Button>
    );
  }
}

export default IncrementNumber;
