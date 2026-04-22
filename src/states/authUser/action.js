import * as api from '../../utils/api';

export function setAuthUserActionCreator(authUser) {
  return {
    type: 'SET_AUTH_USER',
    payload: { authUser },
  };
}

export function unsetAuthUserActionCreator() {
  return {
    type: 'UNSET_AUTH_USER',
  };
}

export function asyncLogin({ email, password }) {
  return async (dispatch) => {
    try {
      const token = await api.login({ email, password });

      localStorage.setItem('token', token);

      const user = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(user));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncRegister({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password });
      alert('Register berhasil, silakan login');
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      const user = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(user));
    } catch (error) {
      dispatch(unsetAuthUserActionCreator());
      localStorage.removeItem('token');
    }
  };
}
