const initialState = [];

function leaderboardsReducer(state = initialState, action = {}) {
  switch (action.type) {
  case 'RECEIVE_LEADERBOARDS':
    return action.payload.leaderboards;
  default:
    return state;
  }
}

export default leaderboardsReducer;
