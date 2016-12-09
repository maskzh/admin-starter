import { login, userInfo, logout } from '../services/app'
import { error as errorHandler } from '../utils'

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    user: {},
    siderFold: localStorage.getItem('QPSiderFold') === 'true',
    darkTheme: localStorage.getItem('QPDarkTheme') === 'true',
  },
  subscriptions: {
    setup({ dispatch }) {
      const userId = localStorage.getItem('QPUserId')
      if (userId) {
        dispatch({ type: 'queryUser', payload: userId })
      }
    },
  },
  effects: {
    * login({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const { data, error } = yield call(login, payload)
      if (data) {
        yield put({ type: 'loginSuccess', payload: { ...data.data, token: data.message } })
      } else {
        yield put({ type: 'hideLoading' })
        errorHandler(error)
      }
    },
    * queryUser({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const { data, error } = yield call(userInfo, payload)
      if (data) {
        yield put({ type: 'loginSuccess', payload: data.data })
      } else {
        yield put({ type: 'hideLoading' })
        errorHandler(error)
      }
    },
    * logout({ payload }, { call, put }) {
      const { data, error } = yield call(logout, payload)
      if (data) {
        yield put({ type: 'logoutSuccess' })
      } else {
        errorHandler(error)
      }
    },
    * switchSider({ payload }, { put }) {
      yield put({ type: 'handleSwitchSider' })
    },
    * changeTheme({ payload }, { put }) {
      yield put({ type: 'handleChangeTheme' })
    },
  },
  reducers: {
    loginSuccess(state, action) {
      if (action.payload.token) {
        localStorage.setItem('QPToken', action.payload.token)
        localStorage.setItem('QPUserId', action.payload.id)
      }
      return {
        ...state,
        user: action.payload,
        login: true,
        loading: false,
      }
    },
    logoutSuccess(state) {
      localStorage.setItem('QPToken', '')
      localStorage.setItem('QPUserId', '')
      return {
        ...state,
        login: false,
      }
    },
    showLoading(state) {
      return {
        ...state,
        loading: true,
      }
    },
    hideLoading(state) {
      return {
        ...state,
        loading: false,
      }
    },
    handleSwitchSider(state) {
      localStorage.setItem('QPSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    handleChangeTheme(state) {
      localStorage.setItem('QPDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },
  },
}
