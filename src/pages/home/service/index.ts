/*eslint-disable*/
import request from '../../../utils/request';

export async function loadNewArticle() {
  return request('/blog/article/loadNewArticle', {
    method: 'GET',
  });
}
