import 'braft-extensions/dist/code-highlighter.css';

import 'braft-editor/dist/index.css';
import React, { Fragment } from 'react';
import { connect, Loading, history } from 'umi';
import { Input, message, Button } from 'antd';
import BraftEditor from 'braft-editor';
import _ from 'lodash';
import { Mutation } from 'react-apollo';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import ErrorMessage from '../../Error';
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
class AddArticle extends React.Component<AddArticleProps, AddArticleState> {
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
    if (_.isEmpty(articleTitle) || _.isEmpty(editorState)) {
      message.error('文章标题或者内容不能为空~');
      return;
    }
    createArticle().then(() => history.push('/'));
  };

  changeTitle = (e: { target: { value: any } }) => {
    console.log('e', e.target.value);
    this.setState({
      articleTitle: e.target.value,
    });
  };

  render() {
    const { articleTitle, editorState } = this.state;

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'inline-block', width: '50%' }}>
          <div
            style={{
              // width: '90%',
              // margin: 'auto',
              // marginTop: 50,
              borderWidth: 1,
              height: '100vh',
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
              />
            </div>
          </div>
        </div>
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
export default connect(
  ({ addArticle, loading }: { addArticle: StateType; loading: Loading }) => ({
    addArticle,
    loading: loading.models.addArticle,
  }),
)(AddArticle);
