const initialState = [];

function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
  case 'RECEIVE_USERS':
    return action.payload.users;
  default:
    return state;
  }
}

export default usersReducer;
