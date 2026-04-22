import { asyncLogin, setAuthUserActionCreator } from "./action";
import * as api from "../../utils/api";

jest.mock("../../utils/api.js");

/**
 * test scenarios for asyncLogin thunk
 *
 * - asyncLogin function
 *   - should dispatch action correctly when login success
 *   - should call alert when login failed
 */

describe("asyncLogin thunk", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch action correctly when login success", async () => {
    const fakeToken = "fake-token";
    const fakeUser = { id: "user-1", name: "Zayadi" };

    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeUser);

    const dispatch = jest.fn();

    await asyncLogin({
      email: "test@mail.com",
      password: "123456",
    })(dispatch);

    expect(api.login).toHaveBeenCalledWith({
      email: "test@mail.com",
      password: "123456",
    });

    expect(api.getOwnProfile).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
  });

  it("should call alert when login failed", async () => {
    const fakeError = new Error("Login gagal");

    api.login.mockRejectedValue(fakeError);

    const dispatch = jest.fn();

    window.alert = jest.fn();

    await asyncLogin({
      email: "test@mail.com",
      password: "123456",
    })(dispatch);

    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});
