import React from 'react';
import styles from './index.less';
import { history, Link } from 'umi';
import Articles from './components/Articles'
import RithtComponet from './components/RithtComponet'
import LeftComponent from './components/LeftComponent'

export default class Index extends React.Component{
  render(){
    return (
      <div>
        <div style={{display: 'flex',justifyContent:'space-between'}}>
          <LeftComponent/>
          <Articles/>
          <RithtComponet/>
        </div>
      
      </div>
    );
  }


}
