import React from 'react';
import { ConnectRC, Loading, connect } from 'umi';
import ArticleItemComponent from './ArticleItemComponent';

interface PageProps {
  index: {};
  loading: boolean;
}
/**
 * 首页-文章列表
 *
 * @author apy
 * @date 2020-03-20
 * @class Articles
 */
class Articles extends React.Component {
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
      <div style={{ display: 'inline-block' }}>
        <div>热门</div>
        <div>最新</div>
        <div>推荐</div>
        <div>
          {' '}
          {articleList.map(
            (item: { articleTitle: React.ReactNode }, index: number) => {
              return (
                <div key={index}>
                  <ArticleItemComponent item={item} />
                </div>
              );
            },
          )}
        </div>
      </div>
    );
  }
}

export default connect(({ home, loading }: { home: {}; loading: Loading }) => ({
  home,
  loading: loading.models.user,
}))(Articles);
