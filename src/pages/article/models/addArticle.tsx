import { addArticle } from '../services';
import { parse } from 'qs';
import { history, Link } from 'umi';
import _ from 'lodash';

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
    /**
     *添加新文章
     * @date 2020-03-24
     */
    *addArticle({ payload = {} }, { call, put }) {
      const ret = yield call(addArticle, parse(payload));
      if (!_.isEmpty(ret)) {
        history.push('/');
        console.log('list》》》》》》》》》》》》》', ret);
      }
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //       articleList: ret,
      //     },
      //   });
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
