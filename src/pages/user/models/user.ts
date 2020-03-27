import { login, loadNewArticle } from '../services/';
import { parse, stringify } from 'qs';
import { history, Link } from 'umi';
import { message } from 'antd';
import _ from 'lodash';

export default {
  state: {
    count: 0,
    list: [],
    articleList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'demo' });
    },
  },

  effects: {
    *login({ payload = {} }, { call, put }) {
      const ret = yield call(login, parse(payload));
      if (ret && !_.isEmpty(ret)) {
        localStorage.setItem('token', ret.token);
        localStorage.setItem('userInfo', JSON.stringify(ret.userModel));
        message.info('登录成功');
        // history.push('/');
        history.goBack();
      }
    },

    *loadNewArticle({ payload = {} }, { call, put }) {
      const ret = yield call(loadNewArticle, parse(payload));
      yield put({
        type: 'updateState',
        payload: {
          articleList: ret,
        },
      });
      console.log('list》》》》》》》》》》》》》', ret);
    },
  },

  reducers: {
    updateState(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
