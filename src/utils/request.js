/*eslint-disable*/
import fetch from 'dva/fetch';
import { notification, message } from 'antd';
import { routerRedux } from 'dva/router';
import qs from 'qs';
// import store from '../index';
// import { getToken } from './utils';
// import objectToFormData from './object';

function checkStatus(response) {

  const { status, data } = response;
  const { error, msg, result } = data;
  if (status >= 200 && status < 300) {
    console.log('data.msg', response)
    if (data.code == 0) {
      return result.data;
    }

  } else if (status == 422) {
    notification.error({
      message: msg,
    });
  }

  const err = new Error(message);
  err.name = response.status;
  err.response = response;
  throw err;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const defaultOptions = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'authentication': localStorage.getItem('token')
    },
    // credentials: 'include',
  };
  console.log('headers',defaultOptions.headers)
  let newUrl =
    location.hostname === 'localhost' || location.hostname === 'static.joinuscn.com'
      ? `${url}`
      : url;
  const newOptions = { ...defaultOptions, ...options };
  const method = newOptions.method.toUpperCase();
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  } else if (method === 'POSTFILE' || method === 'PUTFILE') {
    newOptions.headers = {
      Accept: 'application/json',
      ...newOptions.headers,
    };
    // newOptions.body = objectToFormData(newOptions.body);
    newOptions.method = method.substring(0, method.length - 4);
  } else if (method === 'GET' && newOptions.body && JSON.stringify(newOptions.body) !== '{}') {
    newUrl = `${newUrl}?${qs.stringify(newOptions.body)}`;
    delete newOptions.body;
  }
  try {
    const response = await fetch(newUrl, newOptions);

    const pagination = {
      current: Number(response.headers.get('x-page')),
      total: Number(response.headers.get('x-total')),
    };
    const data = await response.json();
    const ret = {
      data,
      pagination,
      status: response.status,
      success: true,
    };
    return checkStatus(ret);
  } catch (e) {
    if (e.message === 'Failed to fetch') {
      notification.error({
        message: '服务器无响应,请您稍后再试！',
      });
      return { success: false };
    }
    if (e == 422) {
      // message.err(e)
      console.log('e', e)

    }

    // const { dispatch } = store;
    const status = e.name;
    // if (status === 401) {
    //   dispatch({
    //     type: 'login/logout',
    //   });
    //   notification.error({
    //     message: '账号或密码错误！',
    //   });
    //   return { success: false };
    // }
    if (status >= 404 && status < 422) {
      dispatch(routerRedux.push('/exception/404'));
      return { success: false };
    }
    return { success: false };
  }
}
