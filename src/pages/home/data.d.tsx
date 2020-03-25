import { Dispatch } from 'react';

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
  articleSubtitle: string;
  createDate: Date;
  user: User;
}

interface User {
  username: string;
  id: string;
}
