import 'braft-extensions/dist/code-highlighter.css';

import 'braft-editor/dist/index.css';
import React, { Fragment } from 'react';
import { connect, Loading, history } from 'umi';
import { Input, message, Button } from 'antd';
import BraftEditor from 'braft-editor';
import _ from 'lodash';
import { Mutation, Query } from 'react-apollo';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';

import { ADD_COMMENT, ARTICLE_DETIAL } from '../data.d';
BraftEditor.use(
  CodeHighlighter({
    includeEditors: ['editor-with-code-highlighter'],
  }),
);

/**
 * 添加新评论
 * @date 2020-03-230
 */
class MutationComponent extends React.Component<any, any> {
  submit = (createComment: () => Promise<any>) => {
    createComment();
  };
  render() {
    const { content, articleId } = this.props;
    return (
      <Mutation
        mutation={ADD_COMMENT}
        refetchQueries={[
          {
            query: ARTICLE_DETIAL,
            variables: {
              id: '42',
            },
          },
        ]}
        variables={{
          userId: 3,
          content: content,
          articleId: articleId,
          replyToCommentId: '0',
          rootCommentId: '0',
        }}
        onError={{}}
      >
        {(createComment: any, { data, loading, error }: any) => {
          console.log('eeeee');
          if (error) {
            console.log('error', error);
            return <div>error</div>;
          }
          return (
            <div>
              {error && <div>error</div>}
              <Fragment>
                <div>
                  <Button
                    type="submit"
                    onClick={this.submit.bind(this, createComment)}
                  >
                    提交
                  </Button>
                </div>
              </Fragment>
            </div>
          );
        }}
      </Mutation>
      // <div>ddddd</div>
    );
  }
}
export default MutationComponent;
