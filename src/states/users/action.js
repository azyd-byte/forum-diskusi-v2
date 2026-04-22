import * as api from '../../utils/api';

export function receiveUsersActionCreator(users) {
  return {
    type: 'RECEIVE_USERS',
    payload: { users },
  };
}

export function asyncReceiveUsers() {
  return async (dispatch) => {
    try {
      const users = await api.getUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
  };
}
