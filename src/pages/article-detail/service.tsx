/*eslint-disable*/
import request from '../../utils/request';

export async function loadArticleDetail(id: number) {
  return request('/blog/article/loadArticleDetail', {
    method: 'GET',
    body: id,
  });
}
