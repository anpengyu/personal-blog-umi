import React, { Fragment } from 'react';
import { ConnectRC, Loading, connect } from 'umi';
import ArticleItemComponent from './ArticleItemComponent';
import { ArticleItemProps, StateType, ALL_ARTICLES } from '../data.d';

import { Query, graphql } from 'react-apollo';

/**
 * 首页-文章列表
 *
 * @author apy
 * @date 2020-03-20
 * @class Articles
 */

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
                      <div key={index} style={{}}>
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
