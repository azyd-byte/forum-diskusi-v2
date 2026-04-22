const initialState = null;

function authUserReducer(state = initialState, action = {}) {
  switch (action.type) {
  case 'SET_AUTH_USER':
    return action.payload.authUser;
  case 'UNSET_AUTH_USER':
    return null;
  default:
    return state;
  }
}

export default authUserReducer;
