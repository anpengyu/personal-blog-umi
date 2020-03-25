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
    return moment(
      moment(date).format('YYYY-MM-DD HH:mm:ss'),
      'YYYY-MM-DD HH:mm:ss',
    ).fromNow();

    // //获取js 时间戳
    // var time = new Date().getTime();
    // //去掉 js 时间戳后三位，与php 时间戳保持一致
    // time = parseInt(String((time - date.getTime()) / 1000));

    // //存储转换值
    // var s;
    // if (time < 60 * 10) {//十分钟内
    //   return '刚刚';
    // } else if ((time < 60 * 60) && (time >= 60 * 10)) {
    //   //超过十分钟少于1小时
    //   s = Math.floor(time / 60);
    //   return s + "分钟前";
    // } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
    //   //超过1小时少于24小时
    //   s = Math.floor(time / 60 / 60);
    //   return s + "小时前";
    // } else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
    //   //超过1天少于3天内
    //   s = Math.floor(time / 60 / 60 / 24);
    //   return s + "天前";
    // } else {
    //   //超过3天
    //   // var moreDate = new Date(date.getTime());
    //   // return moreDate.getFullYear() + "/" + (moreDate.getMonth() + 1) + "/" + moreDate.getDate();
    //   return moment(date).format('YYYY-MM-DD HH:mm:ss')
    // }
  }

  render() {
    const { item } = this.props;
    return (
      <div style={{ backgroundColor: '#fff', marginTop: 1, padding: 10 }}>
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
          {item.articleSubtitle}
        </div>

        <div style={{ display: 'flex' }}>
          <div>有疑问：{item.articledislikeCount}</div>
          <div className={styles.article_bottom}>
            访问：{item.articlePageView}
          </div>
          <div className={styles.article_bottom}>
            评论：{item.articleCommentCount}
          </div>
          <div className={styles.article_bottom}>
            获赞：{item.articlePraiseCount}
          </div>
          <div className={styles.article_bottom}>
            发布时间：{this.times(item.createDate)}
          </div>
        </div>
        {/* <Divider /> */}
      </div>
    );
  }
}
