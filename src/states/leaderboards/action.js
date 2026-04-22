import * as api from '../../utils/api';

export function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: 'RECEIVE_LEADERBOARDS',
    payload: { leaderboards },
  };
}

export function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    }
  };
}
