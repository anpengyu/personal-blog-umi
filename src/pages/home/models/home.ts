import { loadNewArticle } from '../service';
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
