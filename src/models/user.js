import { routerRedux } from 'dva/router'
import { create, remove, update, query } from '../services/user'
import { error as errorHandler } from '../utils'

export default {
  namespace: 'user',
  state: {
    query: {
      'per-page': 10,
    },
    list: [],
    loading: false,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    modalConfirmLoading: false,
    sideVisible: false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
      pageSize: 10,
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
    * route({ payload, action = 'push' }, { put, select }) {
      yield put({ type: 'updateQuery', payload })
      const queryData = yield select(({ user }) => user.query)
      yield put(routerRedux[action]({ pathname: '/user', query: queryData }))
    },
    * query({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      let queryData = yield select(({ user }) => user.query)
      queryData = { ...queryData, ...payload }
      const { data, error } = yield call(query, queryData)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            query: queryData,
            list: data.data.items,
            pagination: {
              current: data.data._meta.currentPage,
              total: data.data._meta.totalCount,
              pageSize: data.data._meta.perPage,
            },
          },
        })
      } else {
        yield put({ type: 'hideLoading' })
        errorHandler(error)
      }
    },
    * delete({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const { data, error } = yield call(remove, payload)
      if (data) {
        yield put({ type: 'query', payload: {} })
      } else {
        yield put({ type: 'hideLoading' })
        errorHandler(error)
      }
    },
    * create({ payload }, { call, put }) {
      yield put({ type: 'showModalConfirmLoading' })
      const { data, error } = yield call(create, payload)
      if (data) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query', payload: {} })
      } else {
        yield put({ type: 'hideModalConfirmLoading' })
        errorHandler(error)
      }
    },
    * update({ payload }, { select, call, put }) {
      yield put({ type: 'showModalConfirmLoading' })
      const id = yield select(({ user }) => user.currentItem.id)
      const { data, error } = yield call(update, id, payload)
      if (data) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query', payload: {} })
      } else {
        yield put({ type: 'hideModalConfirmLoading' })
        errorHandler(error)
      }
    },
  },

  reducers: {
    updateQuery(state, action) {
      return { ...state, query: { ...state.query, ...action.payload } }
    },
    showLoading(state) {
      return { ...state, loading: true }
    },
    hideLoading(state) {
      return { ...state, loading: false }
    },
    querySuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        pagination: { ...state.pagination, ...action.payload.pagination },
        loading: false,
      }
    },
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal(state) {
      return { ...state, currentItem: {}, modalVisible: false, modalConfirmLoading: false }
    },
    showModalConfirmLoading(state) {
      return { ...state, modalConfirmLoading: true }
    },
    hideModalConfirmLoading(state) {
      return { ...state, modalConfirmLoading: false }
    },
    showSide(state, action) {
      return { ...state, ...action.payload, sideVisible: true }
    },
    hideSide(state) {
      return { ...state, currentItem: {}, sideVisible: false }
    },
  },

}
