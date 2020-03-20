import React from 'react';
import styles from './user.css'
import { history } from 'umi';
export default class User extends React.Component {

  componentDidMount(){

    console.log('ddddddddd')
    
    // this.dispatch({
    //   type:'user/demo'
    // })
  }

  render() {
    return (
      <div>
       约定路由
      </div>
    );
  }
}
