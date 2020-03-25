import { Dispatch } from 'react';

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
