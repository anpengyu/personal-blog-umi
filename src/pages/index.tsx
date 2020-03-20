import React from 'react';
import styles from './index.less';
import { history, Link } from 'umi';
import Articles from './home/components/Articles';
import RithtComponet from './home/components/RithtComponet';
import LeftComponent from './home/components/LeftComponent';

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
  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <LeftComponent />
          <Articles />
          <RithtComponet />
        </div>
      </div>
    );
  }
}
