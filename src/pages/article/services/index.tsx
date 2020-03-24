/*eslint-disable*/
import request from '../../../utils/request';

export async function addArticle(params: object) {
  console.log('params', params);
  return request('/blog/article/addArticle', {
    method: 'POST',
    body: params,
  });
}
