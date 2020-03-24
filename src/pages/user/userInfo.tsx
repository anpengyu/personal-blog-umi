import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import { history, Link } from 'umi';
import { Tooltip, Input, Button, Divider } from 'antd';

/**
 * 个人中心
 *
 * @author apy
 * @date 2020-03-24
 * @class UserInfo
 */
class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className={styles.bg}>个人中心</div>;
  }
}

export default connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))(UserInfo);
