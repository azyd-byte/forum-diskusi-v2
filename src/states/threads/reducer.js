const initialState = [];

function threadsReducer(state = initialState, action = {}) {
  switch (action.type) {
  case 'RECEIVE_THREADS':
    return action.payload.threads;

  case 'ADD_THREAD':
    return [action.payload.thread, ...state];

  case 'TOGGLE_UPVOTE_THREAD':
    return state.map((thread) => {
      if (thread.id !== action.payload.threadId) return thread;

      const { userId } = action.payload;
      const isUpVoted = thread.upVotesBy.includes(userId);

      return {
        ...thread,
        upVotesBy: isUpVoted
          ? thread.upVotesBy.filter((id) => id !== userId)
          : [...thread.upVotesBy, userId],
        downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
      };
    });

  case 'TOGGLE_DOWNVOTE_THREAD':
    return state.map((thread) => {
      if (thread.id !== action.payload.threadId) return thread;

      const { userId } = action.payload;
      const isDownVoted = thread.downVotesBy.includes(userId);

      return {
        ...thread,
        downVotesBy: isDownVoted
          ? thread.downVotesBy.filter((id) => id !== userId)
          : [...thread.downVotesBy, userId],
        upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
      };
    });

  default:
    return state;
  }
}

export default threadsReducer;
