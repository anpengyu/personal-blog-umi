import { Dispatch } from 'react';
import gql from 'graphql-tag';
export interface ArticleItemProps {
  dispatch: Dispatch<any>;
  home: StateType;
  item: Item;
}

export interface StateType {
  // articleList: any[];
}

interface Item {
  id: string;
  articleTitle: string;
  articleContent: string;
  articledislikeCount: number;
  articlePageView: number;
  articleCommentCount: number;
  articlePraiseCount: number;
  articleSubTitle: string;
  created_at: Date;
  user: User;
}

interface User {
  username: string;
  id: string;
}

export const ALL_ARTICLES = gql`
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
        username
        sex
        headImg
      }
    }
  }
`;
