import * as api from '../../utils/api';

export function receiveThreadsActionCreator(threads) {
  return {
    type: 'RECEIVE_THREADS',
    payload: { threads },
  };
}

export function asyncReceiveThreads() {
  return async (dispatch) => {
    try {
      const threads = await api.getThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function addThreadActionCreator(thread) {
  return {
    type: 'ADD_THREAD',
    payload: { thread },
  };
}

export function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return thread;
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };
}

export function toggleUpVoteThread(threadId, userId) {
  return {
    type: 'TOGGLE_UPVOTE_THREAD',
    payload: { threadId, userId },
  };
}

export function toggleDownVoteThread(threadId, userId) {
  return {
    type: 'TOGGLE_DOWNVOTE_THREAD',
    payload: { threadId, userId },
  };
}

export function asyncToggleUpVoteThread(thread) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    const userId = authUser.id;

    const isUpVoted = thread.upVotesBy.includes(userId);

    dispatch(toggleUpVoteThread(thread.id, userId));

    try {
      if (isUpVoted) {
        await api.neutralVoteThread(thread.id);
      } else {
        await api.upVoteThread(thread.id);
      }
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncToggleDownVoteThread(thread) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    const userId = authUser.id;

    const isDownVoted = thread.downVotesBy.includes(userId);

    dispatch(toggleDownVoteThread(thread.id, userId));

    try {
      if (isDownVoted) {
        await api.neutralVoteThread(thread.id);
      } else {
        await api.downVoteThread(thread.id);
      }
    } catch (error) {
      alert(error.message);
    }
  };
}
