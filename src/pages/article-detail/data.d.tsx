import { Dispatch } from 'react';
import gql from 'graphql-tag';
export interface ArticleDetailProps {
  dispatch: Dispatch<any>;
  articleDetail?: any;
}

interface article {
  articleTitle: string;
  createDate: string;
  updateDate: string;
  articlePraiseCount: number;
  articlePageView: number;
  articledislikeCount: number;
  articleCommentCount: number;
  articleContent: string;
}

export interface StateType {
  article: article;
}

export const ARTICLE_DETIAL = gql`
  # 根据文章id获取文章详情
  query ArticleDetail($id: ID!) {
    article(id: $id) {
      id
      userId
      articleTitle
      articleContent
      articlePageView
      articlePraiseCount
      articleDislikeCount
      articleCommentCount
      updated_at
      created_at
      user {
        id
        username
        articles {
          articleTitle
          articleContent
        }
      }
    }
  }
`;

export const buildPreviewHtml = (articleContent: string) => {
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
                background-color: #F6F6F6;
              }
              .container{
                box-sizing: border-box;
                width: 730px;
                max-width: 100%;
            
                margin: 0 auto;
           
                overflow: hidden;
                background-color: #fff;
                
                border-right: solid 0px #eee;
                border-left: solid 0px #eee;
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
          <div class="container">${articleContent}</div>
          </body>
        </html>
      `;
};

export default {
  buildPreviewHtml,
};
