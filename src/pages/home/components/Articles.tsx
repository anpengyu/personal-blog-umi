import React from 'react';
import { ConnectRC, Loading, connect } from 'umi';
import ArticleItemComponent from './ArticleItemComponent';
import { ArticleItemProps, StateType } from '../data.d';

/**
 * 首页-文章列表
 *
 * @author apy
 * @date 2020-03-20
 * @class Articles
 */
class Articles extends React.Component<ArticleItemProps, any> {
  componentDidMount() {
    this.props.dispatch({
      type: 'home/loadNewArticle',
    });
  }

  render() {
    const {
      home: { articleList = [] },
    } = this.props;
    return (
      <div style={{ display: 'inline-block', width: '70%' }}>
        <div>ddddddddddd</div>
        <div>ddddddddddd</div>
        <div>ddddddddddd</div>
        <div>
          {articleList.map((item, index: number) => {
            return (
              <div key={index}>
                <ArticleItemComponent item={item} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ home, loading }: { home: StateType; loading: Loading }) => ({
    home,
    loading: loading.models.user,
  }),
)(Articles);
