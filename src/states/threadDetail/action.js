import * as api from '../../utils/api';

export function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: 'RECEIVE_THREAD_DETAIL',
    payload: { threadDetail },
  };
}

export function clearThreadDetailActionCreator() {
  return {
    type: 'CLEAR_THREAD_DETAIL',
  };
}

export function asyncReceiveThreadDetail(id) {
  return async (dispatch) => {
    try {
      const threadDetail = await api.getThreadDetail(id);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function addCommentActionCreator(comment) {
  return {
    type: 'ADD_COMMENT',
    payload: { comment },
  };
}

export function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function toggleUpVoteComment(threadId, commentId, userId) {
  return {
    type: 'TOGGLE_UPVOTE_COMMENT',
    payload: { threadId, commentId, userId },
  };
}

export function asyncToggleUpVoteComment(comment) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;

    const isUpVoted = comment.upVotesBy.includes(userId);

    dispatch(toggleUpVoteComment(threadDetail.id, comment.id, userId));

    try {
      if (isUpVoted) {
        await api.neutralVoteComment(threadDetail.id, comment.id);
      } else {
        await api.upVoteComment(threadDetail.id, comment.id);
      }
    } catch (error) {
      alert(error.message);
    }
  };
}

export function toggleDownVoteComment(threadId, commentId, userId) {
  return {
    type: 'TOGGLE_DOWNVOTE_COMMENT',
    payload: { threadId, commentId, userId },
  };
}

export function asyncToggleDownVoteComment(comment) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;

    const isDownVoted = comment.downVotesBy.includes(userId);

    dispatch(toggleDownVoteComment(threadDetail.id, comment.id, userId));

    try {
      if (isDownVoted) {
        await api.neutralVoteComment(threadDetail.id, comment.id);
      } else {
        await api.downVoteComment(threadDetail.id, comment.id);
      }
    } catch (error) {
      alert(error.message);
    }
  };
}
