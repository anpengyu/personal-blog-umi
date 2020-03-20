import React from 'react';
import { connect } from 'dva';

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
];
export default (props: { item: any; }) => {
    const { item } = props;

    return (
        <div style={{ marginTop: 30 }}>
            <div>{item.articleTitle}</div>
            <div>{item.createDate}</div>
            
            <div style={{ display: 'flex' }}>
                <div>{item.articledislikeCount}</div>
                <div>{item.articlePageView}</div>
                <div>{item.articleCommentCount}</div>
                <div>{item.articlePraiseCount}</div>
            </div>
            <div>{item.articleContent}</div>
        </div>
    );
}

