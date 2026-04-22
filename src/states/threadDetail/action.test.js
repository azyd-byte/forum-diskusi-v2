import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  receiveThreadDetailActionCreator,
  addCommentActionCreator,
} from "./action";

import * as api from "../../utils/api";

jest.mock("../../utils/api");

/**
 * test scenarios for threadDetail thunk
 *
 * - asyncReceiveThreadDetail function
 *   - should dispatch action correctly when success
 *
 * - asyncAddComment function
 *   - should dispatch action correctly when success
 */

describe("threadDetail thunk", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch action correctly when fetching thread detail success", async () => {
    const fakeThread = { id: "thread-1", comments: [] };

    api.getThreadDetail.mockResolvedValue(fakeThread);

    const dispatch = jest.fn();

    await asyncReceiveThreadDetail("thread-1")(dispatch);

    expect(api.getThreadDetail).toHaveBeenCalledWith("thread-1");

    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(fakeThread),
    );
  });

  it("should dispatch action correctly when add comment success", async () => {
    const fakeComment = {
      id: "comment-1",
      content: "Test",
    };

    api.createComment.mockResolvedValue(fakeComment);

    const dispatch = jest.fn();

    await asyncAddComment("thread-1", "Test")(dispatch);

    expect(api.createComment).toHaveBeenCalledWith("thread-1", "Test");

    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeComment));
  });
});
