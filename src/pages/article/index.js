// import 'braft-extensions/dist/code-highlighter.css';

// import 'braft-editor/dist/index.css';
// import React from 'react';
// import { connect, Loading } from 'umi';
import { Input, message, Button } from 'antd';
// import BraftEditor from 'braft-editor';
// import _ from 'lodash';
// import { Mutation, graphql } from 'react-apollo';
// import { useMutation } from '@apollo/react-hooks';
// import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
// import gql from 'graphql-tag';
import {
  AddArticleProps,
  AddArticleState,
  StateType,
  buildPreviewHtml,
  ADD_ARTICLE,
} from './data.d';
// BraftEditor.use(
//   CodeHighlighter({
//     includeEditors: ['editor-with-code-highlighter'],
//   }),
// );

// /**
//  * 添加新文章
//  * @date 2020-03-24
//  */
// class AddArticle extends React.Component<AddArticleProps, AddArticleState> {
//   constructor(props: Readonly<AddArticleProps>) {
//     super(props);
//     this.state = {
//       editorState: BraftEditor.createEditorState(),
//       articleTitle: '', //文章标题
//       articleContent: '', //文章内容
//     };
//     let userInfo = localStorage.getItem('userInfo');
//     console.log('userInfo',userInfo)
//   }

//   handleChange = (editorState: any) => {
//     this.setState({ editorState });
//   };

//   delHtmlTag(str: string) {
//     return str.replace(/<[^>]+>/g, ''); //正则去掉所有的html标记
//   }

//   //添加文章
//   submit = () => {
//     const { articleTitle, editorState } = this.state;
//     if (_.isEmpty(articleTitle) || _.isEmpty(editorState)) {
//       message.error('文章标题或者内容不能为空~');
//       return;
//     }
//     let articleSubtitle = this.delHtmlTag(editorState.toHTML()).substring(
//       0,
//       100,
//     );
//     console.log(articleSubtitle);
//     this.props.dispatch({
//       type: 'addArticle/addArticle',
//       payload: {
//         userId:1,
//         articleTitle,
//         articleSubtitle,
//         articleContent: editorState.toHTML(),
//       },
//     });
//   };

//   changeTitle = (e: { target: { value: any } }) => {
//     console.log('e', e.target.value);
//     this.setState({
//       articleTitle: e.target.value,
//     });
//   };

//   preview = () => {
//     console.log('data')
//   }

//   render() {
//     const extendControls = [
//       {
//         key: 'custom-button',
//         type: 'button',
//         text: '预览',
//         onClick: this.preview,
//       },
//       {
//         key: 'save-button',
//         type: 'button',
//         text: '保存到草稿',
//         onClick: this.submit,
//       },
//       {
//         key: 'submit-button',
//         type: 'button',
//         text: '提交',
//         onClick: this.submit,
//       },
//     ];

//     return (
//       <div style={{ display: 'flex' }}>
//         <div style={{ display: 'inline-block', width: "50%" }}>
//           <div
//             style={{
//               // width: '90%',
//               // margin: 'auto',
//               // marginTop: 50,
//               borderWidth: 1,
//               height: '100vh',
//               borderColor: '#000',
//               borderStyle: 'solid',
//             }}
//           >
//             <div>
//               <Input
//                 style={{ height: 50, fontSize: 20 }}
//                 onChange={this.changeTitle}
//                 placeholder="文章标题"
//               ></Input>
//             </div>
//             <div className="editor-wrapper">
//               <BraftEditor
//                 id="editor-with-code-highlighter"
//                 onChange={this.handleChange}
//                 extendControls={extendControls}
//               />
//             </div>
//           </div>

//         </div>
//         {/* <div style={{fontSize:22,marginTop:100}}>预览</div> */}
//         <div
//           style={{ height: '100vh', marginLeft: 100 }}
//           dangerouslySetInnerHTML={{
//             __html: buildPreviewHtml(this.state.editorState.toHTML()),
//           }}
//         ></div>
//       </div>
//     );
//   }
// }
// export default connect(
//   ({ addArticle, loading }: { addArticle: StateType; loading: Loading }) => ({
//     addArticle,
//     loading: loading.models.addArticle,
//   }),
// )(AddArticle);

import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';

class AddArticle extends Component {
  state = {
    value: '',
  };

  onChange = value => {
    this.setState({ value });
  };

  onSubmit = (event, addComment) => {
    addComment().then(() => this.setState({ value: '' }));

    event.preventDefault();
  };

  render() {
    // const { issueId } = this.props;
    const { value } = this.state;

    return (
      <Mutation mutation={ADD_ARTICLE} variables={{ userId: '1' }}>
        {(createArticle, { data, loading }) => {
          return (
            <Fragment>
              {/* {error && <div>error....</div>} */}

              <form onSubmit={e => this.onSubmit(e, createArticle)}>
                <Input
                  value={value}
                  onChange={e => this.onChange(e.target.value)}
                  placeholder="Leave a comment"
                />
                <Button type="submit">Comment</Button>
              </form>
            </Fragment>
          );
        }}
      </Mutation>
      // <div>ddd</div>
    );
  }
}

export default AddArticle;
