// import store from 'store'

export default {
  namespace: 'user',
  state: {
    username: ''
  },
  subscriptions: {},
  effects: {},
  reducers: {
    'setUsername' (state, {username}) {
      return {
        ...state,
        username
      }
    }
  }
}