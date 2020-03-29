import 'braft-extensions/dist/code-highlighter.css';

import 'braft-editor/dist/index.css';
import React, { Fragment } from 'react';
import { connect, Loading, history } from 'umi';
import { Input, message, Button } from 'antd';
import BraftEditor from 'braft-editor';
import _ from 'lodash';
import { Mutation } from 'react-apollo';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import ErrorMessage from '../../../Error';
import {
  AddArticleProps,
  AddArticleState,
  StateType,
  buildPreviewHtml,
  ADD_ARTICLE,
} from '../data.d';
BraftEditor.use(
  CodeHighlighter({
    includeEditors: ['editor-with-code-highlighter'],
  }),
);

/**
 * 添加新文章
 * @date 2020-03-24
 */
class MutationComponent extends React.Component<any, any> {
  delHtmlTag(str: string) {
    return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
  }

  submit = (createArticle: () => Promise<any>) => {
    const { articleTitle, editorState } = this.props;
    if (_.isEmpty(articleTitle) || editorState.toHTML() === '<p></p>') {
      message.error('文章标题或者内容不能为空~');
      return;
    }
    createArticle().then(() => history.push('/'));
  };

  render() {
    const { articleTitle, editorState } = this.props;
    return (
      <Mutation
        mutation={ADD_ARTICLE}
        variables={{
          userId: 1,
          articleContent: editorState.toHTML(),
          articleSubTitle: this.delHtmlTag(editorState.toHTML()).substring(
            0,
            100,
          ),
          articleTitle,
        }}
      >
        {(createArticle: any, { data, loading, error }: any) => (
          <div>
            {error && <ErrorMessage error={error} />}
            <Fragment>
              <div>
                <Button
                  type="submit"
                  onClick={this.submit.bind(this, createArticle)}
                >
                  提交
                </Button>
              </div>
            </Fragment>
          </div>
        )}
      </Mutation>
    );
  }
}
export default MutationComponent;
