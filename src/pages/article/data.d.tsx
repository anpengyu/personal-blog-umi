import { BaseProps } from '@/layouts/base.d';
import gql from 'graphql-tag';
export interface AddArticleState {
  articleTitle: string;
  articleContent: string;
  editorState: any;
}

export interface AddArticleProps extends BaseProps {
  props: any;
}

export interface StateType {
  articleList: any[];
}

const buildPreviewHtml = (content: String) => {
  return `
    <!Doctype html>
    <html>
      <head>
        <title>Preview Content</title>
        <style>
          html,body{
            height: 100%;
            min-height:100vh;
            margin: 0;
            padding: 0;
            overflow: auto;
            background-color: #f1f2f3;
          }
          .container{
            box-sizing: border-box;
            width: 730px;
            max-width: 730px;
            min-height: 100vh;
            margin: 0 100 auto;
            padding: 30px 20px;
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
        <div class="container">${content}</div>
      </body>
    </html>
  `;
};

const ADD_ARTICLE = gql`
  mutation(
    $userId: String!
    $articleSubTitle: String!
    $articleTitle: String!
    $articleContent: String!
  ) {
    createArticle(
      userId: $userId
      articleSubTitle: $articleSubTitle
      articleTitle: $articleTitle
      articleContent: $articleContent
    ) {
      userId
      articleSubTitle
      articleTitle
      articleContent
    }
  }
`;

export { buildPreviewHtml, ADD_ARTICLE };
