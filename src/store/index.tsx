import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
});

const ConfigureStore = configureStore({
    reducer: rootReducer,
});

export default ConfigureStore;

export type IRootState = ReturnType<typeof rootReducer>;
