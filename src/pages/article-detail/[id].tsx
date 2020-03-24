import React from 'react';
import { ConnectRC, Loading, connect } from 'umi';

interface PageProps {
    index: {};
    loading: boolean;
}
class ArticlesDetail extends React.Component {

    constructor(props: any) {
        super(props);
        props.dispatch({
            type: 'articleDetail/loadArticleDetail',
            payload: {
                id: props.match.params.id
            }
        })
    }
    buildPreviewHtml = (article) => {
        return `
          <!Doctype html>
          <html>
            <head>
              <title>Preview Content</title>
              <style>
                html,body{
                  height: 100%;
                  margin: 0;
                  padding: 0;
                  overflow: auto;
                  background-color: #f1f2f3;
                }
                .container{
                  box-sizing: border-box;
                  width: 1000px;
                  max-width: 100%;
                  min-height: 100%;
                  margin: 0 auto;
             
                  overflow: hidden;
                  background-color: #fff;
                  border-right: solid 1px #eee;
                  border-left: solid 1px #eee;
                }
                .container img,
                .container audio,
                .container video{
                  max-width: 100%;
                  height: auto;
                }
                .container p{
                    padding: 15px;
                  white-space: pre-wrap;
                  min-height: 1em;
                }
                .container pre{
                  padding: 15px;
                  background-color: #000;
                  border-radius: 5px;
                  color:#fff
                }
                .container blockquote{
                  margin: 0;
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-left: 3px solid #d1d1d1;
                }
              </style>
            </head>
            <body>
            <div class="container">${article.articleContent}</div>
            </body>
          </html>
        `
    
      }
    render() {
        const { articleDetail: { article = [] } } = this.props;
        console.log('articleItem', article)
        return (
            <div>
                <div>
                    <div>{article.articleTitle}</div>
                    <div>{article.createDate}</div>
                    <div>{article.updateDate}</div>
                    <div>{article.articlePraiseCount}</div>
                    <div>{article.articledislikeCount}</div>
                    <div>{article.articledislikeCount}</div>
                    <div>{article.articleCommentCount}</div>
                    <div dangerouslySetInnerHTML={{ __html: this.buildPreviewHtml(article)}}></div>
                </div>

            </div>
        );
    }
}

export default connect(({ articleDetail, loading }: { home: {}; loading: Loading }) => ({
    articleDetail,
    loading: loading.models.user,
}))(ArticlesDetail)