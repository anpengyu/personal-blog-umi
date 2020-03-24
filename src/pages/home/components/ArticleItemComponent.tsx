import 'braft-extensions/dist/code-highlighter.css';
import styles from '../index.less';
import 'braft-editor/dist/index.css';
import React from 'react';
import { history } from 'umi';
import { Divider } from 'antd';
import global from '../../../global.less';
import moment from 'moment';
/**
 * 首页-文章列表-条目
 *
 * @author apy
 * @date 2020-03-20
 * @class ArticlesItemComponent
 */
export default class Home extends React.Component {
  onClickTitle = () => {
    const { item } = this.props;
    history.push(`/article/${item.id}`);
  };

  render() {
    const { item } = this.props;
    return (
      <div style={{ backgroundColor: '#fff', height: 140 }}>
        <div style={{ padding: 10 }}>
          <div className={styles.article_title} onClick={this.onClickTitle}>
            {item.articleTitle}
          </div>
          <div>
            发布时间：{moment(item.createDate).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        </div>
        <div>有疑问：{item.articleContent}</div>
        <div style={{ display: 'flex' }}>
          <div>有疑问：{item.articledislikeCount}</div>
          <div>访问：{item.articlePageView}</div>
          <div>评论：{item.articleCommentCount}</div>
          <div>获赞：{item.articlePraiseCount}</div>
        </div>
        {/* <Divider /> */}
      </div>
    );
  }
}
