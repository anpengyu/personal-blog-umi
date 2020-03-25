import 'braft-extensions/dist/code-highlighter.css';

import 'braft-editor/dist/index.css';
import React from 'react';
import { connect, Loading } from 'umi';
import { Input, message } from 'antd';
import BraftEditor from 'braft-editor';
import _ from 'lodash';

import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import { AddArticleProps, AddArticleState, StateType } from './data';
BraftEditor.use(
  CodeHighlighter({
    includeEditors: ['editor-with-code-highlighter'],
  }),
);

/**
 * 添加新文章
 * @date 2020-03-24
 */
class AddArticle extends React.Component<AddArticleProps, AddArticleState> {
  constructor(props: Readonly<AddArticleProps>) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(),
      articleTitle: '', //文章标题
      articleContent: '', //文章内容
    };
  }

  handleChange = (editorState: any) => {
    this.setState({ editorState });
  };

  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }
    window.previewWindow = window.open();
    window.previewWindow.document.write(this.buildPreviewHtml());
    window.previewWindow.document.close();
  };
  delHtmlTag(str: string) {
    return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
  }
  //添加文章
  submit = () => {
    const { articleTitle, editorState } = this.state;
    console.log(editorState.toHTML());
    console.log(this.delHtmlTag(editorState.toHTML()));

    if (_.isEmpty(articleTitle) || _.isEmpty(editorState)) {
      message.error('文章标题或者内容不能为空~');
      return;
    }
    let articleSubtitle = this.delHtmlTag(editorState.toHTML()).substring(
      0,
      100,
    );
    console.log(articleSubtitle);
    this.props.dispatch({
      type: 'addArticle/addArticle',
      payload: {
        articleTitle,
        articleSubtitle,
        articleContent: editorState.toHTML(),
      },
    });
  };

  buildPreviewHtml() {
    console.log('this.state.editorState.toHTML()');
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
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `;
  }

  changeTitle = (e: { target: { value: any } }) => {
    console.log('e', e.target.value);
    this.setState({
      articleTitle: e.target.value,
    });
  };

  render() {
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview,
      },
      {
        key: 'save-button',
        type: 'button',
        text: '保存到草稿',
        onClick: this.submit,
      },
      {
        key: 'submit-button',
        type: 'button',
        text: '提交',
        onClick: this.submit,
      },
    ];

    return (
      <div>
        <div
          style={{
            width: '50%',
            margin: 'auto',
            marginTop: 50,
            borderWidth: 1,
            borderColor: '#000',
            borderStyle: 'solid',
          }}
        >
          <div>
            <Input
              style={{ height: 50, fontSize: 20 }}
              onChange={this.changeTitle}
              placeholder="文章标题"
            ></Input>
          </div>
          <div className="editor-wrapper">
            <BraftEditor
              id="editor-with-code-highlighter"
              onChange={this.handleChange}
              extendControls={extendControls}
              contentStyle={{ height: '100%', minHeight: 600 }}
            />
          </div>
        </div>
      </div>
    );
  }
}
{
  /* <div dangerouslySetInnerHTML={{ __html: this.buildPreviewHtml() }}></div> */
}
export default connect(
  ({ addArticle, loading }: { addArticle: StateType; loading: Loading }) => ({
    addArticle,
    loading: loading.models.addArticle,
  }),
)(AddArticle);
