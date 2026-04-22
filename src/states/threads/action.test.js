import { asyncAddThread, addThreadActionCreator } from "./action";

import * as api from "../../utils/api";

jest.mock("../../utils/api");

/**
 * test scenarios for asyncAddThread thunk
 *
 * - asyncAddThread function
 *   - should dispatch action correctly when data fetching success
 *   - should call alert and throw error when data fetching failed
 */

describe("asyncAddThread thunk", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch action correctly when data fetching success", async () => {
    const fakeThread = {
      id: "thread-1",
      title: "Test Thread",
      body: "Isi thread",
      category: "react",
    };

    api.createThread.mockResolvedValue(fakeThread);

    const dispatch = jest.fn();

    const result = await asyncAddThread({
      title: "Test Thread",
      body: "Isi thread",
      category: "react",
    })(dispatch);

    expect(api.createThread).toHaveBeenCalledWith({
      title: "Test Thread",
      body: "Isi thread",
      category: "react",
    });

    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));

    expect(result).toEqual(fakeThread);
  });

  it("should call alert and throw error when data fetching failed", async () => {
    const fakeError = new Error("Gagal tambah thread");

    api.createThread.mockRejectedValue(fakeError);

    const dispatch = jest.fn();
    window.alert = jest.fn();

    await expect(
      asyncAddThread({
        title: "Test Thread",
        body: "Isi thread",
        category: "react",
      })(dispatch),
    ).rejects.toThrow(fakeError.message);

    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});
