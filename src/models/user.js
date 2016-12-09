import { create, remove, update, query } from '../services/user'

export default {
  namespace: 'user',
  state: {
    list: [],
    loading: false,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
      size: 'default',
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const userId = localStorage.getItem('QPUserId')
        if (userId && location.pathname === '/user') {
          dispatch({ type: 'query', payload: location.query })
        }
      })
    },
  },

  effects: {
    * query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(query, payload)
      if (data && data.result) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.items,
            pagination: {
              total: data.data._meta.totalCount,
              current: data.data._meta.currentPage,
            },
          },
        })
      }
    },
    * delete({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(remove, payload)
      if (data && data.result) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.items,
            pagination: {
              total: data.data._meta.totalCount,
              current: data.data._meta.currentPage,
            },
          },
        })
      }
    },
    * create({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      const data = yield call(create, payload)
      if (data && data.result) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.items,
            pagination: {
              total: data.data._meta.totalCount,
              current: data.data._meta.currentPage,
            },
          },
        })
      }
    },
    * update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      const id = yield select(({ user }) => user.currentItem.id)
      const data = yield call(update, id, payload)
      if (data && data.result) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.items,
            pagination: {
              total: data.data._meta.totalCount,
              current: data.data._meta.currentPage,
            },
          },
        })
      }
    },
  },

  reducers: {
    showLoading(state) {
      return { ...state, loading: true }
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false }
    },
    queryFail(state) {
      return { ...state, loading: false }
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },

}
