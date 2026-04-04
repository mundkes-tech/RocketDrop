import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const parseUserCookie = () => {
  const rawUser = Cookies.get('user');
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    Cookies.remove('user');
    return null;
  }
};

const initialState = {
  user: parseUserCookie(),
  accessToken: Cookies.get('accessToken') || null,
  refreshToken: Cookies.get('refreshToken') || null,
  loading: false,
  error: null,
  isAuthenticated: !!Cookies.get('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAuthSuccess: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      Cookies.set('accessToken', accessToken, { expires: 1 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('user');
    },
  },
});

export const { setLoading, setError, setAuthSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
