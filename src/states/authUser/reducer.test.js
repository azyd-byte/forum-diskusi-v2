import authUserReducer from "./reducer";

/**
 * skenario test:
 * - should return initial state when given unknown action
 * - should return authUser when given SET_AUTH_USER action
 * - should return null when given UNSET_AUTH_USER action
 */

describe("authUserReducer function", () => {
  it("should return initial state when given unknown action", () => {
    const initialState = undefined;
    const action = { type: "UNKNOWN" };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBe(null);
  });

  it("should return authUser when given SET_AUTH_USER action", () => {
    const initialState = null;
    const action = {
      type: "SET_AUTH_USER",
      payload: {
        authUser: { id: "user-1", name: "Biru" },
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  it("should return null when given UNSET_AUTH_USER action", () => {
    const initialState = { id: "user-1", name: "Biru" };
    const action = { type: "UNSET_AUTH_USER" };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBe(null);
  });
});
