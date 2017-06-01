import store from 'store'
import { login, logout } from '../services/app'
import { get as getUserInfo } from '../services/user'
import { errHandler } from '../utils'

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    user: {},
    siderFold: store.get('siderFold') === true,
    darkTheme: store.get('darkTheme') === true,
  },
  subscriptions: {
    setup({ dispatch }) {
      const userId = store.get('userId')
      if (userId) {
        dispatch({ type: 'getUserInfo', payload: userId })
      }
    },
  },
  effects: {
    * login({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const { data, err } = yield call(login, payload)
      if (data) {
        yield put({ type: 'loginSuccess', payload: data })
      } else {
        yield put({ type: 'hideLoading' })
        errHandler(err)
      }
    },
    * getUserInfo({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const { data, err } = yield call(getUserInfo, payload)
      if (data) {
        yield put({ type: 'loginSuccess', payload: data })
      } else {
        yield put({ type: 'hideLoading' })
        errHandler(err)
      }
    },
    * logout({ payload }, { call, put }) {
      const { data, err } = yield call(logout, payload)
      if (data) {
        store.remove('token', '')
        store.remove('userId', '')
        yield put({ type: 'logoutSuccess' })
      } else {
        errHandler(err)
      }
    },
  },
  reducers: {
    loginSuccess(state, action) {
      if (action.payload.token) {
        store.set('token', action.payload.token)
        store.set('userId', action.payload.id)
      }
      return {
        ...state,
        user: action.payload,
        login: true,
        loading: false,
      }
    },
    logoutSuccess(state) {
      return { ...state, login: false }
    },
    showLoading(state) {
      return { ...state, loading: true }
    },
    hideLoading(state) {
      return { ...state, loading: false }
    },
    switchSider(state) {
      store.set('siderFold', !state.siderFold)
      return { ...state, siderFold: !state.siderFold }
    },
    changeTheme(state) {
      store.set('darkTheme', !state.darkTheme)
      return { ...state, darkTheme: !state.darkTheme }
    },
  },
}
