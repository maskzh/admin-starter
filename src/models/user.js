import { parse } from 'qs'
import store from 'store'
import { routerRedux } from 'dva/router'
import { query, get, create, remove, update } from '../services/user'
import { errHandler } from '../utils'

export default {
  namespace: 'user',
  state: {
    query: {},
    list: [],
    item: {},
    loading: false,
    formType: 'create',
    modalVisible: false,
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
        if (store.get('token') && location.pathname === '/user/list') {
          dispatch({ type: 'query', payload: location.query })
        }
      })
    },
  },

  effects: {
    * route({ payload, action = 'push' }, { put }) {
      yield put(routerRedux[action]({ pathname: '/user/list', query: payload }))
    },
    * query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const { data, err } = yield call(query, parse(payload))
      if (data) {
        yield put({ type: 'setQuery', payload })
        yield put({ type: 'querySuccess', payload: data })
      } else {
        yield put({ type: 'hideLoading' })
        errHandler(err)
      }
    },
    * create({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const { data, err } = yield call(create, payload)
      if (data) {
        yield put(routerRedux.goBack())
        const _query = yield select(({ routing }) => routing.locationBeforeTransitions.query)
        yield put({ type: 'query', payload: _query })
        yield put({ type: 'removeDraft', payload: data.id })
      } else {
        yield put({ type: 'hideLoading' })
        errHandler(err)
      }
    },
    * update({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const { data, err } = yield call(update, payload.id, payload)
      if (data) {
        yield put(routerRedux.goBack())
        const _query = yield select(({ routing }) => routing.locationBeforeTransitions.query)
        yield put({ type: 'query', payload: _query })
      } else {
        yield put({ type: 'hideLoading' })
        errHandler(err)
      }
    },
    * remove({ payload }, { call, put, select }) {
      yield put({ type: 'showLoading' })
      const { data, err } = yield call(remove, payload)
      if (data) {
        const _query = yield select(({ routing }) => routing.locationBeforeTransitions.query)
        yield put({ type: 'query', payload: _query })
      } else {
        yield put({ type: 'hideLoading' })
        errHandler(err)
      }
    },
    * show({ payload }, { put }) {
      yield put(routerRedux.push({ pathname: `/user/${payload.id}/show`, state: payload }))
    },
    * showById({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const { data, err } = yield call(get, payload)
      if (data) {
        yield put({ type: 'hideLoading' })
        yield put({ type: 'show', payload: data })
      } else {
        yield put({ type: 'hideLoading' })
        errHandler(err)
      }
    },
    * edit({ payload }, { put }) {
      const { type, data } = payload
      yield put({ type: 'setForm', payload })

      if (type.indexOf('create') !== -1) {
        yield put(routerRedux.push({ pathname: '/user/new' }))
      } else {
        yield put(routerRedux.push({ pathname: `/user/${data.id}/edit` }))
      }
    },
    * editById({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const { data, err } = yield call(get, payload.id)
      if (data) {
        yield put({ type: 'hideLoading' })
        yield put({ type: 'edit', payload: { type: payload.type, data } })
      } else {
        yield put({ type: 'hideLoading' })
        errHandler(err)
      }
    },
  },

  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
    setQuery(state, { payload }) {
      return { ...state, query: payload }
    },
    setForm(state, { payload }) {
      return { ...state, formType: payload.type, item: payload.data || {} }
    },
    showLoading(state) {
      return { ...state, loading: true }
    },
    hideLoading(state) {
      return { ...state, loading: false }
    },
    showModal(state, { payload }) {
      return { ...state, formType: payload.type, item: payload.data || {}, modalVisible: true }
    },
    hideModal(state) {
      return { ...state, item: {}, modalVisible: false }
    },
    querySuccess(state, { payload }) {
      return {
        ...state,
        list: payload.items,
        pagination: {
          ...state.pagination,
          current: payload._meta.currentPage,
          total: payload._meta.totalCount,
          pageSize: payload._meta.perPage,
        },
        loading: false,
      }
    },
  },
}
