import 'braft-extensions/dist/code-highlighter.css';

import 'braft-editor/dist/index.css';
import React, { Fragment } from 'react';
import { connect, Loading, history } from 'umi';
import { Input, message, Button } from 'antd';
import BraftEditor from 'braft-editor';
import _ from 'lodash';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import MutaionComponent from './componments/MutationComponent';
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
export default (props: { changeTitle: any; handleChange: any }) => {
  const { changeTitle, handleChange } = props;
  return (
    <div style={{ display: 'inline-block', width: '50%' }}>
      <div
        style={{
          borderWidth: 1,
          height: '100vh',
          borderColor: '#000',
          borderStyle: 'solid',
        }}
      >
        <div>
          <Input
            style={{ height: 50, fontSize: 20 }}
            onChange={changeTitle}
            placeholder="文章标题"
          ></Input>
        </div>
        <div className="editor-wrapper">
          <BraftEditor
            id="editor-with-code-highlighter"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
