import React, { Fragment } from 'react';
import { Loading, connect, history } from 'umi';
import _ from 'lodash';
import styles from './index.less'
import { ArticleDetailProps, buildPreviewHtml, ARTICLE_DETIAL } from './data.d';
import { Input } from 'antd'
import ContentComponent from './component/ContentComponent';
import CommentComponent from './component/CommentComponent';
import MutationComponent from './component/MutationComponent';
import { Query, graphql } from 'react-apollo';


class ArticlesDetail extends React.Component<ArticleDetailProps> {

  constructor(props){
    super(props);
    this.state={
      commentChange:'',
    }
  }

  changeComment=(e)=>{
    this.setState({
      commentChange:e.target.value
    })
  }

  render() {
    const { articleDetail: { article = [] } } = this.props;
    let id = this.props.match.params.id;
    return (
      <Query query={ARTICLE_DETIAL} variables={{ id }}>
        {({ loading, data }) => {
          console.log('dddddddddddddddddddddddddddddddddddddddddd')
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
                    <Input onChange={this.changeComment}></Input>
                    <MutationComponent content={this.state.commentChange} articleId={id}/>
                  </div>

                  <div className={styles.comment}>
                    评论区
                   <CommentComponent article={data.article} />
                    </div>
                </div>
              }
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

// export default connect(({ articleDetail, loading }: { articleDetail: {}; loading: Loading }) => ({
//   articleDetail,
//   loading: loading.models.user,
// }))(ArticlesDetail)

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
