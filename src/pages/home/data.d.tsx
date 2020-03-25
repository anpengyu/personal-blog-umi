import { Dispatch } from 'react';

export interface ArticleItemProps {
  dispatch: Dispatch<any>;
  home: StateType;
}

export interface StateType {
  // articleList: any[];
}

interface Item {
  id: string;
  articleTitle: string;
  createDate: string;
  articleContent: string;
  articledislikeCount: number;
  articlePageView: number;
  articleCommentCount: number;
  articlePraiseCount: number;
}
