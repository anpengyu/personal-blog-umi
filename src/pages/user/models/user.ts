import { login } from '../services/';
import { parse, stringify } from 'qs';
import { history, Link } from 'umi';
import { message } from 'antd';

export default {
  state: {
    count: 0,
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'demo' });
    },
  },

  effects: {
    *login({ payload = {} }, { call, put }) {
      const ret = yield call(login, parse(payload));
      localStorage.setItem('token', ret.token);
      localStorage.setItem('userInfo', JSON.stringify(ret.userModel));
      message.info('登录成功');
      history.push('/');
    },
  },

  reducers: {
    saveList(state: any, action: { payload: any }) {
      return {
        ...state,
        list: action.payload,
      };
    },
    demo(state: any, action: { payload: any }) {
      state.count += 2;
      console.log('demo');
    },
  },
};
