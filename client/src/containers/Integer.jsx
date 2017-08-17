import React, { Component } from 'react';
import IncrementNumber from '../components/IncrementNumber/IncrementNumber';
import CurrNumber from '../components/CurrNumber/CurrNumber';

class Integer extends Component {
  render() {
    return (
      <div>
        <CurrNumber />
        <IncrementNumber />
      </div>
    );
  }
}

export default Integer;
