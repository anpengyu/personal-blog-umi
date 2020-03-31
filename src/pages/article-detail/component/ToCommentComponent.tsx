import React from 'react';
import { Loading, connect, history } from 'umi';
import styles from '../index.less';
import moment from 'moment';
import { ArticleDetailProps, buildPreviewHtml } from '../data.d';
import MutationComponent from './MutationComponent';

class ContentComponent extends React.Component<ArticleDetailProps> {
  constructor(props) {
    super(props);
    console.log('this.props', this.props);
  }

  //发帖距现在多长时间
  times(date: Date): string {
    return moment(new Date(date), 'YYYY-MM-DD HH:mm:ss').fromNow();
  }

  //点击发帖用户
  clickUserName = () => {
    history.push('/userInfo');
  };
  render() {
    const { comment, itemId } = this.props;
    const { creator, replyTo, content, created_at } = comment;
    const { username } = replyTo;
    console.log('<<<<<', username);
    return (
      <div>
        <div>
          {creator.username}
          {replyTo.id == -1 ? '' : '回复: ' + username}
        </div>
        <div>内容：{content}</div>
        <div
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#eee',
            marginTop: 20,
            marginBottom: 20,
          }}
        ></div>

        <MutationComponent
          articleId={comment.articleId}
          index11={itemId}
          content={'22222222222222'}
        />
      </div>
    );
  }
}

export default connect(
  ({ articleDetail, loading }: { articleDetail: {}; loading: Loading }) => ({
    articleDetail,
    loading: loading.models.user,
  }),
)(ContentComponent);
