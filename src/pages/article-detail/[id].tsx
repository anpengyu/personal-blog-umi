import React from 'react';
import { Loading, connect, history } from 'umi';
import _ from 'lodash';
import styles from './index.less'
import { ArticleDetailProps, buildPreviewHtml } from './data.d';
import { Input } from 'antd'
import ContentComponent from './component/ContentComponent';

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

    return (
      <div>
        {
          article && !_.isEmpty(article) &&
          <div className={styles.normal}>
            <ContentComponent article={article} />
            <div style={{display:'flex'}}>
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
      </div>
    );
  }
}

export default connect(({ articleDetail, loading }: { articleDetail: {}; loading: Loading }) => ({
  articleDetail,
  loading: loading.models.user,
}))(ArticlesDetail)