import React from 'react';
import { ConnectRC, Loading, connect } from 'umi';

interface PageProps {
    index: {};
    loading: boolean;
}
class ArticlesDetail extends React.Component {

    constructor(props: any) {
        super(props);
        props.dispatch({
            type: 'articleDetail/loadArticleDetail',
            payload: {
                id: props.match.params.id
            }
        })
    }

    render() {
        const { articleDetail: { article = [] } } = this.props;
        console.log('articleItem', article)
        return (
            <div>
                <div>
                    <div>{article.articleTitle}</div>
                    <div>{article.createDate}</div>
                    <div>{article.updateDate}</div>
                    <div>{article.articleContent}</div>
                    <div>{article.articlePraiseCount}</div>
                    <div>{article.articledislikeCount}</div>
                    <div>{article.articledislikeCount}</div>
                    <div>{article.articleCommentCount}</div>
                </div>

            </div>
        );
    }
}

export default connect(({ articleDetail, loading }: { home: {}; loading: Loading }) => ({
    articleDetail,
    loading: loading.models.user,
}))(ArticlesDetail)