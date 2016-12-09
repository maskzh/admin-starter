import { parse } from 'qs'
import { login, userInfo, logout } from '../services/app'

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    user: {},
    loginButtonLoading: false,
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
      yield put({ type: 'showLoginButtonLoading' })
      const data = yield call(login, payload)
      if (data.result) {
        yield put({ type: 'loginSuccess', payload: { ...data.data, token: data.message } })
      } else {
        yield put({ type: 'loginFail', payload: { data } })
      }
    },
    * queryUser({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(userInfo, payload)
      if (data.result) {
        yield put({ type: 'loginSuccess', payload: data.data })
      } else {
        yield put({ type: 'hideLoading' })
      }
    },
    * logout({ payload }, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.result) {
        yield put({ type: 'logoutSuccess' })
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
        loginButtonLoading: false,
      }
    },
    logoutSuccess(state) {
      return {
        ...state,
        login: false,
      }
    },
    showLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true,
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
