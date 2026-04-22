import threadsReducer from "./reducer";

/**
 * test scenarios for threadsReducer
 *
 * - threadsReducer function
 *   - should return initial state when given unknown action
 *   - should return threads when given RECEIVE_THREADS action
 *   - should add new thread when given ADD_THREAD action
 *   - should toggle upvote correctly when given TOGGLE_UPVOTE_THREAD action
 */

describe("threadsReducer function", () => {
  it("should return initial state when given unknown action", () => {
    const initialState = undefined;
    const action = { type: "UNKNOWN" };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([]);
  });

  it("should return threads when given RECEIVE_THREADS action", () => {
    const fakeThreads = [
      { id: "thread-1", title: "Thread 1" },
      { id: "thread-2", title: "Thread 2" },
    ];

    const action = {
      type: "RECEIVE_THREADS",
      payload: {
        threads: fakeThreads,
      },
    };

    const nextState = threadsReducer([], action);

    expect(nextState).toEqual(fakeThreads);
  });

  it("should add new thread when given ADD_THREAD action", () => {
    const initialState = [{ id: "thread-1", title: "Thread 1" }];

    const newThread = {
      id: "thread-2",
      title: "Thread 2",
    };

    const action = {
      type: "ADD_THREAD",
      payload: {
        thread: newThread,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it("should toggle upvote correctly when given TOGGLE_UPVOTE_THREAD action", () => {
    const initialState = [
      {
        id: "thread-1",
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: "TOGGLE_UPVOTE_THREAD",
      payload: {
        threadId: "thread-1",
        userId: "user-1",
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toContain("user-1");
    expect(nextState[0].downVotesBy).not.toContain("user-1");
  });
});
