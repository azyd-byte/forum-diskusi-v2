const initialState = null;

function threadDetailReducer(state = initialState, action = {}) {
  switch (action.type) {
  case 'RECEIVE_THREAD_DETAIL':
    return action.payload.threadDetail;

  case 'CLEAR_THREAD_DETAIL':
    return null;

  case 'ADD_COMMENT':
    return {
      ...state,
      comments: [action.payload.comment, ...state.comments],
    };

  case 'TOGGLE_UPVOTE_COMMENT':
    return {
      ...state,
      comments: state.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) return comment;

        const { userId } = action.payload;
        const isUpVoted = comment.upVotesBy.includes(userId);

        return {
          ...comment,
          upVotesBy: isUpVoted
            ? comment.upVotesBy.filter((id) => id !== userId)
            : [...comment.upVotesBy, userId],
          downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
        };
      }),
    };

  case 'TOGGLE_DOWNVOTE_COMMENT':
    return {
      ...state,
      comments: state.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) return comment;

        const { userId } = action.payload;
        const isDownVoted = comment.downVotesBy.includes(userId);

        return {
          ...comment,
          downVotesBy: isDownVoted
            ? comment.downVotesBy.filter((id) => id !== userId)
            : [...comment.downVotesBy, userId],
          upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
        };
      }),
    };

  default:
    return state;
  }
}

export default threadDetailReducer;
