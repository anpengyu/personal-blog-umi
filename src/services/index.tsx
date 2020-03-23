/*eslint-disable*/
import request from '../utils/request';

export async function logout() {
  return request('/user/logout', {
    method: 'POST',
  });
}
