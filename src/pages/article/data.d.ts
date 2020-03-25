import { BaseProps } from '@/layouts/base.d';

interface AddArticleState {
  articleTitle: string;
  articleContent: string;
  editorState: any;
}

interface AddArticleProps extends BaseProps {
  props: any;
}

export interface StateType {
  articleList: any[];
}
