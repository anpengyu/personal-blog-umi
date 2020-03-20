import React from 'react';
import styles from './demo.css';
import { history } from 'umi';
import { DatePicker,message} from 'antd';
import 'antd/dist/antd.css';

export default class Demo extends React.Component {

  componentDidMount(){
    message.error('aaa')
  }
  render() {
    return (
      <div local='zh'>
        <h1 className={styles.title}>Page demo</h1>
        <h1 className={styles.title}>Page demo</h1>
        <button onClick={() => { history.goBack(); }}>返回上一级</button>
        <DatePicker/>
      </div>
    );
  }


}
