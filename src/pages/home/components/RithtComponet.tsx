import React from 'react';
import { connect } from 'dva';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
];
export default class Articles extends React.Component {
  render() {
    return (
      <div style={{ display: 'inline-block', width: '30%', paddingLeft: 20 }}>
        <div>少时诵诗书所</div>
      </div>
    );
  }
}
