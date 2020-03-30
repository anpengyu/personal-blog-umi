import 'braft-extensions/dist/code-highlighter.css';

import 'braft-editor/dist/index.css';
import React, { Fragment } from 'react';
import { connect, Loading, history } from 'umi';
import { Input, message, Button } from 'antd';
import BraftEditor from 'braft-editor';
import _ from 'lodash';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import MutaionComponent from './componments/MutationComponent';
import BraftEditorComponent from './componments/BraftEditorComponent';
import {
  AddArticleProps,
  AddArticleState,
  StateType,
  buildPreviewHtml,
  ADD_ARTICLE,
} from './data.d';
BraftEditor.use(
  CodeHighlighter({
    includeEditors: ['editor-with-code-highlighter'],
  }),
);

/**
 * 添加新文章
 * @date 2020-03-24
 */
export default class AddArticle extends React.Component<
  AddArticleProps,
  AddArticleState
> {
  constructor(props: Readonly<AddArticleProps>) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(),
      articleTitle: '', //文章标题
      articleContent: '', //文章内容
    };
    let userInfo = localStorage.getItem('userInfo');
    console.log('userInfo', userInfo);
  }

  handleChange = (editorState: any) => {
    this.setState({ editorState });
  };

  delHtmlTag(str: string) {
    return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
  }

  submit = (createArticle: () => Promise<any>) => {
    const { articleTitle, editorState } = this.state;
    if (_.isEmpty(articleTitle) || editorState.toHTML() === '<p></p>') {
      message.error('文章标题或者内容不能为空~');
      return;
    }
    createArticle().then(() => history.push('/'));
  };

  changeTitle = (e: { target: { value: any } }) => {
    this.setState({
      articleTitle: e.target.value,
    });
  };

  render() {
    const { articleTitle, editorState } = this.state;

    return (
      <div style={{ display: 'flex' }}>
        <BraftEditorComponent
          changeTitle={this.changeTitle}
          handleChange={this.handleChange}
        />

        <MutaionComponent
          articleTitle={articleTitle}
          editorState={editorState}
        />
        <div
          style={{ height: '100vh', marginLeft: 100 }}
          dangerouslySetInnerHTML={{
            __html: buildPreviewHtml(this.state.editorState.toHTML()),
          }}
        ></div>
      </div>
    );
  }
}
