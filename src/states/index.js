import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authUserReducer from "./authUser/reducer";
import threadsReducer from "./threads/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import leaderboardsReducer from "./leaderboards/reducer";
import usersReducer from "./users/reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// config persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authUser"],
};

function rootReducer(state = {}, action = {}) {
  return {
    authUser: authUserReducer(state.authUser, action),
    threads: threadsReducer(state.threads, action),
    threadDetail: threadDetailReducer(state.threadDetail, action),
    leaderboards: leaderboardsReducer(state.leaderboards, action),
    users: usersReducer(state.users, action),
  };
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export default store;
