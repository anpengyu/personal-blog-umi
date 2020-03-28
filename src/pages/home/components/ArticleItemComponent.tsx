import 'braft-extensions/dist/code-highlighter.css';
import 'braft-editor/dist/index.css';
import React from 'react';
import { history } from 'umi';
import { Divider } from 'antd';
import moment from 'moment';
import styles from '../index.less';
import { ArticleItemProps } from '../data.d';
/**
 * 首页-文章列表-条目
 *
 * @author apy
 * @date 2020-03-20
 * @class ArticlesItemComponent
 */
export default class ArticleItemComponent extends React.Component<
  ArticleItemProps,
  any
> {
  onClickTitle = () => {
    const { item } = this.props;
    history.push(`/article/${item.id}`);
  };

  //发帖距现在多长时间
  times(date: Date): string {
    return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').fromNow();
  }

  //点击发帖用户
  clickUserName = () => {
    history.push('/userInfo');
  };

  render() {
    const { item } = this.props;
    const { user } = item;
    return (
      <div style={{ backgroundColor: '#fff', marginTop: 1, padding: 20 }}>
        <div>
          <div className={styles.article_title} onClick={this.onClickTitle}>
            {item.articleTitle}
          </div>
        </div>
        <div
          style={{
            maxLines: 2,
            color: '#999',
            textOverflow: 'ellipsis',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          {item.articleSubTitle}
        </div>

        <div
          style={{
            display: 'flex',
            height: '50px',
            lineHeight: '50px',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex' }}>
            <div
              style={{ display: 'flex', cursor: 'pointer' }}
              onClick={this.clickUserName.bind(this, user.id)}
            >
              <img
                style={{
                  height: 40,
                  width: 40,
                  marginTop: 5,
                  borderRadius: 50,
                }}
                src={require('../../../assets/head.jpg')}
              />
              <div className={styles.user_name}>{user.name}</div>
            </div>
            <div className={styles.article_bottom}>
              发布时间：{this.times(item.created_at)}
            </div>
          </div>
          {/* <div className={styles.article_bottom}>有疑问：{item.articledislikeCount}</div> */}
          <div style={{ display: 'flex', marginRight: 10 }}>
            <div className={styles.article_bottom}>
              访问：{item.articlePageView}
            </div>
            <div className={styles.article_bottom}>
              评论：{item.articleCommentCount}
            </div>
            <div className={styles.article_bottom}>
              获赞：{item.articlePraiseCount}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
