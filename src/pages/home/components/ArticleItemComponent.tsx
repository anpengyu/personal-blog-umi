import React from 'react';
import { history } from 'umi';
import global from '../../../global.less';

/**
 * 首页-文章列表-条目
 *
 * @author apy
 * @date 2020-03-20
 * @class ArticlesItemComponent
 */
export default (props: { item: any }) => {
  const { item } = props;

  const onClickTitle = () => {
    console.log('item.id', item.id);
    history.push(`/article/${item.id}`);
  };

  return (
    <div style={{ marginTop: 30 }}>
      <div className={global.click_mouse} onClick={onClickTitle}>
        {item.articleTitle}
      </div>
      <div>{item.createDate}</div>

      <div style={{ display: 'flex' }}>
        <div>{item.articledislikeCount}</div>
        <div>{item.articlePageView}</div>
        <div>{item.articleCommentCount}</div>
        <div>{item.articlePraiseCount}</div>
      </div>
      <div>{item.articleContent}</div>
    </div>
  );
};
