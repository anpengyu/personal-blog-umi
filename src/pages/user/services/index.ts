/*eslint-disable*/
import request from '../../../utils/request';

export async function login(params) {
  console.log('params', params);
  return request('/user/login', {
    method: 'POST',
    body: params,
  });
}

export async function loadNewArticle() {
  return request('/blog/article/loadNewArticle', {
    method: 'GET',
  });
}
