import { loadArticleDetail } from '../service';
import { parse } from 'qs';
import { history, Link } from 'umi';
import { message } from 'antd';

export default {
  state: {
    count: 0,
    article: [], //博客列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'demo' });
    },
  },

  effects: {
    *loadArticleDetail({ payload = {} }, { call, put }) {
      const ret = yield call(loadArticleDetail, parse(payload));
      yield put({
        type: 'updateState',
        payload: {
          article: ret,
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
