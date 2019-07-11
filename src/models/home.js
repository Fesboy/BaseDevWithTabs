import { fetchUser } from "@/services/home";

export default {
  namespace: "home",
  state: {
    user: {}
  },
  effects: {
    *fetchUser(_, { call, put }) {
      const data = yield call(fetchUser);
      if (data.status) {
        yield put({
          type: "fetchUserSuccess",
          payload: data.body
        });
      }
    }
  },
  reducers: {
    fetchUserSuccess(state, { payload }) {
      return { ...state, user: payload };
    }
  }
};
