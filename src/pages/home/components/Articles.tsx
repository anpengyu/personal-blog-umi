import React, { Fragment } from 'react';
import { ConnectRC, Loading, connect } from 'umi';
import ArticleItemComponent from './ArticleItemComponent';
import { ArticleItemProps, StateType } from '../data.d';

import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';

/**
 * 首页-文章列表
 *
 * @author apy
 * @date 2020-03-20
 * @class Articles
 */

const ALL_ARTICLES = gql`
  # 获取所有文章/用户信息
  query AllArticles {
    allArticles {
      id
      articleTitle
      articleSubTitle
      articlePageView
      articlePraiseCount
      articleDislikeCount
      articleCommentCount
      created_at
      user {
        id
        name
        sex
        headImg
      }
    }
  }
`;

export default class Articles extends React.Component<ArticleItemProps, any> {
  render() {
    return (
      <Fragment>
        <div style={{ display: 'inline-block', width: '70%' }}>
          <Query query={ALL_ARTICLES}>
            {({ loading, data }) => {
              if (loading) return <div>loading......</div>;
              return (
                <Fragment>
                  {data.allArticles.map((item, index: number) => {
                    return (
                      <div key={index} style={{ paddingTop: 20 }}>
                        <ArticleItemComponent item={item} />
                      </div>
                    );
                  })}
                </Fragment>
              );
            }}
          </Query>
        </div>
      </Fragment>
    );
  }
}

// export default connect(
//   ({ home, loading }: { home: StateType; loading: Loading }) => ({
//     home,
//     loading: loading.models.user,
//   }),
// )(Articles);
