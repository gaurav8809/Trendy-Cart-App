import {combineReducers, configureStore} from '@reduxjs/toolkit';
import productsReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import settingsReducer from "./slices/settings";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
// import userReducer from "./slices/user";

const reducers = combineReducers({
    products: productsReducer,
    user: userReducer,
    settings: settingsReducer
});

const appReducer = combineReducers({
    products: productsReducer,
    user: userReducer,
    settings: settingsReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STORE') {
        storage.removeItem('persist:root')
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);
