import threadDetailReducer from "./reducer";

/**
 * test scenarios for threadDetailReducer
 *
 * - threadDetailReducer function
 *   - should return initial state when given unknown action
 *   - should return thread detail when given RECEIVE_THREAD_DETAIL action
 *   - should add comment when given ADD_COMMENT action
 *   - should toggle upvote comment correctly
 */

describe("threadDetailReducer function", () => {
  it("should return initial state when given unknown action", () => {
    const initialState = undefined;
    const action = { type: "UNKNOWN" };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBe(null);
  });

  it("should return thread detail when given RECEIVE_THREAD_DETAIL action", () => {
    const fakeThread = { id: "thread-1", comments: [] };

    const action = {
      type: "RECEIVE_THREAD_DETAIL",
      payload: {
        threadDetail: fakeThread,
      },
    };

    const nextState = threadDetailReducer(null, action);

    expect(nextState).toEqual(fakeThread);
  });

  it("should add comment when given ADD_COMMENT action", () => {
    const initialState = {
      id: "thread-1",
      comments: [],
    };

    const newComment = {
      id: "comment-1",
      content: "Test",
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: "ADD_COMMENT",
      payload: {
        comment: newComment,
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0]).toEqual(newComment);
  });

  it("should toggle upvote comment correctly", () => {
    const initialState = {
      id: "thread-1",
      comments: [
        {
          id: "comment-1",
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: "TOGGLE_UPVOTE_COMMENT",
      payload: {
        threadId: "thread-1",
        commentId: "comment-1",
        userId: "user-1",
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).toContain("user-1");
  });
});
