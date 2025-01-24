import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth'; // Correct way to import the default export

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
export default store;