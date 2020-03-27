import React, { Fragment } from 'react';
import { Loading, connect, history } from 'umi';
import _ from 'lodash';
import styles from './index.less'
import { ArticleDetailProps, buildPreviewHtml, ARTICLE_DETIAL } from './data.d';
import { Input } from 'antd'
import ContentComponent from './component/ContentComponent';
import { Query, graphql } from 'react-apollo';

class ArticlesDetail extends React.Component<ArticleDetailProps> {

  constructor(props: any) {
    super(props);
    props.dispatch({
      type: 'articleDetail/loadArticleDetail',
      payload: {
        id: props.match.params.id
      }
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'articleDetail/updateState',
      payload: {
        article: []
      }
    })
  }



  render() {
    const { articleDetail: { article = [] } } = this.props;
    let id = this.props.match.params.id;
    return (
      <Query query={ARTICLE_DETIAL} variables={{ id }}>
        {({ loading, data }) => {
          if (loading) return <div>loading......</div>;
          return (
            <Fragment>
              {
                data.article && !_.isEmpty(data.article) &&
                <div className={styles.normal}>
                  <ContentComponent article={data.article} />
                  <div style={{ display: 'flex',backgroundColor:'#fff' }}>
                    <img
                      style={{
                        height: 40,
                        width: 40,
                        marginTop: 5,
                        borderRadius: 50,
                      }}
                      src={require('../../assets/head.jpg')}
                    />
                    <Input></Input>
                  </div>
                  <div className={styles.comment}>评论区</div>
                </div>
              }
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default connect(({ articleDetail, loading }: { articleDetail: {}; loading: Loading }) => ({
  articleDetail,
  loading: loading.models.user,
}))(ArticlesDetail)