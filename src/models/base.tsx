import { logout } from '../services';
import { parse } from 'qs';
import { history, Link } from 'umi';
import { message } from 'antd';

export default {
  state: {
    count: 0,
    articleList: [], //博客列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'demo' });
    },
  },

  effects: {
    *logout({ payload = {}, callback }, { call, put }) {
      console.log('logout');
      const ret = yield call(logout);
      localStorage.setItem('userInfo', '');
      localStorage.setItem('token', '');
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //       articleList: ret,
      //     },
      //   });

      message.info('您已退出登录');
      callback();
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
