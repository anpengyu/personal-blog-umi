import React from 'react';
import { Loading, connect, history } from 'umi';
import styles from '../index.less';
import moment from 'moment';
import { ArticleDetailProps, buildPreviewHtml } from '../data.d';
import ToCommentComponent from './ToCommentComponent';
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
    const { article } = this.props;
    const { comment } = article;
    console.log('comment', comment);
    return (
      <div className={styles.content}>
        {comment.map(
          (
            item: {
              content?: any;
              created_at?: any;
              creator?: any;
              comment?: any;
            },
            index: number,
          ) => {
            const { creator, comment } = item;
            return (
              <div key={index}>
                <div>{creator.username}</div>
                <div>{this.times(item.created_at)}</div>
                <div>内容：{item.content}</div>

                <MutationComponent
                  content="111111111"
                  index11={item.id}
                  articleId={article.id}
                />

                <div style={{ marginTop: 20, backgroundColor: '#f6f6f6' }}>
                  {comment.map((item1: any, index: number) => {
                    return (
                      <div style={{ marginLeft: 30 }} key={index}>
                        <ToCommentComponent comment={item1} itemId={item.id} />
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{ width: '100%', height: 2, backgroundColor: '#000' }}
                ></div>
              </div>
            );
          },
        )}
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
