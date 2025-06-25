import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tableReducer from "./tableSlice";
import themeReducer from "./themeSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  table: tableReducer,
  theme: themeReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
