import React from 'react';
import styles from './index.less';
import { history, Link } from 'umi';
import Articles from './components/Articles';
import RithtComponet from './components/RithtComponet';
import LeftComponent from './components/LeftComponent';

/**
 * 主界面
 *  左侧
 *  右侧 文章系列，文章标签
 *  中间文章列表
 * @author apy
 * @date 2020-03-20
 * @returns
 */
export default class Index extends React.Component {
  componentDidMount() {
    console.log('componentDidMount', this.props);
  }

  render() {
    return (
      <div>
        <div className={styles.normal}>
          <div style={{ display: 'flex' }}>
            {/* <LeftComponent /> */}
            <Articles />
            <RithtComponet />
          </div>
        </div>
      </div>
    );
  }
}
